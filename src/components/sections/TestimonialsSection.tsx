// src/components/sections/TestimonialsSection.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import * as motion from "motion/react-client";
import Autoplay from "embla-carousel-autoplay";
import { Star } from "lucide-react";
import { getTestimonials } from "@/lib/api";
import { Testimonial } from "@/types/testimonial";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { buttonVariants } from "@/components/ui/button";

export function TestimonialsSection() {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

    useEffect(() => {
        getTestimonials().then(setTestimonials).catch(console.error);
    }, []);

    if (testimonials.length === 0) return null;

    return (
        <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="overflow-hidden border-t bg-muted/20 py-20"
        >
            <div className="mb-12 text-center">
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                    What Clients <span className="text-primary">Say</span>
                </h2>
                <p className="mt-2 text-muted-foreground">A few words from people I&apos;ve worked with.</p>
            </div>

            <div className="mx-auto max-w-6xl px-4">
                <Carousel
                    plugins={[Autoplay({ delay: 4000, stopOnInteraction: false })]}
                    opts={{ align: "start", loop: true }}
                    className="w-full"
                >
                    <CarouselContent className="-ml-2 md:-ml-4">
                        {testimonials.map((t) => (
                            <CarouselItem key={t._id} className="pl-2 md:basis-1/2 md:pl-4 lg:basis-1/3">
                                <div className="flex h-full flex-col justify-between rounded-2xl border bg-card p-6 shadow-sm">
                                    <div>
                                        <div className="mb-3 flex gap-1">
                                            {Array.from({ length: 5 }).map((_, i) => (
                                                <Star key={i} className={`size-4 ${i < t.rating ? "fill-primary text-primary" : "fill-muted text-muted-foreground/30"}`} />
                                            ))}
                                        </div>
                                        <p className="text-sm italic leading-relaxed text-foreground/90 line-clamp-4">
                                            &quot;{t.feedback}&quot;
                                        </p>
                                    </div>
                                    <div className="mt-6 flex items-center gap-3 border-t pt-4">
                                        <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                                            {t.name.charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-semibold">{t.name}</h4>
                                            <p className="text-xs text-muted-foreground">{t.role}</p>
                                        </div>
                                    </div>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            </div>

            <div className="mt-12 text-center">
                <Link
                    href="/testimonials"
                    className={buttonVariants({
                        variant: "outline",
                        size: "lg",
                        className: "rounded-full bg-card shadow-sm hover:bg-accent hover:text-accent-foreground"
                    })}
                >
                    Read All Testimonials
                </Link>
            </div>
        </motion.section>
    );
}