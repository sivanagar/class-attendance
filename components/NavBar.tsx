import Link from "next/link";
import { auth } from "@/lib/auth";
import AuthButtons from "./AuthButtons";

export default async function NavBar() {
  const session = await auth();

  
    return (<div>
        {/* 1. Minimal Navbar */}
          <header className="flex h-16 items-center justify-between border-b px-6 lg:px-10">
            
            <Link href={session ? "/dashboard":"/"}>
            <div className="text-xl font-bold tracking-tight">Attendify</div>
            </Link>
            
            <nav>
              <AuthButtons />
              
              
            </nav>
          </header></div>
    )
}