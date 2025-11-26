
import { getClassById } from "@/lib/services/classes";
import EditClassDialog from "@/components/dashboard/EditClassDialog";


import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

import {  Play } from "lucide-react";
import AddStudentDialog from "@/components/dashboard/AddStudentDialog";
import StudentsTable from "@/components/dashboard/StudentsTable";
import ClassAttendanceChart from "@/components/dashboard/ClassAttendanceChart";
import ClassDeleteButton from "@/components/dashboard/ClassDeleteButton"


interface ClassPageProps {
  params: Promise<{ classID: string }>;
}

export default async function ClassPage({ params }: ClassPageProps) {
  
  const resolvedParams = await params;
  const classIDString = resolvedParams.classID;
  const classID = parseInt(classIDString);

  if (isNaN(classID)) {
    return <div>Invalid class ID</div>;
  }
  const classDetails = await getClassById(classID);
  if (!classDetails) {
    return <div>Class not found</div>;
  }


  return (
    <div className="flex-1 space-y-8 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            {classDetails.name}
          </h2>
        </div>
        <div className="flex items-center space-x-2">
          <EditClassDialog
            id={classID}
            name={classDetails.name}
            description={classDetails.description || ""}
          />
          
            <Button
              asChild
              size="lg"
              className="bg-green-600 hover:bg-green-700 text-white"
              
            >
              <Link href={`/dashboard/${classID}/attendance`}>
              <Play className="mr-2 h-4 w-4" /> Start Attendance
              </Link>
            </Button>
          
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="md:col-span-1 lg:col-span-4 h-full">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Students</CardTitle>
              <CardDescription>
                Manage your class roster ({classDetails.students.length})
              </CardDescription>
            </div>
            <AddStudentDialog classID={classID} />
          </CardHeader>
          <CardContent>
            <StudentsTable students={classDetails.students} />
          </CardContent>
        </Card>

        <div className="md:col-span-1 lg:col-span-3 space-y-4">
          <ClassAttendanceChart attendanceData={classDetails.attendances} />
          {/* CLASS DETAILS CARD */}
          
          <Card>
            <CardHeader>
              <CardTitle>Class Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Subject</span>
                <span className="font-medium">{classDetails.name}</span>
              </div>
              <Separator />
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  Description
                </span>
                <Badge variant="secondary">{classDetails.description}</Badge>
              </div>
            </CardContent>
          </Card>
          {/* DANGER ZONE (DELETE BUTTON) */}
          <ClassDeleteButton classId={classID} className={classDetails.name} />
         
        </div>
      </div>
    </div>
  );
}
