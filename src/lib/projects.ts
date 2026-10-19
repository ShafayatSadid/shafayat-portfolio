// src/lib/projects.ts
export interface Project {
  title: string;
  description: string;
  techStack: string[];
  liveUrl: string;
  githubUrl: string;
  image: string;
}

export const PROJECTS: readonly Project[] = [
  {
    title: "Monohor",
    description: "A Bengali heritage e-commerce platform featuring server-side price validation, Steadfast courier integration, and email notifications.",
    techStack: ["Next.js", "TypeScript", "MongoDB", "Better Auth"],
    liveUrl: "https://monohor.example.com", // তোমার লাইভ লিঙ্ক বসাও
    githubUrl: "https://github.com/ShafayatSadid/monohor", // গিটহাব লিঙ্ক বসাও
    image: "/images/projects/monohor.webp",
  },
  {
    title: "Legit Assist",
    description: "A legal tech platform connecting clients with lawyers, featuring role-based dashboards, secure authentication, and payment integration.",
    techStack: ["React", "Node.js", "Express", "Stripe", "JWT"],
    liveUrl: "https://legit-assist.example.com",
    githubUrl: "https://github.com/ShafayatSadid/legit-assist",
    image: "/images/projects/legit-assist.webp",
  },
  {
    title: "Al-Quran Education",
    description: "An interactive Quran learning platform designed to facilitate structured recitation and Tajweed learning.",
    techStack: ["Next.js", "Tailwind CSS", "MongoDB", "Web3Forms"],
    liveUrl: "https://alquran-education.example.com",
    githubUrl: "https://github.com/ShafayatSadid/alquran-education",
    image: "/images/projects/alquraneducation.webp",
  },
  {
    title: "Markazul Lisan",
    description: "A comprehensive CMS for an Islamic institute, featuring 11 public pages and 7 admin management sections.",
    techStack: ["Next.js", "Better Auth", "MongoDB", "Cloudinary"],
    liveUrl: "https://markazul-lisan.example.com",
    githubUrl: "https://github.com/ShafayatSadid/markazul-lisan",
    image: "/images/projects/markazul-lisan.webp",
  },
];