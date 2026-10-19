// src/components/sections/Projects.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import * as motion from "motion/react-client";
import type { Variants } from "motion/react";
import { ExternalLink } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "cn";
import { PROJECTS } from "@/lib/projects";

// Stagger container for cards
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

// Individual card animation
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-5xl scroll-mt-20 px-4 py-24">
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Featured Projects</h2>
        <p className="mt-2 text-muted-foreground">A selection of my recent work.</p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="grid gap-6 md:grid-cols-2"
      >
        {PROJECTS.map((project) => (
          <motion.div key={project.title} variants={cardVariants}>
            <Card className="group flex h-full flex-col overflow-hidden transition-all hover:shadow-md">
              {/* Project Image */}
              <div className="relative aspect-video w-full overflow-hidden border-b bg-muted">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  priority
                  unoptimized // Next.js 16 issue এর জন্য
                />
              </div>

              <CardHeader>
                <CardTitle className="text-xl">{project.title}</CardTitle>
                <CardDescription className="line-clamp-2">
                  {project.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="flex-1">
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md bg-secondary px-2 py-1 text-xs font-medium text-secondary-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </CardContent>

              <CardFooter className="flex gap-2 border-t bg-muted/20 px-6 py-4">
                <Link
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={cn(buttonVariants({ variant: "default", size: "sm" }), "gap-2")}
                >
                  Live Demo
                  <ExternalLink className="size-3" />
                </Link>
                <Link
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={cn(buttonVariants({ variant: "outline", size: "sm" }), "gap-2")}
                >
                  <SiGithub className="size-4" />
                  Code
                </Link>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}