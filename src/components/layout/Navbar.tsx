// src/components/layout/Navbar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, Mail } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { BsLinkedin } from "react-icons/bs";
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

const ICON_MAP: Record<SocialLink["icon"], React.ComponentType<{ className?: string }>> = {
  github: SiGithub,
  linkedin: BsLinkedin,
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