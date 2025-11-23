import { getAllClasses } from "@/lib/services/classes";
import DashboardMetrics from "@/components/dashboard/DashboardMetrics";
import { ClipboardCheck } from "lucide-react";
import { Card, CardHeader } from "@/components/ui/card";
import Link from "next/link";
import AddClassDialog from "@/components/dashboard/AddClassDialog";
import AllClassesTable from "@/components/dashboard/AllClassesTable";

export default async function Dashboard() {
  const classes = await getAllClasses({ include: { students: true , attendances: true} });

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
                <div className="flex justify-between items-start min-w-0">
                  <h4 className="font-semibold truncate pr-2">{cls.name}</h4>
                  {/* Taking attendance */}
                  <Link href={`/dashboard/${cls.id}/attendance`}>
                  <ClipboardCheck className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </Link>
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
       <AllClassesTable classes={classes}/> 
      </section>
    </div>
  );
}
