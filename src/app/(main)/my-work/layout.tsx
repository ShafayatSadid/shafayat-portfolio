import { Metadata } from "next";
export const metadata: Metadata = {
  title: "My Work — Shafayat Sadid",
  description: "Explore my portfolio of production-ready web applications, e-commerce platforms, and CMS solutions.",
};
export default function WorkLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}