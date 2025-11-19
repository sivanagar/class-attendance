import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";


export async function GET() {
    try {
        const users = await prisma.user.findMany({
            include: {
                classes: true,
            },
        });
        return Response.json(users, { status: 200 });
    } catch (error) {
        console.error("GET /api/users error:", error);
        return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
};

export async function POST(req: Request) {
    try {
        const { email, password, name } = await req.json();

        if (!email || !password || !name) {
            return Response.json({ error: "Missing fields" }, { status: 400 });
        }

        // check if user already exists
        const exists = await prisma.user.findUnique({
            where: { email },
        });

        if (exists) {
            return Response.json({ error: "User already exists" }, { status: 409 });
        }

        // hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({

            data: {
                email,
                password: hashedPassword,
                name,
            },
        });

        return Response.json(user, { status: 201 });
    } catch (error) {
        console.error("POST /api/users error:", error);
        return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
}