import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NavBar() {
    return (<div>
        {/* 1. Minimal Navbar */}
          <header className="flex h-16 items-center justify-between border-b px-6 lg:px-10">
            <Link href="/">
            <div className="text-xl font-bold tracking-tight">Attendify</div>
            </Link>
            <nav>
              <Link href="/login">
                <Button variant="ghost">Log in</Button>
              </Link>
              <Link href="/signup" className="ml-2">
                <Button>Get Started</Button>
              </Link>
            </nav>
          </header></div>
    )
}