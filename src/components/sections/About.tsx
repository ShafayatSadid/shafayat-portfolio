// src/components/sections/About.tsx
"use client";

import Image from "next/image";
import * as motion from "motion/react-client";
import type { Variants } from "motion/react";
import { GraduationCap, MapPin } from "lucide-react";
import { SKILL_GROUPS, EXPERIENCES } from "@/lib/about";
import { cn } from "cn";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function About() {
  return (
    <section id="about" className="mx-auto max-w-5xl scroll-mt-20 px-4 py-24">
      <div className="mb-12">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
          About <span className="text-primary">Me</span>
        </h2>
        <p className="mt-2 text-muted-foreground">
          A quick overview of who I am, my skills, and what I do.
        </p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid gap-4 md:grid-cols-3"
      >
        {/* 1. Bio Card (Spans 2 columns) */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col justify-between gap-6 rounded-2xl border bg-card p-6 md:col-span-2 md:p-8"
        >
          <div className="flex flex-col gap-6 md:flex-row md:items-center">
            <div className="h-24 w-24 shrink-0 overflow-hidden rounded-full ring-4 ring-primary/20">
              <Image
                src="/images/shafayat.jpg"
                alt="Shafayat Sadid"
                width={96}
                height={96}
                unoptimized
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="text-2xl font-bold">Shafayat Sadid</h3>
              <p className="mt-1 text-sm font-medium text-primary">Full-Stack Developer</p>
            </div>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            I&apos;m a solo full-stack developer based in Bangladesh. I specialize in building
            production-ready web applications with a focus on performance, clean code, and
            seamless user experiences. I love solving real-world problems using modern
            technologies like Next.js, TypeScript, and MongoDB.
          </p>
        </motion.div>

        {/* 2. Experience Card (Spans 1 column) */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col justify-between rounded-2xl border bg-primary/5 p-6 md:col-span-1"
        >
          <div>
            <h3 className="mb-4 text-lg font-semibold">Experience</h3>
            {EXPERIENCES.map((exp) => (
              <div key={exp.role} className="mt-2">
                <p className="font-medium text-foreground">{exp.role}</p>
                <p className="mt-1 text-sm text-muted-foreground">{exp.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 inline-flex w-fit rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            4+ Client Projects
          </div>
        </motion.div>

        {/* 3. Education Card (নতুন যোগ করা হয়েছে - Spans 1 column) */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col justify-between rounded-2xl border bg-card p-6 md:col-span-1"
        >
          <div>
            <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
              <GraduationCap className="size-5 text-primary" /> Education
            </h3>
            <p className="font-medium text-foreground">Al Azhar University</p>
            <p className="mt-1 text-sm text-muted-foreground">Faculty of Islamic Dawah</p>
            <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
              <MapPin className="size-3" /> Cairo, Egypt
            </p>
          </div>
          <div className="mt-6 inline-flex w-fit rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
            2026 - Present
          </div>
        </motion.div>

        {/* 4. Skills Cards (Grid loop) */}
        {SKILL_GROUPS.map((group, index) => {
          const isTools = group.title === "Tools & Platforms";

          return (
            <motion.div
              key={group.title}
              variants={itemVariants}
              className={cn(
                "rounded-2xl border bg-card p-6",
                isTools ? "md:col-span-2" : "md:col-span-1"
              )}
            >
              <h3 className="mb-4 text-lg font-semibold">{group.title}</h3>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-border/50 bg-secondary/50 px-3 py-1 text-xs font-medium text-secondary-foreground"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}