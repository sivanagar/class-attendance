import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const classes = await prisma.class.findMany({
            include: {
                students: true,
            },
        });
        return Response.json(classes, { status: 200 });     
    }
    catch (error) {
        console.error("GET /api/class error:", error);
        return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const { name, description, userId, students } = await req.json();

        if (!name || !description || !userId) {
            return Response.json({ error: "Missing fields" }, { status: 400 });
        }

        const newClass = await prisma.class.create({
            data: {
                name,
                description,
                userId,
                students: {
                    create: students
                }
            },
            include: {
                students: true
            }
        });

        return Response.json(newClass, { status: 201 });
    } catch (error) {
        console.error("POST /api/class error:", error);
        return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

