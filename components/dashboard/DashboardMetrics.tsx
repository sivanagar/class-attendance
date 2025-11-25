'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users } from "lucide-react";
import { Attendance, Class, Student } from '@prisma/client'
import { useState } from "react";
import ClassAttendanceChart from "./ClassAttendanceChart";
import AttendanceRadialChart from "./AttendanceRadialChart";

interface DashboardProps {
  classes: Class[];
  students?: Student[];
  attendances?: Attendance[];
}

export default function DashboardMetrics( classes : DashboardProps) {
    const classesData = classes.classes;
    const [selectedClassId, setSelectedClassId] = useState(classesData[0] ? classesData[0].id : 0);
    const currentClass = classesData.find(c => c.id === selectedClassId) || classesData[0];

    return (<section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Class Analytics</h3>
          <div className="w-[200px]">
            <Select onValueChange={(value) => {
              
              setSelectedClassId(parseInt(value))
             
              }}>
              <SelectTrigger className="bg-background">
                <SelectValue placeholder="Select a class" />
              </SelectTrigger>
              <SelectContent>
                {classesData.map((cls) => (
                  <SelectItem key={cls.id} value={cls.id.toString()}>{cls.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
            
          {/* METRIC 1: TOTAL STUDENTS */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="font-semibold">Total Students</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold flex items-center gap-2">
                {currentClass ? currentClass.students.length : 0}
                <Users className="h-6 w-6 text-muted-foreground opacity-20" />
              </div>
              <p className="text-xs text-muted-foreground mt-1">Enrolled in {currentClass ? currentClass.name : ""}</p>
            </CardContent>
          </Card>

          {/* METRIC 2: ATTENDANCE % (Placeholder: CSS Ring) */}
         <AttendanceRadialChart attendanceData={currentClass ? currentClass.attendances: []} />

          {/* METRIC 3: OVER TIME (Placeholder: CSS Bars) */}
          <ClassAttendanceChart attendanceData={currentClass ? currentClass.attendances: []} />
        </div>
      </section>);
}