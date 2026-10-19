// src/types/testimonial.ts
export interface Testimonial {
  _id: string;
  name: string;
  role: string;
  feedback: string;
  rating: number;
  createdAt?: string;
}