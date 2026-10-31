// src/components/layout/Navbar.tsx
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Menu, Mail, LogOut, LayoutDashboard } from "lucide-react";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { NAV_ITEMS, SOCIALS, SocialLink } from "@/lib/nav";
import { authClient } from "@/lib/auth-client";

const ICON_MAP: Record<SocialLink["icon"], React.ComponentType<{ className?: string }>> = {
  github: SiGithub,
  linkedin: BsLinkedin,
  mail: Mail,
};

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const { data: session, isPending } = authClient.useSession();
  
  // any ছাড়া টাইপ সেফ চেক
  const isAdmin = (session?.user as { role?: string })?.role === "admin";

  const isActive = (href: string) => pathname === href;
  const closeSheet = () => setOpen(false);

  const handleSignOut = async () => {
    await authClient.signOut();
    router.push("/");
    router.refresh();
  };

  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
      <nav className="relative mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
        
        {/* Left Side */}
        <div className="flex items-center">
          
          {/* Mobile CTA Button */}
          <div className="md:hidden">
            <Link
              href="/contact"
              className={cn(buttonVariants({ size: "sm" }), "rounded-full h-8 px-4 text-xs font-semibold")}
            >
              Let&apos;s Talk
            </Link>
          </div>

          {/* Desktop Socials */}
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

        {/* Middle Side (Desktop) */}
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

        {/* Right Side */}
        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-4">
            {isPending ? (
              <div className="h-9 w-9 animate-pulse rounded-full bg-muted" />
            ) : session?.user ? (
              <DropdownMenu>
                <DropdownMenuTrigger className="outline-none">
                  <Avatar className="size-9 cursor-pointer ring-2 ring-primary/20 transition-all hover:ring-primary/60">
                    <AvatarImage src={session.user.image || ""} alt={session.user.name || "User"} />
                    <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">
                      {session.user.name?.slice(0, 2).toUpperCase() || "AD"}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64 rounded-2xl p-2 shadow-xl border-border/50">
                  <DropdownMenuGroup>
                    <DropdownMenuLabel className="font-normal p-0 mb-2">
                      <div className="flex items-center gap-3 rounded-xl bg-muted/50 p-3">
                        <Avatar className="size-10 border border-border">
                          <AvatarImage src={session.user.image || ""} alt={session.user.name || "User"} />
                          <AvatarFallback className="bg-primary text-primary-foreground text-sm font-bold">
                            {session.user.name?.slice(0, 2).toUpperCase() || "AD"}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col space-y-1 truncate">
                          <p className="text-sm font-semibold leading-none truncate">{session.user.name}</p>
                          <p className="text-xs leading-none text-muted-foreground truncate">
                            {session.user.email}
                          </p>
                        </div>
                      </div>
                    </DropdownMenuLabel>
                    
                    <DropdownMenuSeparator className="mb-1" />

                    {isAdmin && (
                      <DropdownMenuItem 
                        onClick={() => router.push("/dashboard")} 
                        className="cursor-pointer rounded-lg py-2.5 focus:bg-primary/10 focus:text-primary transition-colors"
                      >
                        <LayoutDashboard className="mr-2 size-4" />
                        <span className="font-medium">Dashboard</span>
                      </DropdownMenuItem>
                    )}
                    
                    <DropdownMenuItem 
                      onClick={handleSignOut} 
                      className="cursor-pointer rounded-lg py-2.5 text-destructive focus:bg-destructive/10 focus:text-destructive transition-colors mt-1"
                    >
                      <LogOut className="mr-2 size-4" />
                      <span className="font-medium">Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/contact" className={cn(buttonVariants({ size: "sm" }), "rounded-full px-6")}>
                Hire Me
              </Link>
            )}
          </div>

          {/* Mobile Hamburger */}
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

                  {/* Mobile Auth */}
                  <div className="mt-4 flex flex-col gap-2 border-t pt-4">
                    {isPending ? (
                      <div className="h-10 w-full animate-pulse rounded-md bg-muted" />
                    ) : session?.user ? (
                      <>
                        <div className="flex items-center gap-3 rounded-xl bg-muted/50 p-3 mb-2">
                          <Avatar className="size-10 border border-border">
                            <AvatarImage src={session.user.image || ""} alt={session.user.name || "User"} />
                            <AvatarFallback className="bg-primary text-primary-foreground text-xs font-bold">
                              {session.user.name?.slice(0, 2).toUpperCase() || "AD"}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col truncate">
                            <span className="text-sm font-semibold">{session.user.name}</span>
                            <span className="text-xs text-muted-foreground truncate">{session.user.email}</span>
                          </div>
                        </div>

                        {isAdmin && (
                          <Link
                            href="/dashboard"
                            onClick={closeSheet}
                            className={cn(buttonVariants({ variant: "secondary", size: "sm" }), "w-full justify-start gap-2 rounded-lg")}
                          >
                            <LayoutDashboard className="size-4" />
                            Dashboard
                          </Link>
                        )}
                        
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => { closeSheet(); handleSignOut(); }}
                          className="w-full justify-start gap-2 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive hover:text-white"
                        >
                          <LogOut className="size-4" />
                          Log out
                        </Button>
                      </>
                    ) : (
                      <Link
                        href="/contact"
                        onClick={closeSheet}
                        className={cn(buttonVariants({ size: "sm" }), "w-full rounded-full")}
                      >
                        Hire Me
                      </Link>
                    )}
                  </div>

                  {/* Mobile Socials */}
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