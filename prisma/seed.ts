import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
async function main() {
    const alice = await prisma.user.upsert({
        where: { email: 'seed@email.com' },
        update: {},
        create: {
            email: 'seed@email.com',
            name: 'John Doe',
            password: 'password123',
            classes: {
                create: {
                    name: 'Math 101',
                    description: 'Basic Mathematics',
                    students: {
                        create: [
                            { firstName: 'Alice', lastName: 'Smith' },
                            { firstName: 'Bob', lastName: 'Johnson' },
                            { firstName: 'Charlie', lastName: 'Brown' },
                        ],
                    }
                    
                },
            },
           
        },
    })
 
    console.log( alice )
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