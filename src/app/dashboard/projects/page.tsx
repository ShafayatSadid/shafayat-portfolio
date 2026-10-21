// src/app/dashboard/projects/page.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getProjects, deleteProject } from "@/lib/api";
import { Project } from "@/types/project";
import { Button, buttonVariants } from "@/components/ui/button";
import { Plus, Edit, Trash2, Loader2, ExternalLink } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { toast } from "sonner";
import { cn } from "cn";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function ProjectsListPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [projectToDelete, setProjectToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchProjects = async () => {
    try {
      const data = await getProjects();
      setProjects(data);
    } catch (error) {
      toast.error("Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      await fetchProjects();
    })();
  }, []);

  const confirmDelete = async () => {
    if (!projectToDelete) return;
    setIsDeleting(true);
    try {
      await deleteProject(projectToDelete);
      toast.success("Project deleted successfully");
      setProjects(projects.filter((p) => p._id !== projectToDelete));
    } catch (error) {
      toast.error("Failed to delete project");
    } finally {
      setIsDeleting(false);
      setProjectToDelete(null);
    }
  };

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Projects</h2>
          <p className="text-muted-foreground">Manage your portfolio projects here.</p>
        </div>
        <Link href="/dashboard/projects/new" className={cn(buttonVariants(), "gap-2 rounded-full")}>
          <Plus className="size-4" />
          Add New Project
        </Link>
      </div>

      {loading ? (
        <div className="flex h-40 items-center justify-center rounded-2xl border bg-card">
          <Loader2 className="size-6 animate-spin text-muted-foreground" />
        </div>
      ) : projects.length === 0 ? (
        <div className="flex h-40 flex-col items-center justify-center rounded-2xl border bg-card text-muted-foreground">
          <p>No projects found. Add your first one!</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2">
          {projects.map((project) => (
            <div 
              key={project._id} 
              className="group flex flex-col overflow-hidden rounded-2xl border bg-card shadow-sm transition-all hover:shadow-md"
            >
              {/* Image Section */}
              <div className="relative aspect-video w-full overflow-hidden border-b bg-muted">
                <Image
                  src={project.image}
                  alt={project.title}
                  width={800}
                  height={450}
                  unoptimized
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                   <Link
                    href={project.liveUrl}
                    target="_blank"
                    className="flex size-8 items-center justify-center rounded-full bg-background/90 text-foreground backdrop-blur-sm hover:text-primary transition-colors"
                  >
                    <ExternalLink className="size-4" />
                  </Link>
                  <Link
                    href={project.githubUrl}
                    target="_blank"
                    className="flex size-8 items-center justify-center rounded-full bg-background/90 text-foreground backdrop-blur-sm hover:text-primary transition-colors"
                  >
                    <SiGithub className="size-4" />
                  </Link>
                </div>
              </div>

              {/* Content Section */}
              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-lg font-bold leading-tight mb-2">{project.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-1">
                  {project.description}
                </p>
                
                {/* Tech Stack Pills */}
                <div className="mb-5 flex flex-wrap gap-1.5">
                  {project.techStack.slice(0, 4).map((tech) => (
                    <span key={tech} className="rounded-md bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
                      {tech}
                    </span>
                  ))}
                  {project.techStack.length > 4 && (
                    <span className="rounded-md bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                      +{project.techStack.length - 4}
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between border-t pt-4">
                  <Link 
                    href={`/dashboard/projects/${project._id}/edit`} 
                    className={cn(buttonVariants({ variant: "outline", size: "sm" }), "rounded-full h-8 px-4")}
                  >
                    <Edit className="mr-2 size-3.5" /> Edit
                  </Link>
                  <Button 
                    variant="destructive" 
                    size="sm" 
                    className="rounded-full h-8 px-4 bg-destructive/10 text-destructive hover:bg-destructive hover:text-white"
                    onClick={() => setProjectToDelete(project._id)}
                  >
                    <Trash2 className="mr-2 size-3.5" /> Delete
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Modal */}
      <AlertDialog open={!!projectToDelete} onOpenChange={(open) => !open && setProjectToDelete(null)}>
        <AlertDialogContent className="rounded-2xl sm:max-w-md">
          <AlertDialogHeader className="gap-5">
            <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-destructive/10 sm:mx-0">
              <Trash2 className="size-7 text-red-500" />
            </div>
            <div>
              <AlertDialogTitle className="text-xl">Delete Project?</AlertDialogTitle>
              <AlertDialogDescription className="mt-2 text-base leading-relaxed">
                Are you sure you want to delete this project? This action cannot be undone.
              </AlertDialogDescription>
            </div>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-6 gap-3 sm:gap-2">
            <AlertDialogCancel disabled={isDeleting} className="rounded-full px-6">Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={(e) => { e.preventDefault(); confirmDelete(); }} 
              disabled={isDeleting}
              className="rounded-full bg-red-500 px-6 text-white hover:bg-red-600 gap-2"
            >
              {isDeleting ? <Loader2 className="size-4 animate-spin" /> : <Trash2 className="size-4" />}
              {isDeleting ? "Deleting..." : "Yes, Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}