// src/app/(main)/blog/[slug]/page.tsx
import { Metadata } from "next";
import BlogPostClient from "./BlogPostClient";

// ডাইনামিক মেটাডেটা জেনারেট (এখন ক্যাশড)
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  "use cache"; // <-- এই লাইনটি যোগ করা হয়েছে

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

export default async function SingleBlogPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  
  return <BlogPostClient slug={resolvedParams.slug} />;
}