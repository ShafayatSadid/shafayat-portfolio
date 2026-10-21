import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Testimonials — Shafayat Sadid",
  description: "Read what clients and collaborators have to say about working with me.",
};
export default function TestimonialsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}