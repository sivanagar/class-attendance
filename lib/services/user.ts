'use server';
import { prisma } from "@/lib/prisma";
import bcrypt from 'bcryptjs';

export async function createUser({ email, password, name }: { email: string; password: string; name: string; }) {
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

    await prisma.user.create({
        data: {
            email: email,
            password: hashedPassword,
            name: name,
        },
    });
    return { ok: true };
}

export async function authorizeUser({ email, password }: { email: string; password: string; }) {
    console.log("Authorizing user:", email);
    const user = await prisma.user.findUnique({
        where: { email: email },
    });

    if (user && await bcrypt.compare(password, user.password)) {
        return user;
    }
    return null;
}