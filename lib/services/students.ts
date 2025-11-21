'use server';
import {prisma} from "@/lib/prisma";

export async function getAllStudents() {
    return await prisma.student.findMany();
}

export async function getStudentById(studentId: number) {
    return await prisma.student.findUnique({
        where: { id: studentId },
    });
}

export async function createStudent(data: { firstName: string; lastName: string; classId: number; }) {
    return await prisma.student.create({
        data: {
            firstName: data.firstName,
            lastName: data.lastName,
            classes: {
                connect: { id: data.classId },
            },
        },
    });
}

export async function updateStudent(studentId: number, data: { firstName?: string; lastName?: string; }) {
    return await prisma.student.update({
        where: { id: studentId },
        data: {
            firstName: data.firstName,
            lastName: data.lastName,
        },
    });
}

export async function deleteStudent(studentId: number) {
    return await prisma.student.delete({
        where: { id: studentId },
    });
}