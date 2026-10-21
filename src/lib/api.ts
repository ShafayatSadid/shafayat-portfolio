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


// ... (আগের কোডগুলো অপরিবর্তিত থাকবে)
// src/lib/api.ts (শেষে যোগ করো)

// প্রজেক্ট CRUD অপারেশন
type ProjectPayload = Omit<Project, "_id" | "createdAt">;

export async function getProjectById(id: string): Promise<Project> {
  return fetchWithAuth(`/api/projects/edit/${id}`);
}

export async function createProject(data: ProjectPayload) {
  return fetchWithAuth("/api/projects", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function updateProject(id: string, data: Partial<ProjectPayload>) {
  return fetchWithAuth(`/api/projects/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export async function deleteProject(id: string) {
  return fetchWithAuth(`/api/projects/${id}`, {
    method: "DELETE",
  });
}


// ... (আগের কোডগুলো অপরিবর্তিত থাকবে)
// src/lib/api.ts (শেষে যোগ করো)

// টেস্টিমোনিয়াল CRUD অপারেশন
type TestimonialPayload = Omit<Testimonial, "_id" | "createdAt">;

export async function getTestimonialById(id: string): Promise<Testimonial> {
  return fetchWithAuth(`/api/testimonials/edit/${id}`);
}

export async function createTestimonial(data: TestimonialPayload) {
  return fetchWithAuth("/api/testimonials", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function updateTestimonial(id: string, data: Partial<TestimonialPayload>) {
  return fetchWithAuth(`/api/testimonials/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export async function deleteTestimonial(id: string) {
  return fetchWithAuth(`/api/testimonials/${id}`, {
    method: "DELETE",
  });
}

// ... (আগের কোডগুলো অপরিবর্তিত থাকবে)
// src/lib/api.ts (শেষে যোগ করো)

// মেসেজ (Contact) অপারেশন
import { Contact } from "@/types/contact";

export async function getMessages(): Promise<Contact[]> {
  return fetchWithAuth("/api/contact");
}

export async function deleteMessage(id: string) {
  return fetchWithAuth(`/api/contact/${id}`, {
    method: "DELETE",
  });
}

// src/lib/api.ts (শেষে যোগ করো)

// ড্যাশবোর্ড স্ট্যাটস
export interface DashboardStats {
  projects: number;
  blogs: number;
  testimonials: number;
  messages: number;
}

export async function getDashboardStats(): Promise<DashboardStats> {
  return fetchWithAuth("/api/dashboard/stats");
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