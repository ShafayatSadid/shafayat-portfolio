// src/lib/api.ts
import { Testimonial } from "@/types/testimonial";

export async function getTestimonials(): Promise<Testimonial[]> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/testimonials`);
    if (!res.ok) throw new Error("Failed to fetch testimonials");
    return res.json();
}