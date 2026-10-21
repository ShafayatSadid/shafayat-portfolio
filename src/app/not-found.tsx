// src/app/(main)/not-found.tsx
"use client";

import Link from "next/link";
import * as motion from "motion/react-client";
import { FileQuestion, MoveLeft } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "cn";

export default function NotFound() {
  return (
    <main className="relative flex min-h-[80vh] flex-col items-center justify-center overflow-hidden px-4 text-center">
      {/* Background Glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center">
        <div className="h-[300px] w-[300px] rounded-full bg-primary/10 blur-[100px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, type: "spring" }}
        className="relative mb-8 flex size-32 items-center justify-center rounded-3xl border bg-card shadow-sm"
      >
        <FileQuestion className="size-16 text-primary" />
        <motion.div 
          animate={{ y: [0, -10, 0] }} 
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="absolute -right-4 -top-4 flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold shadow-lg"
        >
          404
        </motion.div>
      </motion.div>

      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-4 text-3xl font-bold tracking-tight md:text-5xl"
      >
        Page Not Found
      </motion.h1>

      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mx-auto mb-8 max-w-md text-muted-foreground"
      >
        Oops! The page you are looking for doesn&apos;t exist or has been moved. Let&apos;s get you back on track.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Link href="/" className={cn(buttonVariants({ size: "lg" }), "rounded-full gap-2")}>
          <MoveLeft className="size-4" />
          Back to Home
        </Link>
      </motion.div>
    </main>
  );
}