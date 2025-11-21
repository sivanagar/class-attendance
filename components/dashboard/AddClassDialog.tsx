"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2, Loader2 } from "lucide-react"; // Icons
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { createClass } from "@/lib/services/classes";

export default function AddClassDialog() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Form State
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [students, setStudents] = useState<
    { firstName: string; lastName: string }[]
  >([]);

  // 1. Add a blank student row
  const handleAddStudent = () => {
    setStudents([...students, { firstName: "", lastName: "" }]);
  };

  // 2. Remove a specific student row
  const handleRemoveStudent = (index: number) => {
    setStudents(students.filter((_, i) => i !== index));
  };

  // 3. Update specific student field
  const handleStudentChange = (
    index: number,
    field: "firstName" | "lastName",
    value: string
  ) => {
    const newStudents = [...students];
    newStudents[index][field] = value;
    setStudents(newStudents);
  };

  const handleSubmit = async () => {
    if (!name) {
      alert("Class Name is required");
      return;
    }

    setIsLoading(true);

    try {
      // Filter out empty student rows before sending
      const validStudents = students.filter(
        (s) => s.firstName.trim() !== "" || s.lastName.trim() !== ""
      );

      const result = await createClass({
        name,
        description,
        userId: 1, // Replace with actual user ID from session/auth context
        students: validStudents,
      });

      if (result) {
        // Reset form
        setName("");
        setDescription("");
        setStudents([]);

        // Refresh and Close
        router.refresh();
        setOpen(false);
      } else {
        alert("Failed to create class");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Create New Class
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Class</DialogTitle>
          <DialogDescription>
            Add class details. You can add students now or later.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {/* Class Info Section */}
          <div className="grid gap-2">
            <Label htmlFor="name">
              Class Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              placeholder="e.g. Biology 101"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              placeholder="Optional description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="border-t my-2"></div>

          {/* Students Section */}
          <div className="flex items-center justify-between">
            <Label>Students (Optional)</Label>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleAddStudent}
            >
              <Plus className="h-3 w-3 mr-1" /> Add Student
            </Button>
          </div>

          <div className="space-y-3">
            {students.map((student, index) => (
              <div key={index} className="flex gap-2 items-end">
                <div className="grid gap-1 flex-1">
                  {index === 0 && (
                    <Label className="text-xs text-muted-foreground">
                      First Name
                    </Label>
                  )}
                  <Input
                    placeholder="First Name"
                    value={student.firstName}
                    onChange={(e) =>
                      handleStudentChange(index, "firstName", e.target.value)
                    }
                  />
                </div>
                <div className="grid gap-1 flex-1">
                  {index === 0 && (
                    <Label className="text-xs text-muted-foreground">
                      Last Name
                    </Label>
                  )}
                  <Input
                    placeholder="Last Name"
                    value={student.lastName}
                    onChange={(e) =>
                      handleStudentChange(index, "lastName", e.target.value)
                    }
                  />
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  onClick={() => handleRemoveStudent(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}

            {students.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-2 italic">
                No students added yet.
              </p>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button type="submit" onClick={handleSubmit} disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Create Class
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
