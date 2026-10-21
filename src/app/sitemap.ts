// src/app/sitemap.ts
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL as string;

  const staticRoutes = [
    "",
    "/my-work",
    "/testimonials",
    "/about",
    "/blog",
    "/contact",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  try {
    // Vercel বিল্ডের সময় API না পাওয়া গেলে যাতে ক্র্যাশ না করে
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blogs`, {
      next: { revalidate: 3600 }, // no-store বাদ দেওয়া হলো
      signal: AbortSignal.timeout(5000), // ৫ সেকেন্ড পর টাইমআউট হবে
    });
    
    if (!res.ok) return staticRoutes;
    
    const blogs = await res.json();
    
    const blogRoutes = blogs.map((blog: { slug: string; createdAt: string }) => ({
      url: `${baseUrl}/blog/${blog.slug}`,
      lastModified: blog.createdAt ? new Date(blog.createdAt).toISOString() : new Date().toISOString(),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }));

    return [...staticRoutes, ...blogRoutes];
  } catch (error) {
    console.log("Sitemap: API not reachable, using static routes only.");
    return staticRoutes; // এরর হলে শুধু স্ট্যাটিক পেজগুলো দেখাবে
  }
}