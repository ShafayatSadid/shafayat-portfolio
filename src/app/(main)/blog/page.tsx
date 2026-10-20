// src/app/blog/page.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import * as motion from "motion/react-client";
import { getBlogs } from "@/lib/api";
import { BlogPost } from "@/types/blog";
import { Calendar } from "lucide-react";

export default function BlogPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBlogs().then((data) => {
      setBlogs(data);
      setLoading(false);
    });
  }, []);

  return (
    <main className="mx-auto min-h-[80vh] max-w-5xl px-4 py-24">
      <div className="mb-16 text-center">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
          My <span className="text-primary">Blog</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          Thoughts, tutorials, and insights on web development and programming.
        </p>
      </div>

      {loading ? (
        <div className="grid gap-8 md:grid-cols-2">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="h-80 animate-pulse rounded-3xl border bg-muted" />
          ))}
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2">
          {blogs.map((blog) => (
            <motion.div
              key={blog._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="group flex flex-col overflow-hidden rounded-3xl border bg-card shadow-sm transition-all hover:shadow-md"
            >
              <Link href={`/blog/${blog.slug}`} className="relative aspect-[16/9] w-full overflow-hidden border-b bg-muted">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  width={800}
                  height={450}
                  unoptimized
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </Link>
              <div className="flex flex-1 flex-col p-6">
                <div className="mb-3 flex items-center gap-2 text-xs text-muted-foreground">
                  <Calendar className="size-3" />
                  {blog.createdAt ? new Date(blog.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) : ""}
                </div>
                <Link href={`/blog/${blog.slug}`}>
                  <h2 className="mb-3 text-xl font-bold tracking-tight group-hover:text-primary transition-colors">
                    {blog.title}
                  </h2>
                </Link>
                <p className="flex-1 text-sm text-muted-foreground line-clamp-3">
                  {blog.excerpt}
                </p>
                <Link 
                  href={`/blog/${blog.slug}`}
                  className="mt-4 inline-block text-sm font-semibold text-primary hover:underline"
                >
                  Read More &rarr;
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </main>
  );
}