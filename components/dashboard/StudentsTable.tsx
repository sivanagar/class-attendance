

import { MoreHorizontal } from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import StudentRow from "./StudentRow";


interface StudentsTableProps {
    students: Array<{
        id: number;
        firstName: string;
        lastName: string;
    }>;
}

export default function StudentsTable(students: StudentsTableProps) {
    
    const { students: studentList } = students;

    const handleDeleteStudent = (studentId: number) => {
        // Implement delete student logic here
        console.log("Delete student with ID:", studentId);
    }

    const handleViewHistory = (studentId: number) => {
        // Implement view history logic here
        console.log("View history for student with ID:", studentId);
    }

    return (
        <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>First Name</TableHead>
                    <TableHead>Last Name</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {studentList.map((student) => (
                    <StudentRow student={student} key={student.id} />
                  ))}
                </TableBody>
              </Table>
    );
}