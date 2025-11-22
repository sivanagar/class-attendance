'use server';

import { prisma } from "@/lib/prisma";

function normalizeDate(date: Date) {
  const d = new Date(date);
  d.setUTCHours(0, 0, 0, 0);
  return d;
}


export async function getAllAttendanceByClass(classId: number, date:Date) {
    const normalizedDate = normalizeDate(date);
    return await prisma.attendance.findMany({
        where: {
            classId: classId,
            date: normalizedDate
        },
        include: {
            student: true,

        },
    });
}

export async function createManyAttendance(attendances: { studentId: number; classId: number; date: Date; attended: boolean }[]) {
    const normalizedAttendances = attendances.map(attendance => ({
        studentId: attendance.studentId,
        classId: attendance.classId,
        date: normalizeDate(attendance.date),
        attended: attendance.attended,
    }));
    return await prisma.attendance.createMany({
        data: normalizedAttendances,
        skipDuplicates: true,
    });
}

export async function updateAttendance(attendanceId: number, attended: boolean) {
    return await prisma.attendance.update({
        where: {
            id: attendanceId,
        },
        data: {
            attended: attended,
        },
    });
}


