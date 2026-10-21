// src/lib/api.ts
import { Testimonial } from "@/types/testimonial";
import { Project } from "@/types/project";
import { BlogPost } from "@/types/blog";
import { authClient } from "./auth-client";

export async function getTestimonials(): Promise<Testimonial[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/testimonials`);
  if (!res.ok) throw new Error("Failed to fetch testimonials");
  return res.json();
}

export async function getProjects(): Promise<Project[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/projects`);
  if (!res.ok) throw new Error("Failed to fetch projects");
  return res.json();
}

export async function getBlogs(): Promise<BlogPost[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blogs`);
  if (!res.ok) throw new Error("Failed to fetch blogs");
  return res.json();
}

export async function getBlogBySlug(slug: string): Promise<BlogPost> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blogs/${slug}`);
  if (!res.ok) throw new Error("Failed to fetch blog");
  return res.json();
}

export async function fetchWithAuth(endpoint: string, options: RequestInit = {}) {
  const { data } = await authClient.token();
  
  if (!data?.token) {
    throw new Error("No auth token found. Please log in as admin.");
  }

  const headers = {
    ...options.headers,
    "Authorization": `Bearer ${data.token}`,
    "Content-Type": "application/json",
  };

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || "Request failed");
  }

  return res.json();
}

// ব্লগ CRUD অপারেশন
type BlogPayload = Omit<BlogPost, "_id" | "createdAt">;

export async function getBlogById(id: string): Promise<BlogPost> {
  return fetchWithAuth(`/api/blogs/edit/${id}`);
}

export async function createBlog(data: BlogPayload) {
  return fetchWithAuth("/api/blogs", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function updateBlog(id: string, data: Partial<BlogPayload>) {
  return fetchWithAuth(`/api/blogs/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export async function deleteBlog(id: string) {
  return fetchWithAuth(`/api/blogs/${id}`, {
    method: "DELETE",
  });
}

export async function submitContactForm(data: { name: string; email: string; message: string }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to send message");
  return res.json();
}