// src/app/page.tsx
import { Hero } from "@/components/sections/Hero";

export default function Home() {
  return (
    <>
      <Hero />

      {/* Placeholder — পরে আসল Projects section দিয়ে replace হবে */}
      <section
        id="projects"
        className="mx-auto max-w-5xl scroll-mt-20 px-4 py-24"
      >
        <h2 className="text-2xl font-semibold tracking-tight">Projects</h2>
        <p className="mt-2 text-sm text-muted-foreground">Coming soon...</p>
      </section>
    </>
  );
}