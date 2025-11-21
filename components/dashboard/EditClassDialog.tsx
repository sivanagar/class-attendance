'use client';

import { Dialog, DialogTrigger, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Pencil } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {updateClass} from "@/lib/services/classes";


interface EditClassDialogProps {
    id: number;
    name: string;
    description: string;
}

export default function EditClassDialog({id, name, description }: EditClassDialogProps) {
    const router = useRouter()
    const [open, setOpen] = useState(false);
    const [className, setClassName] = useState(name);
    const [classDescription, setClassDescription] = useState(description);
    const [isLoading, setIsLoading] = useState(false);
    
      const handleSubmit = async () => {
          setIsLoading(true);
        
          try {
            const result = await updateClass(id, {
              name: className,
              description: classDescription,
          });
          if (result) {
            // Need to replace the alert with a toast notification later
            alert("Success!");
            router.refresh();
            setOpen(false);

          }else {
                  
                  alert("Failed to update class");
              }
          } catch (error) {
              // Handle network/crash error
              console.error("Submission error:", error);
              alert("Something went wrong.");
          } finally {
              setIsLoading(false); 
          }
          
            
          } 
       
    


    return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Pencil className="mr-2 h-4 w-4" /> Edit Class
              </Button>
            </DialogTrigger>
        <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Class Details</DialogTitle>
                <DialogDescription>Update description or class name.</DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Class Name</Label>
                  <Input id="name" defaultValue={name} onChange={e => setClassName(e.target.value)}/>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Input id="description" defaultValue={description} onChange={(e) => setClassDescription(e.target.value)}/>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" onClick={handleSubmit}>Save changes</Button>
              </DialogFooter>
            </DialogContent>
             </Dialog>
             </div>
    )

}