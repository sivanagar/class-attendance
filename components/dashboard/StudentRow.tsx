"use client";
import { MoreHorizontal } from "lucide-react";
import { TableRow, TableCell } from "@/components/ui/table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { deleteStudent } from "@/lib/services/students";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface StudentRowProps {
  student: {
    id: number;
    firstName: string;
    lastName: string;
  };
}

export default function StudentRow(student: StudentRowProps) {
  const [studentId, firstName, lastName] = [
    student.student.id,
    student.student.firstName,
    student.student.lastName,
  ];
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleDeleteStudent = async () => {
    try {
      const result = await deleteStudent(studentId);
      if (result) {
        toast.success("Student deleted successfully");
        router.refresh();
      }
    } catch (error) {
      console.error("Error deleting student:", error);
      toast.error("Failed to delete student.");
    } finally {
      setOpen(false);
    }
  };


  return (
    <TableRow key={studentId}>
      <TableCell className="font-medium">{firstName}</TableCell>
      <TableCell className="font-medium">{lastName}</TableCell>
      <TableCell className="text-right">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {/* <DropdownMenuItem onSelect={handleViewHistory}>
              View History
            </DropdownMenuItem> */}
            <DropdownMenuItem
              className="text-red-600"
              onSelect={() => setOpen(true)}
            >
              Remove Student
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <AlertDialog open={open} onOpenChange={setOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will{" "}
                <b>permanently delete</b> the student,{" "}
                <b>
                  {firstName} {lastName}
                </b>
                , from the database.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              {/* The Action button performs the delete */}
              <AlertDialogAction
                onClick={handleDeleteStudent}
                className="bg-red-600 hover:bg-red-700" // Red styling
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </TableCell>
    </TableRow>
  );
}
