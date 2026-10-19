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
        description: "A production-ready, full-stack e-commerce platform built for a real Bengali heritage brand. Features guest checkout, secure server-side price validation, Steadfast courier integration, and automated email notifications.",
        techStack: ["Next.js 16", "React 19", "HeroUI", "Tailwind CSS 4", "Zustand", "Express.js", "MongoDB", "Better Auth", "Cloudinary", "Resend"],
        liveUrl: "https://monohor.com.bd",
        githubUrl: "https://github.com/ShafayatSadid/monohor-client",
        image: "/images/projects/monohor.webp",
    },
    {
        title: "Legit Assist",
        description: "A modern online lawyer hiring platform connecting clients with legal experts. Features role-based dashboards (Client/Lawyer/Admin), Stripe payment integration, and secure authentication with Google OAuth.",
        techStack: ["Next.js 16", "React 19", "HeroUI", "Tailwind CSS 4", "Better Auth", "Motion", "Stripe", "Cloudinary", "MongoDB"],
        liveUrl: "https://legit-assist.vercel.app",
        githubUrl: "https://github.com/ShafayatSadid/legit-assist",
        image: "/images/projects/legit-assist.webp",
    },
    {
        title: "Markazul Lisan",
        description: "An online Islamic education platform for expatriate Bangladeshis, featuring course listings, teacher profiles, blog, books, admission forms, and a secure admin dashboard with full CRUD operations.",
        techStack: ["Next.js 16", "React 19", "Tailwind CSS 4", "HeroUI", "Better Auth", "Express v5", "MongoDB Atlas", "Cloudinary"],
        liveUrl: "https://markazul-lisan.vercel.app",
        githubUrl: "https://github.com/ShafayatSadid/markazul-lisan",
        image: "/images/projects/markazul-lisan.webp",
    },
    {
        title: "Al-Quran Education",
        description: "An Islamic education platform for learning Quran with Tajweed, Tafseer, and Arabic. Features courses, teacher profiles, student reviews, and a secure admin dashboard.",
        techStack: ["Next.js 16", "React 19", "HeroUI", "Tailwind CSS 4", "Better Auth", "Express.js", "MongoDB", "Web3Forms"],
        liveUrl: "https://al-quran-education.vercel.app",
        githubUrl: "https://github.com/ShafayatSadid/al-quran-education",
        image: "/images/projects/alquraneducation.webp",
    },
];