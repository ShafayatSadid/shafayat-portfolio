// src/app/dashboard/projects/new/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { createProject } from "@/lib/api";
import { ImageUploader } from "@/components/dashboard/ImageUploader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Loader2, Save } from "lucide-react";
import { toast } from "sonner";

export default function NewProjectPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    techStack: "",
    liveUrl: "",
    githubUrl: "",
    image: "",
    challenges: "",
    improvements: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.image) {
      toast.error("Please upload a project cover image");
      return;
    }

    setLoading(true);
    try {
      const techArray = formData.techStack.split(",").map(t => t.trim()).filter(Boolean);
      await createProject({ ...formData, techStack: techArray });
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
          <ImageUploader value={formData.image} onChange={(url) => setFormData({ ...formData, image: url })} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="title">Project Title</Label>
          <Input id="title" placeholder="e.g., Monohor E-commerce" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="techStack">Tech Stack</Label>
          <Input id="techStack" placeholder="Next.js, React, MongoDB (Comma separated)" value={formData.techStack} onChange={(e) => setFormData({ ...formData, techStack: e.target.value })} required />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="liveUrl">Live URL</Label>
            <Input id="liveUrl" type="url" placeholder="https://example.com" value={formData.liveUrl} onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="githubUrl">GitHub URL (Client)</Label>
            <Input id="githubUrl" type="url" placeholder="https://github.com/..." value={formData.githubUrl} onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })} required />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Short Description</Label>
          <Textarea id="description" rows={3} className="resize-none" placeholder="Brief overview..." value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} required />
        </div>

        {/* Markdown Tab: Challenges */}
        <div className="space-y-2">
          <Label>Challenges Faced (Markdown Supported)</Label>
          <Tabs defaultValue="write" className="w-full">
            <TabsList className="mb-2">
              <TabsTrigger value="write">Write</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
            </TabsList>
            <TabsContent value="write">
              <Textarea id="challenges" rows={4} className="resize-none font-mono text-sm" placeholder="What difficulties did you face?" value={formData.challenges} onChange={(e) => setFormData({ ...formData, challenges: e.target.value })} />
            </TabsContent>
            <TabsContent value="preview">
              <div className="min-h-[100px] rounded-md border bg-muted/30 p-4 prose prose-sm dark:prose-invert max-w-none">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{formData.challenges || "*No content to preview.*"}</ReactMarkdown>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Markdown Tab: Improvements */}
        <div className="space-y-2">
          <Label>Potential Improvements (Markdown Supported)</Label>
          <Tabs defaultValue="write" className="w-full">
            <TabsList className="mb-2">
              <TabsTrigger value="write">Write</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
            </TabsList>
            <TabsContent value="write">
              <Textarea id="improvements" rows={4} className="resize-none font-mono text-sm" placeholder="What features will you add in the future?" value={formData.improvements} onChange={(e) => setFormData({ ...formData, improvements: e.target.value })} />
            </TabsContent>
            <TabsContent value="preview">
              <div className="min-h-[100px] rounded-md border bg-muted/30 p-4 prose prose-sm dark:prose-invert max-w-none">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{formData.improvements || "*No content to preview.*"}</ReactMarkdown>
              </div>
            </TabsContent>
          </Tabs>
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