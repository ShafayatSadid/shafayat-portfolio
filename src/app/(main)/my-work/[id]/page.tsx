// src/app/(main)/my-work/[id]/page.tsx
import { Suspense } from "react";
import { Metadata } from "next";
import { Loader2 } from "lucide-react";
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

// ১. ডেটা রিড করার জন্য আলাদা চাইল্ড কম্পোনেন্ট
async function ProjectContent({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  return <ProjectDetailsClient id={resolvedParams.id} />;
}

// ২. মেইন পেজ (Suspense দিয়ে র্যাপ করা)
export default function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  return (
    <Suspense 
      fallback={
        <div className="flex h-[70vh] items-center justify-center">
          <Loader2 className="size-8 animate-spin text-primary" />
        </div>
      }
    >
      <ProjectContent params={params} />
    </Suspense>
  );
}