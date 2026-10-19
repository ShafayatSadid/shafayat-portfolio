// src/components/sections/TestimonialsList.tsx
"use client";

import * as motion from "motion/react-client";
import type { Variants } from "motion/react";
import { Star } from "lucide-react";
import { Testimonial } from "@/types/testimonial";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function TestimonialsList({ testimonials }: { testimonials: Testimonial[] }) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid gap-6 md:grid-cols-2"
    >
      {testimonials.map((testimonial) => (
        <motion.div
          key={testimonial._id}
          variants={itemVariants}
          className="flex flex-col justify-between rounded-2xl border bg-card p-6 shadow-sm md:p-8 transition-colors hover:border-primary/50"
        >
          <div>
            {/* Rating */}
            <div className="mb-4 flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`size-5 ${
                    i < testimonial.rating
                      ? "fill-primary text-primary"
                      : "fill-muted text-muted-foreground/30"
                  }`}
                />
              ))}
            </div>

            {/* Feedback */}
            <p className="mb-6 text-foreground/90 italic leading-relaxed">
              &quot;{testimonial.feedback}&quot;
            </p>
          </div>

          {/* Client Info */}
          <div className="flex items-center gap-4 border-t pt-4">
            {/* Initial Avatar */}
            <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-lg font-bold text-primary">
              {testimonial.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h3 className="font-semibold text-foreground">{testimonial.name}</h3>
              <p className="text-sm text-muted-foreground">{testimonial.role}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}