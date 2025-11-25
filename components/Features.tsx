import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, CheckCircle2, BarChart3, School } from "lucide-react";

export default function Features() {
  const features = [
    {
      title: "Classroom Management",
      description: "Create multiple classes, at one place, and organize your teaching load in seconds.",
      icon: <School className="h-10 w-10 text-primary mb-4" />,
    },
    {
      title: "Student Rosters",
      description: "Add students, keep track of attendance for every learner.",
      icon: <Users className="h-10 w-10 text-primary mb-4" />,
    },
    {
      title: "One-Click Attendance",
      description: "Mark present or absent with a single tap. Optimized for mobile so you can walk and track.",
      icon: <CheckCircle2 className="h-10 w-10 text-primary mb-4" />,
    },
    {
      title: "Instant Metrics",
      description: "Visualize attendance trends. Identify at-risk students with automatic reports and percentage calculators.",
      icon: <BarChart3 className="h-10 w-10 text-primary mb-4" />,
    },
  ];

  return (
    <section id="features" className="container mx-auto max-w-5xl py-12 md:py-24 lg:py-32">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
          Everything you need to run your class
        </h2>
        <p className="mt-4 text-muted-foreground md:text-xl">
          Powerful features minus the complexity. Built for modern educators.
        </p>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-2">
        {features.map((feature, index) => (
          <Card key={index} className="border-none shadow-md bg-muted/40">
            <CardHeader>
              {feature.icon}
              <CardTitle className="text-xl">{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                {feature.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}