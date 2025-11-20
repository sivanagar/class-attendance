import { getClassById } from "@/lib/services/classes";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Users, 
  Calendar, 
  Plus, 
  MoreHorizontal, 
  Pencil, 
  Trash2, 
  Play, 
  BarChart3 
} from "lucide-react";
interface ClassPageProps {
  params: Promise<{ classID: string }>; 
}

export default async function ClassPage({ params }: ClassPageProps) {
    const resolvedParams = await params;
    const classIDString = resolvedParams.classID;
    const classID = parseInt(classIDString);

    if (isNaN(classID)) {
        return <div>Invalid class ID</div>;
    }
    const classDetails = await getClassById(classID);
    if (!classDetails) {
        return <div>Class not found</div>;
    }
  

  return (
    <div className="flex-1 space-y-8 p-8 pt-6">
    <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">{classDetails.name}</h2>
        </div>
        <div className="flex items-center space-x-2">
            <Dialog>
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
                  <Input id="name" defaultValue="Mathematics 101" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Input id="description" defaultValue={classDetails.description ?? ""} />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Save changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white">
            <Play className="mr-2 h-4 w-4" /> Start Attendance
          </Button>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="md:col-span-1 lg:col-span-4 h-full">
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                <CardTitle>Students</CardTitle>
                <CardDescription>Manage your class roster ({classDetails.students.length})</CardDescription>
              </div>
              <Dialog>
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
                      <Input id="student-first-name" placeholder="e.g. Jane" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="student-last-name">Last Name</Label>
                      <Input id="student-last-name" placeholder="e.g. Doe" />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Add Student</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardHeader>
        <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>First Name</TableHead>
                    <TableHead>Last Name</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {classDetails.students.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell className="font-medium">{student.firstName}</TableCell>
                      <TableCell className="font-medium">{student.lastName}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View History</DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">Remove Student</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
        </Card>

      
      <div className="md:col-span-1 lg:col-span-3 space-y-4">
        <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="mr-2 h-4 w-4 text-muted-foreground" /> 
                Attendance Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
               {/* Visual Placeholder for Chart */}
              <div className="h-[200px] w-full rounded-md border-2 border-dashed border-muted bg-muted/10 flex items-center justify-center flex-col text-muted-foreground gap-2">
                <BarChart3 className="h-10 w-10 opacity-20" />
                <p className="text-sm">Attendance trends will appear here</p>
              </div>
            </CardContent>
          </Card>
          {/* CLASS DETAILS CARD */}
          <Card>
            <CardHeader>
                <CardTitle>Class Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Subject</span>
                    <span className="font-medium">{classDetails.name}</span>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Description</span>
                    <Badge variant="secondary">{classDetails.description}</Badge>
                </div>
                
            </CardContent>
          </Card>
          {/* DANGER ZONE (DELETE BUTTON) */}
          <Card className="border-red-200 bg-red-50 dark:bg-red-950/10 dark:border-red-900">
            <CardHeader>
              <CardTitle className="text-red-600 text-base">Danger Zone</CardTitle>
            </CardHeader>
            <CardFooter>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" className="w-full">
                    <Trash2 className="mr-2 h-4 w-4" /> Delete Class
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete the class 
                      <strong> {classDetails.name}</strong> and remove all student data associated with it.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction className="bg-red-600 hover:bg-red-700">
                      Delete Class
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardFooter>
          </Card>
      </div>
    </div>
    </div>
  );
}