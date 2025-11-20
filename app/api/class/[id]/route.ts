import { prisma } from "@/lib/prisma";
export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }>   }
) {
    
    try {
        const { id } = await params;
        const classId = parseInt(id);
        if (isNaN(classId)) {
            return Response.json({ error: "Invalid class ID" }, { status: 400 });
        }

        const classData = await prisma.class.findUnique({
            where: { id: classId },
            include: {
                students: true,
            },
        });

        if (!classData) {
            return Response.json({ error: "Class not found" }, { status: 404 });
        }

        return Response.json(classData, { status: 200 });
    } catch (error) {
        console.error("GET /api/class/[id] error:", error);
        return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function PUT(
    req: Request,
    { params }: { params: Promise<{ id: string }>   }
) {
    try {
        const { id } = await params;
        const classId = parseInt(id);
        if (isNaN(classId)) {
            return Response.json({ error: "Invalid class ID" }, { status: 400 });
        }

        const { name, description,  } = await req.json();

        if (!name || !description) {
            return Response.json({ error: "Missing fields" }, { status: 400 });
        }

        const updatedClass = await prisma.class.update({
            where: { id: classId },
            data: {
                name,
                description,
            },
        });

        return Response.json(updatedClass, { status: 200 });
    } catch (error) {
        console.error("PUT /api/class/[id] error:", error);
        return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }>   }
) {
    try {
        const { id } = await params;
        const classId = parseInt(id);
        if (isNaN(classId)) {
            return Response.json({ error: "Invalid class ID" }, { status: 400 });
        }

        await prisma.class.delete({
            where: { id: classId },
        });

        return Response.json({ message: "Class deleted" }, { status: 200 });
    } catch (error) {
        console.error("DELETE /api/class/[id] error:", error);
        if ((error as any).code === 'P2025') {
             return Response.json({ error: "Class not found" }, { status: 404 });
        }
        return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
}