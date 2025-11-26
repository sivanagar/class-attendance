import AttendanceTracker from "@/components/dashboard/AttendanceTracker";
import {prisma} from "@/lib/prisma";


type Props = {
  params: Promise<{ classID: string }>
}


export default async function AttendancePage({params}: Props)  {
    const resolvedParams = await params;

    const classId = parseInt(resolvedParams.classID, 10);

    const classInfo = await prisma.class.findUnique({
        where: {id: classId},
        include: {
            students: {orderBy: { lastName: 'asc' }
            },
            attendances: true,
        },
    });

    if (!classInfo) {
        return <div>Class not found</div>;
    }
    return (
        <div className="container mx-auto py-10 px-4">
            <AttendanceTracker 
                classId={classInfo.id} 
                className={classInfo.name} 
                students={classInfo.students}
                attendances={classInfo.attendances}/>
        </div>
    );
}