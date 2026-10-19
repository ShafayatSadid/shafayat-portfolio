// src/components/layout/Footer.tsx
import Link from "next/link";
import { Heart, Mail } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { BsLinkedin } from "react-icons/bs";
import { NAV_ITEMS, SOCIALS, SocialLink } from "@/lib/nav";
import { cacheLife } from "next/cache";

async function getCopyrightYear() {
    "use cache";
    cacheLife("max");
    return new Date().getFullYear();
}

const ICON_MAP: Record<SocialLink["icon"], React.ComponentType<{ className?: string }>> = {
    github: SiGithub,
    linkedin: BsLinkedin,
    mail: Mail,
};

export async function Footer() {
    const year = await getCopyrightYear();
    return (
        <footer className="border-t bg-muted/20">
            <div className="mx-auto max-w-5xl px-4 py-12 md:py-16">
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    <div className="flex flex-col gap-4">
                        <Link href="/" className="text-xl font-semibold tracking-tight">
                            <span className="text-foreground">Shafayat</span>{" "}
                            <span className="text-primary">Sadid</span>
                        </Link>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Full-Stack Developer building production-ready web applications.
                        </p>
                    </div>

                    <div className="flex flex-col gap-4">
                        <h4 className="font-semibold text-foreground">Navigation</h4>
                        <div className="grid grid-cols-2 gap-2">
                            {NAV_ITEMS.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <h4 className="font-semibold text-foreground">Connect</h4>
                        <div className="flex items-center gap-3">
                            {SOCIALS.map((social) => {
                                const Icon = ICON_MAP[social.icon];
                                return (
                                    <a
                                        key={social.label}
                                        href={social.href}
                                        target="_blank"
                                        rel="noreferrer"
                                        aria-label={social.label}
                                        className="flex size-10 items-center justify-center rounded-full border bg-card text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                                    >
                                        <Icon className="size-4" />
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                </div>

                <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 text-center text-sm text-muted-foreground md:flex-row">
                    <p>© {year} Shafayat Sadid. All rights reserved.</p>
                    <p className="flex items-center gap-1.5">
                        Thank you for your time.
                        <Heart className="size-4 fill-red-500 text-red-500" />
                    </p>
                </div>
            </div>
        </footer>
    );
}