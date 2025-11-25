"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import SignOut from "@/components/SignOut"; 

export default function AuthButtons() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div className="h-9 w-20 bg-slate-100 animate-pulse rounded-md" />;
  }

  if (session) {
    return <SignOut />;
  }

  return (
    <>
      <Link href="/sign-in">
        <Button variant="ghost">Sign in</Button>
      </Link>
      <Link href="/sign-in" className="ml-2">
        <Button>Get Started</Button>
      </Link>
    </>
  );
}