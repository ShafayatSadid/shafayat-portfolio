// src/app/page.tsx
import { Suspense } from "react";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { About } from "@/components/sections/About";
import { TestimonialsMarquee } from "@/components/sections/TestimonialsMarquee";
import { Testimonial } from "@/types/testimonial";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

// ডেটা ফেচিং কম্পোনেন্ট
async function HomeTestimonials() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/testimonials`);
  if (!res.ok) return null;
  
  const testimonials: Testimonial[] = await res.json();
  if (testimonials.length === 0) return null;

  return <TestimonialsMarquee testimonials={testimonials} />;
}

export default function Home() {
  return (
    <>
      <Hero />
      <Projects />
      <About />

      {/* Testimonials Marquee Section */}
      <section className="border-t bg-muted/20 py-20">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            What Clients <span className="text-primary">Say</span>
          </h2>
          <p className="mt-2 text-muted-foreground">
            A few words from people I&apos;ve worked with.
          </p>
        </div>

        <Suspense fallback={<div className="h-40 animate-pulse bg-muted/50" />}>
          <HomeTestimonials />
        </Suspense>

        <div className="mt-10 text-center">
          <Link href="/testimonials" className={buttonVariants({ variant: "outline" })}>
            Read All Testimonials
          </Link>
        </div>
      </section>
    </>
  );
}