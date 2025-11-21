import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
