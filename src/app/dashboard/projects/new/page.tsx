// src/app/dashboard/projects/new/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createProject } from "@/lib/api";
import { ImageUploader } from "@/components/dashboard/ImageUploader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Loader2, Save } from "lucide-react";
import { toast } from "sonner";

export default function NewProjectPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    techStack: "", // কমা দিয়ে লিখবে
    liveUrl: "",
    githubUrl: "",
    image: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.image) {
      toast.error("Please upload a project cover image");
      return;
    }

    setLoading(true);
    try {
      // কমা দিয়ে লেখা টেক স্ট্যাককে অ্যারেতে কনভার্ট করা
      const techArray = formData.techStack.split(",").map(t => t.trim()).filter(Boolean);
      
      await createProject({
        title: formData.title,
        description: formData.description,
        techStack: techArray,
        liveUrl: formData.liveUrl,
        githubUrl: formData.githubUrl,
        image: formData.image,
      });
      
      toast.success("Project created successfully!");
      router.push("/dashboard/projects");
      router.refresh();
    } catch (error) {
      toast.error("Failed to create project.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl pb-20">
      <div className="mb-8 flex items-center gap-4">
        <Link href="/dashboard/projects" className="text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="size-5" />
        </Link>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Add New Project</h2>
          <p className="text-muted-foreground text-sm">Showcase your best work.</p>
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
            placeholder="e.g., Monohor E-commerce"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="techStack">Tech Stack</Label>
          <Input
            id="techStack"
            placeholder="Next.js, React, MongoDB, Tailwind (Comma separated)"
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
              placeholder="https://example.com"
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
              placeholder="https://github.com/username/repo"
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
            placeholder="A brief overview of what the project does and what problems it solves..."
            rows={5}
            className="resize-none"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
          />
        </div>

        <div className="flex justify-end border-t pt-6">
          <Button type="submit" disabled={loading} className="rounded-full px-8 gap-2">
            {loading ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
            {loading ? "Saving..." : "Save Project"}
          </Button>
        </div>
      </form>
    </div>
  );
}