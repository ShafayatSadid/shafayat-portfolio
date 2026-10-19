// src/components/sections/Projects.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import * as motion from "motion/react-client";
import type { Variants } from "motion/react";
import { ExternalLink } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { buttonVariants } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "cn";
import { PROJECTS } from "@/lib/projects";

const containerVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-5xl scroll-mt-20 px-4 py-24">
      {/* Section Header */}
      <div className="mb-12 text-center md:mb-16">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
          Featured <span className="text-primary">Projects</span>
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          A selection of my recent full-stack work, focusing on real-world
          problems and clean architecture.
        </p>
      </div>

      {/* Carousel Wrapper with Motion */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="mx-auto w-full max-w-4xl"
      >
        <Carousel className="w-full">
          <CarouselContent>
            {PROJECTS.map((project, index) => (
              <CarouselItem key={project.title}>
                {/* Project Card */}
                <div className="group flex flex-col overflow-hidden rounded-3xl border bg-card shadow-sm transition-all hover:shadow-md md:flex-row">
                  
                  {/* Image Side */}
                  <div className="relative aspect-video w-full shrink-0 overflow-hidden border-b bg-muted/30 md:aspect-4/3 md:w-1/2 md:border-b-0 md:border-r">
                    <Image
                      src={project.image}
                      alt={project.title}
                      width={800}
                      height={600}
                      priority={index === 0}
                      unoptimized
                      draggable={false}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>

                  {/* Content Side */}
                  <div className="flex w-full flex-col justify-center p-6 md:w-1/2 md:p-10">
                    <span className="mb-2 font-mono text-sm font-semibold text-primary">
                      0{index + 1}
                    </span>
                    
                    <h3 className="mb-4 text-2xl font-bold tracking-tight md:text-3xl">
                      {project.title}
                    </h3>
                    
                    <p className="mb-6 text-sm text-muted-foreground leading-relaxed md:text-base">
                      {project.description}
                    </p>

                    {/* Tech Stack */}
                    <div className="mb-8 flex flex-wrap gap-2">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full border border-border/50 bg-secondary/50 px-3 py-1 text-xs font-medium text-secondary-foreground"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap items-center gap-3">
                      <Link
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className={cn(
                          buttonVariants({ variant: "default" }),
                          "w-full gap-2 rounded-full sm:w-auto"
                        )}
                      >
                        Live Demo
                        <ExternalLink className="size-4" />
                      </Link>
                      <Link
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className={cn(
                          buttonVariants({ variant: "outline" }),
                          "w-full gap-2 rounded-full sm:w-auto"
                        )}
                      >
                        <SiGithub className="size-4" />
                        GitHub
                      </Link>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Desktop Arrows (Outside the card on left and right) */}
          <CarouselPrevious className="hidden md:flex -left-16 h-12 w-12" />
          <CarouselNext className="hidden md:flex -right-16 h-12 w-12" />
          
          {/* Mobile Arrows (Below the card) */}
          <div className="mt-8 flex justify-center gap-4 md:hidden">
            <CarouselPrevious className="relative left-0 top-0 translate-y-0 h-10 w-10" />
            <CarouselNext className="relative right-0 top-0 translate-y-0 h-10 w-10" />
          </div>
        </Carousel>
      </motion.div>
    </section>
  );
}