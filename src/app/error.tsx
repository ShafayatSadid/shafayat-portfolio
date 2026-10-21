// src/app/error.tsx
"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RotateCcw, Home } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "cn";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // ভবিষ্যতে এখানে Sentry বা অন্য কোনো লগিং সার্ভিসে এরর পাঠানো যাবে
    console.error(error);
  }, [error]);

  return (
    <div className="relative flex min-h-[80vh] flex-col items-center justify-center overflow-hidden px-4 text-center">
      {/* Background Glow (Red) */}
      <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center">
        <div className="h-[300px] w-[300px] rounded-full bg-red-500/10 blur-[100px]" />
      </div>

      <div className="mb-8 flex size-24 items-center justify-center rounded-full bg-red-500/10">
        <AlertTriangle className="size-12 text-red-500" />
      </div>

      <h1 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
        Something went wrong!
      </h1>
      
      <p className="mx-auto mb-8 max-w-md text-muted-foreground">
        We encountered an unexpected error. Please try again or contact support if the problem persists.
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-4">
        <Button onClick={() => reset()} size="lg" className="rounded-full gap-2 w-full sm:w-auto">
          <RotateCcw className="size-4" />
          Try Again
        </Button>
        <Link href="/" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "rounded-full gap-2 w-full sm:w-auto")}>
          <Home className="size-4" />
          Go to Home
        </Link>
      </div>
    </div>
  );
}