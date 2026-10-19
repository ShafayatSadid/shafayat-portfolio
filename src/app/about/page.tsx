// src/app/about/page.tsx
"use client";

import Link from "next/link";
import * as motion from "motion/react-client";
import type { Variants } from "motion/react";
import { Download, Briefcase, GraduationCap, Code2, Award } from "lucide-react";
import { About } from "@/components/sections/About";
import { buttonVariants } from "@/components/ui/button";

const JOURNEY = [
    {
        year: "2023",
        title: "First Step into Web Development",
        description: "Started learning HTML and CSS. Due to academic priorities, had to take a break from coding.",
        icon: Code2,
    },
    {
        year: "2024",
        title: "The WordPress Dilemma & C/C++",
        description: "Explored WordPress but realized it lacked true engineering. Decided to learn C and C++ to build a strong programming foundation.",
        icon: Code2,
    },
    {
        year: "2025 - 2026",
        title: "Programming Hero Full-Stack Journey",
        description: "Enrolled in Programming Hero (Level 1). Mastered React, Next.js, Node.js, Express, and MongoDB. Completed the course with Excellence.",
        icon: GraduationCap,
        certificateUrl: "/certificate.pdf", // এখানে সার্টিফিকেটের পাথ দেওয়া হলো
    },
    {
        year: "2026 - Present",
        title: "TypeScript, Go & DSA",
        description: "Started exploring Golang and TypeScript (this portfolio is my first TS project). Currently enrolled in Phitron CSE Fundamentals, learning C, and solved 60+ problems on Codeforces.",
        icon: Briefcase,
    },
];

const timelineVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.2 },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function AboutPage() {
    return (
        <main className="mx-auto min-h-[80vh] max-w-5xl px-4 py-24">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-16 text-center"
            >
                <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
                    About <span className="text-primary">Me</span>
                </h1>
                <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                    Get to know the person behind the code. My background, skills, and journey as a developer.
                </p>
            </motion.div>

            {/* Reusing Bento Grid */}
            <div className="mb-24">
                <About />
            </div>

            {/* Timeline Section */}
            <div className="mb-24">
                <h2 className="mb-12 text-center text-3xl font-bold tracking-tight md:text-4xl">
                    My <span className="text-primary">Journey</span>
                </h2>

                <motion.div
                    variants={timelineVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="relative mx-auto max-w-2xl border-l-2 border-muted-foreground/20 pl-6 md:pl-8"
                >
                    {JOURNEY.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                className="relative mb-12 last:mb-0"
                            >
                                {/* Timeline Dot & Icon */}
                                <div className="absolute -left-[35px] flex size-8 items-center justify-center rounded-full border-2 border-primary bg-background text-primary md:-left-[43px]">
                                    <Icon className="size-4" />
                                </div>

                                {/* Content */}
                                <div className="rounded-2xl border bg-card p-6 shadow-sm">
                                    <span className="mb-2 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                                        {item.year}
                                    </span>
                                    <h3 className="mb-2 text-xl font-bold">{item.title}</h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        {item.description}
                                    </p>
                                    
                                    {/* Certificate Link (শুধু যেখানে পাথ দেওয়া আছে সেখানে দেখাবে) */}
                                    {item.certificateUrl && (
                                        <a
                                            href={item.certificateUrl}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="mt-4 inline-flex items-center gap-1.5 rounded-md bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary transition-colors hover:bg-primary/20"
                                        >
                                            <Award className="size-4" />
                                            View Certificate
                                        </a>
                                    )}
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>

            {/* CTA Resume */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-center"
            >
                <h2 className="mb-4 text-2xl font-bold">Want to know more?</h2>
                <p className="mb-8 text-muted-foreground">
                    Download my resume to see my full experience and skill set.
                </p>
                <Link
                    href="/resume.pdf"
                    target="_blank"
                    className={buttonVariants({ size: "lg", className: "rounded-full gap-2" })}
                >
                    <Download className="size-4" />
                    Download Resume
                </Link>
            </motion.div>
        </main>
    );
}