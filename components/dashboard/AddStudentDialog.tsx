'use client';

import { Plus } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createStudent } from "@/lib/services/students";

interface AddStudentDialogProps {
    classID: number;
}

export default function AddStudentDialog(classID: AddStudentDialogProps) {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const handleSubmit = async () => {
        setIsLoading(true);
        try {
            
            const result = await createStudent({
                firstName: firstName,
                lastName: lastName,
                classId: classID.classID,
            });
            // Need to replace the alert with a toast notification later
            alert("Student added successfully!");
            router.refresh();
            setOpen(false);
        } catch (error) {
            console.error("Error adding student:", error);
            alert("Failed to add student.");
        } finally {
            setIsLoading(false);
        }

    }

    return (
       <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button size="sm">
                    <Plus className="mr-2 h-4 w-4" /> Add Student
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Student</DialogTitle>
                    <DialogDescription>Add a new student to this class roster.</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="student-first-name">First Name</Label>
                      <Input id="student-first-name" placeholder="e.g. Jane" onChange={e => setFirstName(e.target.value)}/>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="student-last-name">Last Name</Label>
                      <Input id="student-last-name" placeholder="e.g. Doe" onChange={e => setLastName(e.target.value)}/>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit" onClick={handleSubmit}>Add Student</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
    );
}