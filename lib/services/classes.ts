'use server';
import { prisma } from "@/lib/prisma";

export async function getClassById(id: number) {
    return prisma.class.findUnique({
        where: { id },
        include: {
            students: true,
            attendances: true,
        },
    });
}

export async function getClassesByUserId(userId: number) {
    return prisma.class.findMany({
        where: { userId },
        include: {
            students: true,
            attendances: true,
        },
    });
}


export async function createClass(data: {
    name: string;
    description: string;
    userId: number;
    students?: { firstName: string; lastName: string }[];
}) {
    return prisma.class.create({
        data: {
            name: data.name,
            description: data.description,
            userId: data.userId,
            students: {
                create: data.students,
            },
        },
        include: {
            students: true,
        },
    });
}

export async function updateClass(id: number, data: {
    name?: string;
    description?: string;
}) {
    return prisma.class.update({
        where: { id },
        data: {
            name: data.name,
            description: data.description,
        },
    });
}

export async function deleteClass(id: number) {
    return prisma.class.delete({
        where: { id },
    });
}