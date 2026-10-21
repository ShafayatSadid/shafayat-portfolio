// src/types/project.ts
export interface Project {
  _id: string;
  title: string;
  description: string;
  techStack: string[];
  liveUrl: string;
  githubUrl: string;
  image: string;
  challenges?: string;
  improvements?: string;
  createdAt?: string;
}