// src/app/(main)/my-work/[id]/page.tsx
import { Metadata } from "next";
import ProjectDetailsClient from "./ProjectDetailsClient";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  "use cache";
  const resolvedParams = await params;
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/projects/${resolvedParams.id}`);
    if (!res.ok) throw new Error("Not found");
    const project = await res.json();

    return {
      title: `${project.title} | Project Details`,
      description: project.description,
    };
  } catch {
    return { title: "Project Not Found" };
  }
}

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  return <ProjectDetailsClient id={resolvedParams.id} />;
}