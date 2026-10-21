import { Metadata } from "next";
export const metadata: Metadata = {
    title: "About Me — Shafayat Sadid",
    description: "Learn more about my journey as a Full-Stack Developer, my skills, and experience.",
};
export default function AboutLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}