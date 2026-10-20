// src/types/blog.ts
export interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content?: string; // লিস্টে কন্টেন্ট আসবে না, শুধু সিঙ্গেল পেজে আসবে
  image: string;
  createdAt?: string;
}