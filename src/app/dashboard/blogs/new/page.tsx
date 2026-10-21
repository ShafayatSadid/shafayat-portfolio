// src/app/dashboard/blogs/new/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createBlog } from "@/lib/api";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Loader2, Save } from "lucide-react";
import { toast } from "sonner";
import { cn } from "cn";

export default function NewBlogPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    image: "",
    content: "",
  });

  // টাইটেল থেকে অটোমেটিক Slug তৈরি করার ফাংশন
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setFormData((prev) => ({
      ...prev,
      title,
      // যদি ইউজার ম্যানুয়ালি slug না লিখে থাকে, তবে অটো আপডেট হবে
      slug: prev.slug === generateSlug(prev.title) || prev.slug === "" 
        ? generateSlug(title) 
        : prev.slug,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await createBlog(formData);
      toast.success("Blog created successfully!");
      router.push("/dashboard/blogs");
      router.refresh();
    } catch (error) {
      toast.error("Failed to create blog. Check your permissions.");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/blogs" className={cn(buttonVariants({ variant: "outline", size: "icon" }), "rounded-full shrink-0")}>
          <ArrowLeft className="size-4" />
        </Link>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Write a New Blog</h2>
          <p className="text-muted-foreground">Share your thoughts with the world.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 rounded-xl border bg-card p-6 shadow-sm md:p-8">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="title">Blog Title</Label>
            <Input
              id="title"
              placeholder="How to secure Express APIs"
              value={formData.title}
              onChange={handleTitleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="slug">URL Slug</Label>
            <Input
              id="slug"
              placeholder="secure-express-apis"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="image">Cover Image URL</Label>
          <Input
            id="image"
            placeholder="/images/projects/my-image.webp or https://..."
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="excerpt">Short Excerpt (Summary)</Label>
          <Textarea
            id="excerpt"
            placeholder="A brief description of what the blog is about..."
            rows={2}
            value={formData.excerpt}
            onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="content">Content (Markdown Supported)</Label>
          <Textarea
            id="content"
            placeholder="# Introduction &#10;&#10;Write your markdown content here..."
            rows={12}
            className="font-mono text-sm leading-relaxed"
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            required
          />
        </div>

        <div className="flex justify-end gap-4 border-t pt-6">
          <Link href="/dashboard/blogs" className={cn(buttonVariants({ variant: "ghost" }))}>
            Cancel
          </Link>
          <Button type="submit" disabled={loading} className="gap-2 rounded-full px-8">
            {loading ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
            {loading ? "Publishing..." : "Publish Blog"}
          </Button>
        </div>
      </form>
    </div>
  );
}