// src/components/sections/Hero.tsx
import { Download } from "lucide-react"; // ArrowDown এর জায়গায় Download
import { cn } from "cn";
import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import {
    SiNextdotjs,
    SiTypescript,
    SiJavascript,
    SiNodedotjs,
    SiMongodb,
    SiGo,
    SiCplusplus,
    SiExpress,
    SiReact,
} from "react-icons/si";

export function Hero() {
    return (
        <section className="relative overflow-hidden">
            {/* Background shapes & Floating Icons */}
            <div className="pointer-events-none absolute inset-0 -z-10">
                <div className="absolute -left-32 top-10 h-64 w-96 -rotate-12 rounded-3xl bg-primary/5 blur-3xl" />
                <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />
                <div className="absolute -bottom-20 left-1/3 h-64 w-96 rotate-12 rounded-3xl bg-primary/5 blur-3xl" />

                <div className="absolute inset-0 mx-auto hidden max-w-5xl opacity-40 md:block">
                    <SiReact className="absolute left-[40%] top-[5%] size-12 text-[#61DAFB]" style={{ animation: "float 6s ease-in-out infinite", animationDelay: "0s" }} />
                    <SiNextdotjs className="absolute left-[10%] top-[20%] size-12 text-foreground" style={{ animation: "float 6s ease-in-out infinite", animationDelay: "1s" }} />
                    <SiNodedotjs className="absolute right-[15%] top-[25%] size-16 text-[#339933]" style={{ animation: "float 7s ease-in-out infinite", animationDelay: "2s" }} />
                    <SiMongodb className="absolute left-[15%] bottom-[30%] size-14 text-[#47A248]" style={{ animation: "float 8s ease-in-out infinite", animationDelay: "3s" }} />
                    <SiTypescript className="absolute right-[10%] bottom-[25%] size-12 text-[#3178C6]" style={{ animation: "float 5s ease-in-out infinite", animationDelay: "0.5s" }} />
                    <SiGo className="absolute left-[25%] top-[10%] size-10 text-[#00ADD8]" style={{ animation: "float 6s ease-in-out infinite", animationDelay: "1.5s" }} />
                    <SiJavascript className="absolute right-[25%] top-[10%] size-10 text-[#D4B000]" style={{ animation: "float 7s ease-in-out infinite", animationDelay: "2.5s" }} />
                    <SiExpress className="absolute left-[5%] top-[60%] size-10 text-foreground" style={{ animation: "float 5s ease-in-out infinite", animationDelay: "3s" }} />
                    <SiCplusplus className="absolute right-[5%] bottom-[15%] size-12 text-[#00599C]" style={{ animation: "float 8s ease-in-out infinite", animationDelay: "1.2s" }} />
                </div>
            </div>

            <div className="mx-auto flex max-w-7xl flex-col items-center px-4 py-24 text-center md:py-32">
                {/* Avatar */}
                <div className="relative z-10 mb-6 h-24 w-24 overflow-hidden rounded-full ring-4 ring-primary/20">
                    <Image
                        src="/images/shafayat.jpg"
                        alt="Shafayat Sadid"
                        width={96}
                        height={96}
                        priority
                        unoptimized
                        className="h-full w-full object-cover"
                    />
                </div>

                {/* Greeting */}
                <p className="relative z-10 mb-4 text-sm text-muted-foreground">
                    👋 Hi, I&apos;m Shafayat Sadid
                </p>

                {/* Heading */}
                <h1 className="relative z-10 mb-6 text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
                    Full-Stack<span className="text-primary"> Developer</span> Building
                    <br />
                    Production-Ready<span className="text-primary"> Web Apps</span>
                </h1>

                {/* Bio */}
                <p className="relative z-10 mb-8 max-w-xl text-base text-muted-foreground">
                    I&apos;m a full-stack developer with experience delivering 4+ real
                    client projects — e-commerce, education, and CMS platforms. I
                    specialize in building modern web applications using Next.js, Node.js,
                    and MongoDB.
                </p>

                {/* CTA - Download Resume */}
                <a
                    href="/resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(buttonVariants({ size: "lg" }), "relative z-10 gap-2 rounded-full")}
                >
                    Download Resume
                    <Download className="size-4" />
                </a>
            </div>
        </section>
    );
}