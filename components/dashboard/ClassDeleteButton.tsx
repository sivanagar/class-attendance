'use client'
import {
  Card,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";


import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteClass } from "@/lib/services/classes";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface ClassDeleteButtonProps {
  classId: number;
  className: string;
}
  
export default function ClassDeleteButton({classId, className}: ClassDeleteButtonProps) {
    
    const router = useRouter()

    const handleClick = async () =>{
    try {
      const resault = await deleteClass(classId)
      if (!resault) {
        toast.error("Error deleting class")
      }
      toast.success("Classs deleted succefuly");
        router.refresh(); 
        router.push("/dashboard");
    }
    catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong");
    }

  }

    return (
         <Card className="border-red-200 bg-red-50 dark:bg-red-950/10 dark:border-red-900">
            <CardHeader>
              <CardTitle className="text-red-600 text-base">
                Danger Zone
              </CardTitle>
            </CardHeader>
            <CardFooter>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" className="w-full" >
                    <Trash2 className="mr-2 h-4 w-4" /> Delete Class
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      the class
                      <strong> {className}</strong> and remove all
                      student data associated with it.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction className="bg-red-600 hover:bg-red-700" onClick={handleClick}>
                      Delete Class
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardFooter>
          </Card>
    )
}