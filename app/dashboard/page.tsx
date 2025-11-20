import { getAllClasses } from "@/lib/services/classes";

import { 
  ClipboardCheck, 
  Pencil, 
  Eye, 
  Plus, 
  Users, 
  Search,
  TrendingUp,
  MoreHorizontal 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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

export default async function Dashboard() {
  const classes = await getAllClasses();
  // const [selectedClassId, setSelectedClassId] = useState(ALL_CLASSES[0].id);
  // const currentClass = classes.find(c => c.id === selectedClassId) || classes[0];
    const currentClass =  classes[0];


  console.log("Classes in dashboard:", classes);
  return (<div className="flex-1 space-y-8 p-8 pt-6 bg-muted/5">
    <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">Welcome back, Professor.</p>
        </div>
        <Button size="lg" className="shadow-sm">
          <Plus className="mr-2 h-5 w-5" /> Create New Class
        </Button>
      </div>
      {/* 2. METRICS SECTION (With Dropdown) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Class Analytics</h3>
          <div className="w-[200px]">
            <Select 
                value={classes[0].name} 
                // onValueChange={setSelectedClassId}
            >
              <SelectTrigger className="bg-background">
                <SelectValue placeholder="Select a class" />
              </SelectTrigger>
              <SelectContent>
                {classes.map((cls) => (
                  <SelectItem key={cls.id} value={cls.name}>{cls.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
            
          {/* METRIC 1: TOTAL STUDENTS */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Students</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold flex items-center gap-2">
                {currentClass.students.length}
                <Users className="h-6 w-6 text-muted-foreground opacity-20" />
              </div>
              <p className="text-xs text-muted-foreground mt-1">Enrolled in {currentClass.name}</p>
            </CardContent>
          </Card>

          {/* METRIC 2: ATTENDANCE % (Placeholder: CSS Ring) */}
          <Card>
            <CardHeader className="pb-2">
               <CardTitle className="text-sm font-medium text-muted-foreground">Average Attendance</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-center h-[120px]">
               {/* Visual Placeholder: A simple SVG ring */}
               <div className="relative h-24 w-24 flex items-center justify-center">
                  <svg className="h-full w-full -rotate-90" viewBox="0 0 36 36">
                    {/* Background Ring */}
                    <path className="text-muted/20" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4" />
                    {/* Progress Ring (Static 75% for visual) */}
                    <path className="text-primary" strokeDasharray={`90, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4" />
                  </svg>
                  <div className="absolute flex flex-col items-center">
                    <span className="text-xl font-bold">90%</span>
                  </div>
               </div>
            </CardContent>
          </Card>

          {/* METRIC 3: OVER TIME (Placeholder: CSS Bars) */}
          <Card>
            <CardHeader className="pb-2">
               <CardTitle className="text-sm font-medium text-muted-foreground">Attendance Over Time</CardTitle>
            </CardHeader>
            <CardContent className="h-[120px] flex items-end justify-between gap-2 pt-4 pb-2">
                {/* Visual Placeholder: Simple CSS bars using height percentages */}
                {['h-[40%]', 'h-[70%]', 'h-[50%]', 'h-[85%]', 'h-[60%]', 'h-[90%]'].map((height, i) => (
                    <div key={i} className="w-full bg-muted/30 rounded-sm relative group">
                        <div className={`absolute bottom-0 w-full bg-primary rounded-sm transition-all duration-500 ${height}`} />
                    </div>
                ))}
            </CardContent>
          </Card>
        </div>
      </section>
      {/* 3. RECENT CLASSES */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold">Recent Classes</h3>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
            {classes.slice(0, 5).map((cls) => (
                <Card key={cls.id} className="hover:shadow-md transition-shadow cursor-pointer group border-l-4" style={{ borderLeftColor: "hsl(var(--primary))" }}>
                    <CardHeader className="p-4 space-y-1">
                        <div className="flex justify-between items-start">
                             <h4 className="font-semibold truncate pr-2">{cls.name}</h4>
                             <ClipboardCheck className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                        </div>
                        <p className="text-xs text-muted-foreground">{cls.students.length} Students</p>
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
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {classes.map((cls) => (
                        <TableRow key={cls.id}>
                            <TableCell className="font-medium">{cls.name}</TableCell>
                            <TableCell>{cls.students.length}</TableCell>
                            <TableCell>
                                <Badge variant="secondary" >Active</Badge>
                            </TableCell>
                            <TableCell className="text-right">
                                <div className="flex items-center justify-end gap-2">
                                    
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-green-600 hover:text-green-700 hover:bg-green-50">
                                                    <ClipboardCheck className="h-4 w-4" />
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent>Take Attendance</TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>

                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                                    <Eye className="h-4 w-4" />
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent>View Details</TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>

                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Button variant="ghost" size="icon" className="h-8 w-8">
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
  </div>);

}
