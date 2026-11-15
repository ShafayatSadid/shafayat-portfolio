// src/app/(main)/contact/page.tsx
import { ContactForm } from "@/components/forms/ContactForm";
import { Mail, MapPin, Phone, ArrowUpRight } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { Metadata } from "next";
import { cn } from "cn";

export const metadata: Metadata = {
  title: "Contact — Shafayat Sadid",
  description: "Get in touch with me for freelance projects, collaborations, or just to say hi.",
};

export default function ContactPage() {
  return (
    <main className="mx-auto min-h-[80vh] max-w-6xl px-4 py-24">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
        
        {/* বাঁ পাশ: কন্টাক্ট ইনফো */}
        <div className="flex flex-col gap-8">
          <div>
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl mb-4">
              Let&apos;s <span className="text-primary">Talk.</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-md">
              I&apos;m currently available for freelance work and open to new opportunities. 
              Whether you have a specific project in mind or just want to say hi, I&apos;d love to hear from you.
            </p>
          </div>

          {/* ========================================= */}
          {/* ১. মোবাইল ভিউ: শুধু ৪টি বর্গাকার আইকন */}
          {/* ========================================= */}
          <div className="grid grid-cols-4 gap-3 w-full max-w-md md:hidden">
            <a 
              href="mailto:mdshafayathossainsadid@gmail.com" 
              className="flex aspect-square items-center justify-center rounded-2xl border border-border bg-card shadow-sm active:bg-muted transition-colors"
            >
              <Mail className="size-6 text-foreground" />
            </a>
            <a 
              href="tel:+201558659455" 
              className="flex aspect-square items-center justify-center rounded-2xl border border-border bg-card shadow-sm active:bg-muted transition-colors"
            >
              <Phone className="size-6 text-foreground" />
            </a>
            <div className="flex aspect-square items-center justify-center rounded-2xl border border-border bg-card shadow-sm">
              <MapPin className="size-6 text-foreground" />
            </div>
            <a 
              href="https://wa.me/201558659455" 
              target="_blank" 
              rel="noreferrer" 
              className="flex aspect-square items-center justify-center rounded-2xl border border-[#25D366]/30 bg-[#25D366]/10 shadow-sm active:bg-[#25D366]/20 transition-colors"
            >
              <FaWhatsapp className="size-7 text-[#25D366]" />
            </a>
          </div>

          {/* ========================================= */}
          {/* ২. ডেস্কটপ ভিউ: টেক্সটসহ কার্ড */}
          {/* ========================================= */}
          <div className="hidden md:flex flex-col gap-4 max-w-md">
            {/* Email */}
            <a href="mailto:mdshafayathossainsadid@gmail.com" className="group flex items-center justify-between rounded-2xl border border-border bg-card p-4 shadow-sm transition-all hover:border-primary/50">
              <div className="flex items-center gap-4">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-muted text-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Mail className="size-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Email Me</p>
                  <p className="font-semibold text-foreground text-sm md:text-base">mdshafayathossainsadid@gmail.com</p>
                </div>
              </div>
            </a>

            {/* Phone */}
            <a href="tel:+201558659455" className="group flex items-center justify-between rounded-2xl border border-border bg-card p-4 shadow-sm transition-all hover:border-primary/50">
              <div className="flex items-center gap-4">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-muted text-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Phone className="size-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Call Me</p>
                  <p className="font-semibold text-foreground">+20 155 963 9455</p>
                </div>
              </div>
            </a>

            {/* Location */}
            <div className="flex items-center justify-between rounded-2xl border border-border bg-card p-4 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-muted text-foreground">
                  <MapPin className="size-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Location</p>
                  <p className="font-semibold text-foreground">Cairo, Egypt</p>
                </div>
              </div>
            </div>

            {/* WhatsApp */}
            <a href="https://wa.me/201558659455" target="_blank" rel="noreferrer" className="group flex items-center justify-between rounded-2xl border border-[#25D366]/20 bg-[#25D366]/5 p-4 shadow-sm transition-all hover:bg-[#25D366]/10">
              <div className="flex items-center gap-4">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#25D366]/20 text-[#25D366]">
                  <FaWhatsapp className="size-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-[#25D366]/80">Quick Chat</p>
                  <p className="font-semibold text-[#25D366]">Message on WhatsApp</p>
                </div>
              </div>
              <ArrowUpRight className="size-5 text-[#25D366] transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
            </a>
          </div>
        </div>

        {/* ডান পাশ: কন্টাক্ট ফর্ম */}
        <div className="flex flex-col justify-center rounded-3xl border border-border bg-card p-6 shadow-sm md:p-10">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-foreground">Send a Message</h2>
            <p className="text-sm text-muted-foreground mt-2">
              Fill out the form below and I will get back to you within 24 hours.
            </p>
          </div>
          <ContactForm />
        </div>

      </div>
    </main>
  );
}