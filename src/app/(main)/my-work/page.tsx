// src/app/my-work/page.tsx
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import * as motion from "motion/react-client";
import { ExternalLink } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { getProjects } from "@/lib/api";
import { Project } from "@/types/project";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "cn";

export default function MyWorkPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProjects()
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch(console.error);
  }, []);

  return (
    <main className="mx-auto min-h-[80vh] max-w-5xl px-4 py-24">
      <div className="mb-16 text-center">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
          My <span className="text-primary">Work</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          A complete showcase of my recent full-stack projects and technical expertise.
        </p>
      </div>

      {loading ? (
        <div className="grid gap-8 md:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-96 animate-pulse rounded-3xl border bg-muted" />
          ))}
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2">
          {projects.map((project) => (
            <motion.div
              key={project._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5 }}
              className="group flex flex-col overflow-hidden rounded-3xl border bg-card shadow-sm transition-all hover:shadow-md"
            >
              {/* Image */}
              <div className="relative aspect-video w-full overflow-hidden border-b bg-muted/30">
                <Image
                  src={project.image}
                  alt={project.title}
                  width={800}
                  height={450}
                  unoptimized
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col p-6 md:p-8">
                <h2 className="mb-3 text-2xl font-bold tracking-tight">{project.title}</h2>
                <p className="mb-6 flex-1 text-sm text-muted-foreground leading-relaxed">
                  {project.description}
                </p>

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

                <div className="flex items-center gap-3 border-t pt-6">
                  <Link
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className={cn(buttonVariants({ variant: "default" }), "w-full gap-2 rounded-full sm:w-auto")}
                  >
                    Live Demo
                  </Link>
                  <Link
                    href={`/my-work/${project._id}`}
                    className={cn(buttonVariants({ variant: "outline" }), "w-full gap-2 rounded-full sm:w-auto")}
                  >
                    View Details
                  </Link>
                </div>

              </div>
            </motion.div>
          ))}
        </div>
      )}
    </main>
  );
}