// src/lib/api.ts
import { Testimonial } from "@/types/testimonial";
import { Project } from "@/types/project";

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

export async function submitContactForm(data: { name: string; email: string; message: string }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to send message");
  return res.json();
}