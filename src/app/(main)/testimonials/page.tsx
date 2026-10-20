// src/app/testimonials/page.tsx
"use client";

import { useEffect, useState } from "react";
import { getTestimonials } from "@/lib/api";
import { Testimonial } from "@/types/testimonial";
import { Star } from "lucide-react";

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTestimonials()
      .then((data) => {
        setTestimonials(data);
        setLoading(false);
      })
      .catch(console.error);
  }, []);

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

      {loading ? (
        <div className="grid gap-6 md:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-64 animate-pulse rounded-2xl border bg-muted" />
          ))}
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {testimonials.map((t) => (
            <div key={t._id} className="flex flex-col justify-between rounded-2xl border bg-card p-6 shadow-sm md:p-8">
              <div>
                <div className="mb-4 flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`size-5 ${i < t.rating ? "fill-primary text-primary" : "fill-muted text-muted-foreground/30"}`} />
                  ))}
                </div>
                <p className="mb-6 italic leading-relaxed text-foreground/90">&quot;{t.feedback}&quot;</p>
              </div>
              <div className="flex items-center gap-4 border-t pt-4">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-lg font-bold text-primary">
                  {t.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{t.name}</h3>
                  <p className="text-sm text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}