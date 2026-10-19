// src/lib/about.ts
export interface SkillGroup {
  title: string;
  skills: string[];
}

export interface Experience {
  role: string;
  description: string;
  period: string;
}

export const SKILL_GROUPS: readonly SkillGroup[] = [
  {
    title: "Frontend",
    skills: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS 4","Shadcn", "HeroUI", "Motion", "Embla Carousel"],
  },
  {
    title: "Backend",
    skills: ["Node.js", "Express v5", "MongoDB Atlas", "Better Auth", "JWT", "Stripe"],
  },
  {
    title: "Tools & Platforms",
    skills: ["Git", "GitHub", "Vercel", "Cloudinary", "Web3Forms", "Resend", "Postman", "VS Code", "Linux"],
  },
  {
    title: "Currently Learning",
    skills: ["Go", "DSA", "C++"],
  },
];

export const EXPERIENCES: readonly Experience[] = [
  {
    role: "Solo Full-Stack Developer",
    description: "Delivered 4+ real client projects including e-commerce, education, and CMS platforms.",
    period: "2023 - Present",
  },
];