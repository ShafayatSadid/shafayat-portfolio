// src/app/sitemap.ts
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://shafayatsadid.com";

  // ১. স্ট্যাটিক পেজগুলো
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

  // ২. ডাইনামিক ব্লগ পেজগুলো (ব্যাকএন্ড থেকে ডেটা আনা)
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blogs`, {
      cache: "no-store",
    });
    
    if (!res.ok) throw new Error("Failed to fetch blogs");
    
    const blogs = await res.json();
    
    const blogRoutes = blogs.map((blog: { slug: string; createdAt: string }) => ({
      url: `${baseUrl}/blog/${blog.slug}`,
      lastModified: blog.createdAt ? new Date(blog.createdAt).toISOString() : new Date().toISOString(),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }));

    return [...staticRoutes, ...blogRoutes];
  } catch (error) {
    console.error("Sitemap fetch error:", error);
    // ব্যাকএন্ড ডাউন থাকলে যেন স্ট্যাটিক রুটগুলো অন্তত কাজ করে
    return staticRoutes; 
  }
}