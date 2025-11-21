import { getAllClasses } from "@/lib/services/classes";
import DashboardMetrics from "@/components/dashboard/DashboardMetrics";
import { ClipboardCheck, Pencil, Eye, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import AddClassDialog from "@/components/dashboard/AddClassDialog";

export default async function Dashboard() {
  const classes = await getAllClasses({ include: { students: true } });

  return (
    <div className="container mx-auto flex-1 space-y-8 p-8 pt-6 bg-muted/5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">Welcome back, Professor.</p>
        </div>
        <AddClassDialog />
      </div>

      {/* 2. METRICS SECTION (With Dropdown) */}
      <DashboardMetrics classes={classes} />

      {/* 3. RECENT CLASSES */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold">Recent Classes</h3>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
          {classes.slice(0, 5).map((cls) => (
            <Card
              key={cls.id}
              className="hover:shadow-md transition-shadow cursor-pointer group border-l-4"
              style={{ borderLeftColor: "hsl(var(--primary))" }}
            >
              <CardHeader className="p-4 space-y-1">
                <div className="flex justify-between items-start">
                  <h4 className="font-semibold truncate pr-2">{cls.name}</h4>
                  {/* Taking attendance */}
                  <ClipboardCheck className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <p className="text-xs text-muted-foreground">
                  {cls.students.length} Students
                </p>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      {/* 4. ALL CLASSES TABLE */}
      <section className="space-y-4 pt-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">All Classes</h3>
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search..." className="pl-8 h-9" />
          </div>
        </div>

        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Class Name</TableHead>
                <TableHead>Students</TableHead>

                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {classes.map((cls) => (
                <TableRow key={cls.id}>
                  <TableCell className="font-medium">{cls.name}</TableCell>
                  <TableCell>{cls.students.length}</TableCell>

                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-green-600 hover:text-green-700 hover:bg-green-50"
                            >
                              <ClipboardCheck className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Take Attendance</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>

                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              asChild
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                            >
                              <Link href={`/dashboard/${cls.id}`}>
                                <Eye className="h-4 w-4" />
                              </Link>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>View Details</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>

                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Edit Class</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </section>
    </div>
  );
}
