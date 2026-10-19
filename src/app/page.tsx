// src/app/page.tsx
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { About } from "@/components/sections/About";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";

export default function Home() {
  return (
    <>
      <Hero />
      <Projects />
      <About />
      <TestimonialsSection />
    </>
  );
}