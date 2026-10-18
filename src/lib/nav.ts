// src/lib/nav.ts
export interface NavItem {
  label: string;
  href: string;
}

export const NAV_ITEMS: readonly NavItem[] = [
  { label: "Home", href: "/" },
  { label: "My Work", href: "/my-work" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export interface SocialLink {
  label: string;
  href: string;
  icon: "github" | "linkedin" | "mail";
}

export const SOCIALS: readonly SocialLink[] = [
  { label: "GitHub", href: "https://github.com/ShafayatSadid", icon: "github" },
  { label: "LinkedIn", href: "https://linkedin.com/in/md-shafayat-hossain-sadid", icon: "linkedin" },
  { label: "Email", href: "mdshafayathossainsadid@gmail.com", icon: "mail" },
];