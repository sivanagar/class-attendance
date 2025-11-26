import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

// --- Helper Arrays ---
const firstNames = ['Alice', 'Bob', 'Charlie', 'David', 'Eve', 'Frank', 'Grace', 'Hannah', 'Ian', 'Jack', 'Katie', 'Liam', 'Mia', 'Noah', 'Olivia', 'Sam', 'Tom', 'Zoe', 'Ryan', 'Bella'];
const lastNames = ['Smith', 'Johnson', 'Brown', 'Williams', 'Jones', 'Miller', 'Davis', 'Garcia', 'Rodriguez', 'Wilson', 'Martinez', 'Anderson', 'Taylor', 'Thomas', 'Hernandez'];
const classSubjects = ['Math', 'History', 'Physics', 'Chemistry', 'Biology', 'Art', 'Literature', 'CS', 'Calculus', 'Psychology'];

// --- Helper Functions ---
const getRandomElement = (arr: any[]) => arr[Math.floor(Math.random() * arr.length)];
const getRandomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

async function main() {
    console.log('🌱 Starting seed...');

    // 1. Create the Main User (Teacher/Admin)
    const hashedPassword = await bcrypt.hash('password123', 10);
    
    const user = await prisma.user.upsert({
        where: { email: 'seed@email.com' },
        update: {},
        create: {
            email: 'seed@email.com',
            name: 'John Doe',
            password: hashedPassword,
        },
    });

    console.log(`👤 Created user: ${user.name}`);

    // 2. Create 10 Classes
    for (let i = 0; i < 10; i++) {
        // Generate 10 to 25 random students for this specific class
        const studentCount = getRandomInt(10, 25);
        
        const studentsData = Array.from({ length: studentCount }).map(() => ({
            firstName: getRandomElement(firstNames),
            lastName: getRandomElement(lastNames),
        }));

        // Create the Class and the Students simultaneously
        // Because of the @relation("ClassStudents"), this creates new students 
        // and automatically links them to this class in the join table.
        const newClass = await prisma.class.create({
            data: {
                name: `${classSubjects[i]} ${getRandomInt(100, 300)}`,
                description: `Introduction to ${classSubjects[i]} concepts.`,
                userId: user.id, 
                students: {
                    create: studentsData 
                }
            },
            include: {
                students: true // We need this to get student IDs for attendance
            }
        });

        console.log(`   📚 Created Class: ${newClass.name} with ${newClass.students.length} students.`);

        // 3. Generate Attendance for 5-10 dates
        const datesCount = getRandomInt(5, 10);
        
        for (let d = 0; d < datesCount; d++) {
            // Generate a date (going back d days)
            const date = new Date();
            date.setDate(date.getDate() - d);
            // Optional: normalize time to avoid timestamp clutter
            date.setHours(9, 0, 0, 0); 

            // Map over students to create attendance rows
            const attendanceData = newClass.students.map((student) => {
                // "Mostly attended": 85% chance of being true
                const hasAttended = Math.random() < 0.85;

                return {
                    date: date,
                    studentId: student.id,
                    classId: newClass.id,
                    attended: hasAttended 
                };
            });

            // Bulk insert attendance
            if (attendanceData.length > 0) {
                await prisma.attendance.createMany({
                    data: attendanceData
                });
            }
        }
    }

    console.log('✅ Seeding complete!');
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })