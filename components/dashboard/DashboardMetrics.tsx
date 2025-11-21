'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users } from "lucide-react";
import { Class, Student } from '@prisma/client'
import { useState } from "react";

interface DashboardProps {
  classes: Class[];
  students?: Student[];
}

export default function DashboardMetrics( classes : DashboardProps) {
    const classesData = classes.classes;
    const [selectedClassId, setSelectedClassId] = useState(classesData[0].id);
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
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Students</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold flex items-center gap-2">
                {currentClass.students.length}
                <Users className="h-6 w-6 text-muted-foreground opacity-20" />
              </div>
              <p className="text-xs text-muted-foreground mt-1">Enrolled in {currentClass.name}</p>
            </CardContent>
          </Card>

          {/* METRIC 2: ATTENDANCE % (Placeholder: CSS Ring) */}
          <Card>
            <CardHeader className="pb-2">
               <CardTitle className="text-sm font-medium text-muted-foreground">Average Attendance</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-center h-[120px]">
               {/* Visual Placeholder: A simple SVG ring */}
               <div className="relative h-24 w-24 flex items-center justify-center">
                  <svg className="h-full w-full -rotate-90" viewBox="0 0 36 36">
                    {/* Background Ring */}
                    <path className="text-muted/20" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4" />
                    {/* Progress Ring (Static 75% for visual) */}
                    <path className="text-primary" strokeDasharray={`90, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4" />
                  </svg>
                  <div className="absolute flex flex-col items-center">
                    <span className="text-xl font-bold">90%</span>
                  </div>
               </div>
            </CardContent>
          </Card>

          {/* METRIC 3: OVER TIME (Placeholder: CSS Bars) */}
          <Card>
            <CardHeader className="pb-2">
               <CardTitle className="text-sm font-medium text-muted-foreground">Attendance Over Time</CardTitle>
            </CardHeader>
            <CardContent className="h-[120px] flex items-end justify-between gap-2 pt-4 pb-2">
                {/* Visual Placeholder: Simple CSS bars using height percentages */}
                {['h-[40%]', 'h-[70%]', 'h-[50%]', 'h-[85%]', 'h-[60%]', 'h-[90%]'].map((height, i) => (
                    <div key={i} className="w-full  rounded-sm relative group">
                        <div className={`absolute bottom-0 w-full bg-primary rounded-sm transition-all duration-500 ${height}`} />
                    </div>
                ))}
            </CardContent>
          </Card>
        </div>
      </section>);
}