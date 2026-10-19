// src/components/sections/TestimonialsMarquee.tsx
"use client";

import { Star } from "lucide-react";
import { Testimonial } from "@/types/testimonial";

export function TestimonialsMarquee({ testimonials }: { testimonials: Testimonial[] }) {
  // সিমলেস লুপের জন্য ডেটা ডুপ্লিকেট করা হলো
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <div className="relative flex overflow-hidden">
      <div className="animate-marquee flex gap-4 py-4 w-max">
        {duplicatedTestimonials.map((testimonial, index) => (
          <div
            key={`${testimonial._id}-${index}`}
            className="flex w-[350px] shrink-0 flex-col justify-between rounded-2xl border bg-card p-6 shadow-sm"
          >
            <div>
              <div className="mb-3 flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`size-4 ${
                      i < testimonial.rating
                        ? "fill-primary text-primary"
                        : "fill-muted text-muted-foreground/30"
                    }`}
                  />
                ))}
              </div>
              <p className="text-sm italic leading-relaxed text-foreground/90 line-clamp-3">
                &quot;{testimonial.feedback}&quot;
              </p>
            </div>
            
            <div className="mt-4 flex items-center gap-3 border-t pt-4">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                {testimonial.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h4 className="text-sm font-semibold">{testimonial.name}</h4>
                <p className="text-xs text-muted-foreground">{testimonial.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}