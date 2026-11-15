// src/app/(main)/blog/[slug]/page.tsx
import { Suspense } from "react";
import { Metadata } from "next";
import { Loader2 } from "lucide-react";
import BlogPostClient from "./BlogPostClient";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  "use cache";
  const resolvedParams = await params;
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blogs/${resolvedParams.slug}`);
    if (!res.ok) throw new Error("Not found");
    const blog = await res.json();

    return {
      title: `${blog.title} — Shafayat Sadid`,
      description: blog.excerpt,
      openGraph: {
        title: blog.title,
        description: blog.excerpt,
        images: [{ url: blog.image }],
        type: "article",
      },
    };
  } catch (error) {
    return {
      title: "Blog Post Not Found",
    };
  }
}

// ১. ডেটা রিড করার জন্য আলাদা চাইল্ড কম্পোনেন্ট
async function BlogContent({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  return <BlogPostClient slug={resolvedParams.slug} />;
}

// ২. মেইন পেজ (Suspense দিয়ে র‍্যাপ করা)
export default function SingleBlogPage({ params }: { params: Promise<{ slug: string }> }) {
  return (
    <Suspense 
      fallback={
        <div className="flex h-[70vh] items-center justify-center">
          <Loader2 className="size-8 animate-spin text-primary" />
        </div>
      }
    >
      <BlogContent params={params} />
    </Suspense>
  );
}