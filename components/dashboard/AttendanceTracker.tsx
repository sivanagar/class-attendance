"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarIcon, Loader2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { useState } from "react";
import { createManyAttendance } from "@/lib/services/attendance";
import { useRouter } from "next/navigation";
import { set } from "react-hook-form";

type Student = {
  id: number;
  firstName: string;
  lastName: string;
};

interface AttendanceTrackerProps {
  classId: number;
  className: string;
  students: Student[];
}

export default function AttendanceTracker({
  classId,
  className,
  students,
}: AttendanceTrackerProps) {

  const [date, setDate] = useState(() => {
    {
      const today = new Date();
      return today.toISOString().split("T")[0];
    }
  });
  const [attendance, setAttendance] = useState<{
    [studentId: number]: boolean;
  }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDirty, setIsDirty] = useState(true);
  const router = useRouter();

  const markAll = (status: boolean) => {
    const newRecord: Record<number, boolean> = {};
    students.forEach((s) => (newRecord[s.id] = status));
    setAttendance(newRecord);
    setIsDirty(true);
  };
  const toggleAttendance = (studentId: number) => {
    setAttendance((prev) => ({
      ...prev,
      [studentId]: !prev[studentId],
    }));
    setIsDirty(true);
  };

  const handleSave = async () => {
    
    setIsLoading(true);
    const attendanceData = students.map((student) => ({
      studentId: student.id,
      classId: classId,
      date: new Date(date), // Convert string "2025-11-21" to Date object
      attended: attendance[student.id] || false, // Default to false if undefined
    }));

    try {
      const results = await createManyAttendance(attendanceData);
      toast.success("Attendance saved successfully!");
      setIsDirty(false);
    } catch (error) {
      console.error("Error saving attendance:", error);
      toast.error("Failed to save attendance. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto mt-6">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-2xl font-bold">{className}</CardTitle>
          <p className="text-sm text-muted-foreground">Attendance Sheet</p>
        </div>

        {/* Date Picker - Styled to look integrated */}
        <div className="flex items-center gap-2 border rounded-md px-3 py-2 bg-white">
          <CalendarIcon className="h-4 w-4 text-gray-500" />
          <input
            type="date"
            value={date}
            onChange={(e) => {setDate(e.target.value); setIsDirty(true);}}
            className="outline-none text-sm bg-transparent"
          />
        </div>
      </CardHeader>

      <CardContent>
        {/* Action Bar */}
        <div className="flex justify-end gap-2 mb-6">
          <Button variant="outline" size="sm" onClick={() => markAll(false)}>
            Mark All Absent
          </Button>
          <Button variant="outline" size="sm" onClick={() => markAll(true)}>
            Mark All Present
          </Button>
        </div>

        {/* Student List */}
        <div className="space-y-1">
          {isLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
            </div>
          ) : (
            <div className="border rounded-lg divide-y">
              {students.map((student) => {
                const isPresent = attendance[student.id] || false;
                return (
                  <div
                    key={student.id}
                    className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-2 h-10 rounded-full ${
                          isPresent ? "bg-green-500" : "bg-red-300"
                        }`}
                      ></div>
                      <span className="font-medium text-gray-700">
                        {student.firstName} {student.lastName}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <Label
                        className={`text-sm font-medium ${
                          isPresent ? "text-green-600" : "text-red-500"
                        }`}
                      >
                        {isPresent ? "Present" : "Absent"}
                      </Label>
                      <Switch
                        checked={isPresent}
                        onCheckedChange={() => toggleAttendance(student.id)}
                      />
                    </div>
                  </div>
                );
              })}

              {students.length === 0 && (
                <div className="p-8 text-center text-gray-500">
                  No students in this class yet.
                </div>
              )}
            </div>
          )}
        </div>

        <div className="mt-6 flex justify-end">
          <Button
            variant="outline"
            size="lg"
            className="mx-2 w-full sm:w-auto"
            onClick={() => router.back()}
          >
            Cancel
          </Button>
          <Button
            size="lg"
            onClick={handleSave}
            disabled={isLoading || !isDirty}
            className="w-full sm:w-auto"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Attendance
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
