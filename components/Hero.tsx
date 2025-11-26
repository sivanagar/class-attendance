import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return <div className="mx-auto">
        <section className="space-y-6 pb-8  pt-6 md:pb-12 md:pt-10 lg:py-32">
          <div className="container flex mx-auto max-w-5xl flex-col items-center gap-4 text-center">
            
            {/* Badge */}
            <div className="rounded-2xl bg-muted px-4 py-1.5 text-sm font-medium text-muted-foreground">
              Simplify your classroom management.
            </div>

            {/* Headline */}
            <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-foreground">
              Attendance tracking <br className="hidden sm:inline" />
              made <span className="text-primary">effortless</span>.
            </h1>

            {/* Subheadline */}
            <p className="max-w-2xl leading-normal text-muted-foreground sm:text-xl sm:leading-8">
              Ditch the spreadsheets. The fastest way for teachers, coaches to track students 
                attendance and manage classes all in one place.
            </p>

            {/* Call to Action */}
            <div className="flex gap-4 mt-4">
              <Link href="/signup">
                <Button size="lg" className="h-11 px-8 text-lg">
                  Start for Free 
                </Button>
              </Link>
              <Link href="#features">
                <Button variant="outline" size="lg" className="h-11 px-8 text-lg">
                  Learn more
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* 3. The Visual Proof (Dashboard Preview) */}
        <section className="container mx-auto max-w-5xl py-12 lg:py-24">
            <div className="relative overflow-hidden rounded-xl bg-background shadow-2xl">
               {/* PLACEHOLDER: Replace this div with an <img> of your dashboard later */}
               <Image src="/DashboardScreenShot.png" alt="Dashboard Screenshot" width={1200} height={800} className="w-full h-auto"/>
               {/* <div className="flex h-[400px] w-full items-center justify-center bg-muted/50">
                  <p className="text-muted-foreground">
                    [ Dashboard Screenshot Placeholder ]
                  </p>
               </div> */}
            </div>
        </section>
      
    </div>
  
}