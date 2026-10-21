// src/app/dashboard/blogs/[id]/edit/page.tsx
"use client";

import { Suspense, use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getBlogById, updateBlog } from "@/lib/api";
import { ImageUploader } from "@/components/dashboard/ImageUploader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Loader2, Save } from "lucide-react";
import { toast } from "sonner";

// ১. চাইল্ড কম্পোনেন্ট যেখানে params রিড করা হবে
function EditBlogContent({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    image: "",
    content: "",
  });

  useEffect(() => {
    (async () => {
      try {
        const data = await getBlogById(resolvedParams.id);
        setFormData({
          title: data.title,
          slug: data.slug,
          excerpt: data.excerpt,
          image: data.image,
          content: data.content || "",
        });
      } catch (error) {
        toast.error("Failed to load blog data");
        router.push("/dashboard/blogs");
      } finally {
        setLoading(false);
      }
    })();
  }, [resolvedParams.id, router]);

  const generateSlug = (title: string) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setFormData((prev) => ({
      ...prev,
      title,
      slug: prev.slug === generateSlug(prev.title) || prev.slug === "" ? generateSlug(title) : prev.slug,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      await updateBlog(resolvedParams.id, formData);
      toast.success("Blog updated successfully!");
      router.push("/dashboard/blogs");
      router.refresh();
    } catch (error) {
      toast.error("Failed to update blog.");
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
    <div className="mx-auto max-w-4xl pb-20">
      <div className="sticky top-0 z-10 mb-8 flex items-center justify-between border-b bg-background/80 py-4 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/blogs" className="text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="size-5" />
          </Link>
          <span className="text-sm font-medium text-muted-foreground">Editing</span>
        </div>
        <Button onClick={handleSubmit} disabled={saving} className="rounded-full px-6 gap-2">
          {saving ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
          {saving ? "Updating..." : "Update Blog"}
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <ImageUploader 
          value={formData.image} 
          onChange={(url) => setFormData({ ...formData, image: url })} 
        />

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Blog Title"
            value={formData.title}
            onChange={handleTitleChange}
            className="w-full bg-transparent text-4xl md:text-5xl font-bold outline-none placeholder:text-muted-foreground/30"
            required
          />
          <div className="flex items-center text-sm text-muted-foreground">
            <span className="shrink-0 bg-muted px-2 py-1 rounded-l-md border border-r-0">/blog/</span>
            <Input
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              placeholder="url-slug"
              className="rounded-l-none border-l-0 focus-visible:ring-0 bg-transparent h-9"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Textarea
            placeholder="Write a short summary (Excerpt) for the card..."
            value={formData.excerpt}
            onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
            className="resize-none border-none bg-muted/30 text-lg p-4 rounded-xl focus-visible:ring-1 focus-visible:ring-primary/50"
            rows={2}
            required
          />
        </div>

        <div className="space-y-2">
          <Tabs defaultValue="write" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="write">Write (Markdown)</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
            </TabsList>
            <TabsContent value="write">
              <Textarea
                placeholder="Write your markdown content here..."
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="min-h-[400px] w-full resize-y border-none bg-muted/30 font-mono text-base leading-relaxed focus-visible:ring-1 focus-visible:ring-primary/50 p-4 rounded-xl"
                required
              />
            </TabsContent>
            <TabsContent value="preview">
              <div className="min-h-[400px] rounded-xl border bg-card p-6 md:p-8">
                <article className="prose prose-lg dark:prose-invert max-w-none 
                  prose-headings:font-bold prose-headings:tracking-tight 
                  prose-a:text-primary prose-a:no-underline hover:prose-a:underline 
                  prose-img:rounded-xl prose-pre:bg-muted prose-pre:text-foreground
                  prose-code:text-primary prose-code:bg-primary/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:before:content-none prose-code:after:content-none">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {formData.content || "*No content to preview yet.*"}
                  </ReactMarkdown>
                </article>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </form>
    </div>
  );
}

// ২. মেইন পেজ যা Suspense দিয়ে র‍্যাপ করবে
export default function EditBlogPage({ params }: { params: Promise<{ id: string }> }) {
  return (
    <Suspense fallback={
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="size-8 animate-spin text-muted-foreground" />
      </div>
    }>
      <EditBlogContent params={params} />
    </Suspense>
  );
}