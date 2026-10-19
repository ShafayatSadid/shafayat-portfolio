// src/app/testimonials/page.tsx
import { Suspense } from "react";
import { TestimonialsList } from "@/components/sections/TestimonialsList";
import { Testimonial } from "@/types/testimonial";


async function TestimonialsContent() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/testimonials`);

  if (!res.ok) {
    throw new Error("Failed to fetch testimonials");
  }

  const testimonials: Testimonial[] = await res.json();

  if (testimonials.length === 0) {
    return (
      <p className="text-center text-muted-foreground">
        No testimonials yet.
      </p>
    );
  }

  return <TestimonialsList testimonials={testimonials} />;
}


export default function TestimonialsPage() {
  return (
    <main className="mx-auto min-h-[80vh] max-w-5xl px-4 py-24">
     
      <div className="mb-16 text-center">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
          Client <span className="text-primary">Testimonials</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          What clients and collaborators have to say about working with me.
        </p>
      </div>

      
      <Suspense
        fallback={
          <div className="grid gap-6 md:grid-cols-2">
            {/* Skeleton Loader */}
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-64 animate-pulse rounded-2xl border bg-muted"
              />
            ))}
          </div>
        }
      >
        <TestimonialsContent />
      </Suspense>
    </main>
  );
}