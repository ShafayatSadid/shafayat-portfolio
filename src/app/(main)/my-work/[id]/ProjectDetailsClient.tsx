// src/app/(main)/my-work/[id]/ProjectDetailsClient.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getProjectByIdPublic } from "@/lib/api";
import { Project } from "@/types/project";
import { ArrowLeft, ExternalLink, Loader2, Lightbulb, Target } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "cn";

export default function ProjectDetailsClient({ id }: { id: string }) {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProjectByIdPublic(id)
      .then((data) => {
        setProject(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <Loader2 className="size-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex h-[70vh] flex-col items-center justify-center text-center">
        <h1 className="mb-4 text-2xl font-bold">Project Not Found</h1>
        <Link href="/my-work" className={buttonVariants()}>Back to Portfolio</Link>
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-24">
      <Link href="/my-work" className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
        <ArrowLeft className="size-4" /> Back to Projects
      </Link>

      <h1 className="mb-4 text-3xl font-bold tracking-tight md:text-5xl">{project.title}</h1>
      
      <div className="mb-8 flex flex-wrap gap-3">
        <a href={project.liveUrl} target="_blank" rel="noreferrer" className={cn(buttonVariants(), "gap-2 rounded-full")}>
          Live Demo <ExternalLink className="size-4" />
        </a>
        <a href={project.githubUrl} target="_blank" rel="noreferrer" className={cn(buttonVariants({ variant: "outline" }), "gap-2 rounded-full")}>
          <SiGithub className="size-4" /> GitHub Repo
        </a>
      </div>

      <div className="relative mb-12 aspect-video w-full overflow-hidden rounded-3xl border bg-muted shadow-sm">
        <Image src={project.image} alt={project.title} width={1200} height={675} unoptimized priority className="h-full w-full object-cover" />
      </div>

      <div className="grid gap-10 md:grid-cols-3">
        <div className="md:col-span-2 space-y-10">
          <section>
            <h2 className="mb-4 text-2xl font-bold">Project Overview</h2>
            <p className="text-muted-foreground leading-relaxed text-lg">{project.description}</p>
          </section>

          <section>
            <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold"><Target className="size-6 text-primary" /> Challenges Faced</h2>
            <p className="text-muted-foreground leading-relaxed">
              {project.challenges || "Details about the challenges faced will be updated soon."}
            </p>
          </section>

          <section>
            <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold"><Lightbulb className="size-6 text-primary" /> Future Improvements</h2>
            <p className="text-muted-foreground leading-relaxed">
              {project.improvements || "Future plans for this project will be updated soon."}
            </p>
          </section>
        </div>

        <div>
          <div className="sticky top-24 rounded-2xl border bg-card p-6 shadow-sm">
            <h3 className="mb-4 font-semibold text-lg">Tech Stack</h3>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span key={tech} className="rounded-full border bg-secondary/50 px-3 py-1 text-sm font-medium">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}