// src/components/sections/CTASection.tsx
"use client";

import Link from "next/link";
import * as motion from "motion/react-client";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-5xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative overflow-hidden rounded-3xl border bg-card p-10 text-center shadow-sm md:p-16"
        >
          {/* Background Glow */}
          <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />

          <div className="relative z-10">
            <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
              Have a project in mind?
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-base text-muted-foreground md:text-lg">
              Let&apos;s build something great together. I&apos;m currently available for freelance work and open to new opportunities.
            </p>
            <Link
              href="/contact"
              className={buttonVariants({ size: "lg", className: "rounded-full gap-2 px-8" })}
            >
              Contact Me
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}