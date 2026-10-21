// src/app/dashboard/projects/[id]/edit/page.tsx
"use client";

import { Suspense, use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getProjectById, updateProject } from "@/lib/api";
import { ImageUploader } from "@/components/dashboard/ImageUploader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Loader2, Save } from "lucide-react";
import { toast } from "sonner";

function EditProjectContent({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    techStack: "", 
    liveUrl: "",
    githubUrl: "",
    image: "",
  });

  useEffect(() => {
    (async () => {
      try {
        const data = await getProjectById(resolvedParams.id);
        setFormData({
          title: data.title,
          description: data.description,
          techStack: data.techStack.join(", "), // অ্যারে থেকে কমা স্ট্রিং
          liveUrl: data.liveUrl,
          githubUrl: data.githubUrl,
          image: data.image,
        });
      } catch (error) {
        toast.error("Failed to load project data");
        router.push("/dashboard/projects");
      } finally {
        setLoading(false);
      }
    })();
  }, [resolvedParams.id, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const techArray = formData.techStack.split(",").map(t => t.trim()).filter(Boolean);
      
      await updateProject(resolvedParams.id, {
        title: formData.title,
        description: formData.description,
        techStack: techArray,
        liveUrl: formData.liveUrl,
        githubUrl: formData.githubUrl,
        image: formData.image,
      });
      
      toast.success("Project updated successfully!");
      router.push("/dashboard/projects");
      router.refresh();
    } catch (error) {
      toast.error("Failed to update project.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="size-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl pb-20">
      <div className="mb-8 flex items-center gap-4">
        <Link href="/dashboard/projects" className="text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="size-5" />
        </Link>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Edit Project</h2>
          <p className="text-muted-foreground text-sm">Update your project details.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 rounded-2xl border bg-card p-6 shadow-sm md:p-8">
        
        <div className="space-y-2">
          <Label>Project Cover Image</Label>
          <ImageUploader 
            value={formData.image} 
            onChange={(url) => setFormData({ ...formData, image: url })} 
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="title">Project Title</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="techStack">Tech Stack</Label>
          <Input
            id="techStack"
            value={formData.techStack}
            onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
            required
          />
          <p className="text-xs text-muted-foreground">Separate each technology with a comma.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="liveUrl">Live URL</Label>
            <Input
              id="liveUrl"
              type="url"
              value={formData.liveUrl}
              onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="githubUrl">GitHub URL</Label>
            <Input
              id="githubUrl"
              type="url"
              value={formData.githubUrl}
              onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            rows={5}
            className="resize-none"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
          />
        </div>

        <div className="flex justify-end border-t pt-6">
          <Button type="submit" disabled={saving} className="rounded-full px-8 gap-2">
            {saving ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
            {saving ? "Updating..." : "Update Project"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  return (
    <Suspense fallback={
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="size-8 animate-spin text-muted-foreground" />
      </div>
    }>
      <EditProjectContent params={params} />
    </Suspense>
  );
}