import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Blog — Shafayat Sadid",
  description: "Thoughts, tutorials, and insights on web development, programming, and tech.",
};
export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}