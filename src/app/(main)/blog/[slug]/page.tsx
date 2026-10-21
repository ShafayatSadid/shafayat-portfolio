// src/app/blog/[slug]/page.tsx
"use client";

import { use, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm"; // নতুন ইমপোর্ট
import { getBlogBySlug } from "@/lib/api";
import { BlogPost } from "@/types/blog";
import { ArrowLeft, Calendar } from "lucide-react";

export default function SingleBlogPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBlogBySlug(resolvedParams.slug)
      .then((data) => {
        setBlog(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [resolvedParams.slug]);

  if (loading) return <div className="mx-auto max-w-3xl px-4 py-24 text-center">Loading...</div>;

  if (!blog) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <h1 className="text-2xl font-bold mb-4">Blog post not found</h1>
        <Link href="/blog" className="text-primary hover:underline">Go back to blog</Link>
      </div>
    );
  }

  return (
    <main className="mx-auto min-h-[80vh] max-w-3xl px-4 py-24">
      <Link href="/blog" className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
        <ArrowLeft className="size-4" /> Back to Blog
      </Link>

      <h1 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
        {blog.title}
      </h1>
      
      <div className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
        <Calendar className="size-4" />
        {blog.createdAt ? new Date(blog.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) : ""}
      </div>

      <div className="relative mb-10 aspect-video w-full overflow-hidden rounded-3xl border bg-muted">
        <Image
          src={blog.image}
          alt={blog.title}
          width={1200}
          height={675}
          unoptimized
          priority
          className="h-full w-full object-cover"
        />
      </div>

      {/* Markdown Render with Typography */}
      <article className="prose prose-lg dark:prose-invert max-w-none 
        prose-headings:font-bold prose-headings:tracking-tight 
        prose-a:text-primary prose-a:no-underline hover:prose-a:underline 
        prose-img:rounded-xl prose-pre:bg-muted prose-pre:text-foreground
        prose-code:text-primary prose-code:bg-primary/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:before:content-none prose-code:after:content-none">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {blog.content || ""}
        </ReactMarkdown>
      </article>
    </main>
  );
}