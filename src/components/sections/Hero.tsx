// src/components/sections/Hero.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import * as motion from "motion/react-client";
import type { Variants } from "motion/react"; // <-- নতুন ইমপোর্ট
import { ArrowRight, Download, MapPin, Code2 } from "lucide-react";
import { SiNextdotjs, SiReact, SiNodedotjs, SiTypescript, SiMongodb } from "react-icons/si";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "cn";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-background py-20">
      {/* Background Glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center">
        <div className="h-[400px] w-[400px] md:h-[600px] md:w-[600px] rounded-full bg-primary/10 blur-[120px] md:blur-[180px] opacity-60" />
      </div>

      <div className="mx-auto w-full max-w-6xl px-4 md:px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-6"
        >
          {/* ১. বায়ো কার্ড (৭ কলাম) */}
          <motion.div
            variants={itemVariants}
            className="group relative flex flex-col justify-center overflow-hidden rounded-3xl border border-border bg-card p-8 md:col-span-7 md:p-10 transition-all hover:border-primary/50"
          >
            <div className="relative z-10">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-3 py-1 text-xs font-medium">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
                </span>
                Available for work
              </div>
              <h1 className="mb-4 text-4xl font-bold leading-[1.1] tracking-tight md:text-5xl lg:text-6xl">
                Hi, I&apos;m <span className="text-primary">Shafayat</span>
              </h1>
              <p className="mb-8 max-w-md text-base text-muted-foreground md:text-lg">
                A Full-Stack Developer helping businesses turn their ideas into scalable, production-ready web applications.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href="/my-work"
                  className={cn(buttonVariants(), "gap-2 rounded-full group/btn")}
                >
                  View My Work
                  <ArrowRight className="size-4 transition-transform group-hover/btn:translate-x-1" />
                </Link>
                <a
                  href="/resume.pdf"
                  target="_blank"
                  className={cn(buttonVariants({ variant: "outline" }), "gap-2 rounded-full")}
                >
                  Resume
                  <Download className="size-4" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* ২. ছবির কার্ড (৫ কলাম) */}
          <motion.div
            variants={itemVariants}
            className="group relative overflow-hidden rounded-3xl border border-border bg-muted md:col-span-5 md:row-span-2 min-h-[350px] md:min-h-full"
          >
            <Image
              src="/images/shafayat.jpg"
              alt="Shafayat Sadid"
              fill
              priority
              unoptimized
              className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="absolute bottom-6 left-6 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
               <p className="font-semibold">Shafayat Sadid</p>
               <p className="text-xs text-white/80">Full-Stack Developer</p>
            </div>
          </motion.div>

          {/* ৩. টেক স্ট্যাক কার্ড (৪ কলাম) */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col justify-center rounded-3xl border border-border bg-card p-6 md:col-span-4 md:p-8 transition-all hover:border-primary/50"
          >
            <div className="mb-4 flex items-center gap-2">
              <Code2 className="size-5 text-primary" />
              <h3 className="font-semibold text-foreground">Core Stack</h3>
            </div>
            <div className="flex flex-wrap gap-4">
              <SiNextdotjs className="size-8 text-foreground transition-transform hover:-translate-y-1" title="Next.js" />
              <SiReact className="size-8 text-[#61DAFB] transition-transform hover:-translate-y-1" title="React" />
              <SiTypescript className="size-8 text-[#3178C6] transition-transform hover:-translate-y-1" title="TypeScript" />
              <SiNodedotjs className="size-8 text-[#339933] transition-transform hover:-translate-y-1" title="Node.js" />
              <SiMongodb className="size-8 text-[#47A248] transition-transform hover:-translate-y-1" title="MongoDB" />
            </div>
          </motion.div>

          {/* ৪. লোকেশন এবং স্ট্যাটস কার্ড (৩ কলাম) */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col justify-center rounded-3xl border border-border bg-card p-6 md:col-span-3 md:p-8 transition-all hover:border-primary/50"
          >
            <div className="flex items-center gap-2 text-muted-foreground mb-4">
              <MapPin className="size-4" />
              <span className="text-sm font-medium">Cairo, Egypt</span>
            </div>
            <div className="flex items-center gap-6">
              <div>
                <p className="text-3xl font-bold text-foreground">4+</p>
                <p className="text-xs text-muted-foreground mt-1">Projects</p>
              </div>
              <div className="h-8 w-px bg-border" />
              <div>
                <p className="text-3xl font-bold text-foreground">100%</p>
                <p className="text-xs text-muted-foreground mt-1">Satisfaction</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}