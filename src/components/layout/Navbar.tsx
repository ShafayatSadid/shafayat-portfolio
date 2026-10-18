// src/components/layout/Navbar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, Mail, LucideIcon } from "lucide-react";
import { cn } from "cn";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { NAV_ITEMS, SOCIALS, SocialLink } from "@/lib/nav";

// --- Inline SVG Icons (lucide-react v1 brand icon বাদ দেওয়ায়) ---
function GithubIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

// --- Icon Mapping ---
const ICON_MAP: Record<SocialLink["icon"], (props: { className?: string }) => JSX.Element> = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  mail: Mail,
};

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) => pathname === href;
  const closeSheet = () => setOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
      <nav className="relative mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
        
        {/* Left Side: Mobile Logo & Desktop Socials */}
        <div className="flex items-center">
          <Link href="/" className="text-lg font-semibold tracking-tight md:hidden">
            <span className="text-foreground">Shafayat</span>{" "}
            <span className="text-primary">Sadid</span>
          </Link>

          <div className="hidden items-center gap-2 md:flex">
            {SOCIALS.map((social) => {
              const Icon = ICON_MAP[social.icon];
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "icon-sm" }),
                    "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Icon className="size-4" />
                </a>
              );
            })}
          </div>
        </div>

        {/* Middle Side: Desktop Nav Links */}
        <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-6 md:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm transition-colors hover:text-foreground",
                isActive(item.href)
                  ? "text-foreground font-medium"
                  : "text-muted-foreground"
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Right Side: Desktop CTA & Mobile Hamburger */}
        <div className="flex items-center gap-2">
          <Link
            href="/contact"
            className={cn(buttonVariants({ size: "sm" }), "hidden md:inline-flex")}
          >
            Hire Me
          </Link>

          <div className="md:hidden">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger
                render={<Button variant="ghost" size="icon-sm" aria-label="Open menu" />}
              >
                <Menu />
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle>
                    <span className="text-foreground">Shafayat</span>{" "}
                    <span className="text-primary">Sadid</span>
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-1 px-4 mt-2">
                  {NAV_ITEMS.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={closeSheet}
                      className={cn(
                        "rounded-md px-2 py-2 text-sm transition-colors hover:bg-accent",
                        isActive(item.href)
                          ? "text-foreground font-medium"
                          : "text-muted-foreground"
                      )}
                    >
                      {item.label}
                    </Link>
                  ))}
                  <Link
                    href="/contact"
                    onClick={closeSheet}
                    className={cn(buttonVariants({ size: "sm" }), "mt-4 w-full")}
                  >
                    Hire Me
                  </Link>

                  <div className="mt-6 flex items-center gap-2 border-t pt-4">
                     {SOCIALS.map((social) => {
                        const Icon = ICON_MAP[social.icon];
                        return (
                          <a
                            key={social.label}
                            href={social.href}
                            target="_blank"
                            rel="noreferrer"
                            aria-label={social.label}
                            className={cn(
                              buttonVariants({ variant: "outline", size: "icon-sm" }),
                              "text-muted-foreground hover:text-foreground"
                            )}
                          >
                            <Icon className="size-4" />
                          </a>
                        );
                      })}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

      </nav>
    </header>
  );
}