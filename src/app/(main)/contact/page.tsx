// src/app/contact/page.tsx
import { ContactForm } from "@/components/forms/ContactForm";
import { Mail, MapPin, Phone, ArrowUpRight } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — Shafayat Sadid",
  description: "Get in touch with me for freelance projects, collaborations, or just to say hi.",
};

export default function ContactPage() {
  return (
    <main className="mx-auto min-h-[80vh] max-w-6xl px-4 py-24">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
        
        {/* বাঁ পাশ: কন্টাক্ট ইনফো (৫ কলাম) */}
        <div className="flex flex-col gap-6 lg:col-span-5">
          <div className="mb-4">
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl mb-4">
              Let&apos;s <span className="text-primary">Talk.</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              I&apos;m currently available for freelance work and open to new opportunities. 
              Whether you have a specific project in mind or just want to say hi, I&apos;d love to hear from you.
            </p>
          </div>

          {/* Email Card */}
          <a 
            href="mailto:mdshafayathossainsadid@gmail.com" 
            className="group flex items-center justify-between rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:border-primary/50"
          >
            <div className="flex items-center gap-4">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-muted text-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <Mail className="size-5" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Email Me</p>
                <p className="font-semibold text-foreground">mdshafayathossainsadid@gmail.com</p>
              </div>
            </div>
            <ArrowUpRight className="size-5 text-muted-foreground transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-primary" />
          </a>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {/* Phone Card */}
            <a 
              href="tel:+201558659455" 
              className="group flex flex-col justify-between rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:border-primary/50"
            >
              <div className="mb-4 flex size-10 items-center justify-center rounded-full bg-muted text-foreground group-hover:text-primary">
                <Phone className="size-4" />
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-1">Call Me</p>
                <p className="font-semibold text-foreground text-sm">+20 155 963 9455</p>
              </div>
            </a>

            {/* Location Card */}
            <div className="flex flex-col justify-between rounded-2xl border border-border bg-card p-6 shadow-sm">
              <div className="mb-4 flex size-10 items-center justify-center rounded-full bg-muted text-foreground">
                <MapPin className="size-4" />
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-1">Location</p>
                <p className="font-semibold text-foreground text-sm">Cairo, Egypt</p>
              </div>
            </div>
          </div>

          {/* WhatsApp Card */}
          <a 
            href="https://wa.me/201558659455" 
            target="_blank" 
            rel="noreferrer" 
            className="group flex items-center justify-between rounded-2xl border border-[#25D366]/20 bg-[#25D366]/5 p-6 shadow-sm transition-all hover:bg-[#25D366]/10"
          >
            <div className="flex items-center gap-4">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-[#25D366]/20 text-[#25D366]">
                <FaWhatsapp className="size-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-[#25D366]/80">Quick Chat</p>
                <p className="font-semibold text-[#25D366]">Message on WhatsApp</p>
              </div>
            </div>
            <ArrowUpRight className="size-5 text-[#25D366] transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
          </a>
        </div>

        {/* ডান পাশ: কন্টাক্ট ফর্ম (৭ কলাম) */}
        <div className="lg:col-span-7">
          <div className="h-full rounded-3xl border border-border bg-card p-6 shadow-sm md:p-10">
            <h2 className="mb-2 text-2xl font-bold text-foreground">Send a Message</h2>
            <p className="mb-8 text-sm text-muted-foreground">
              Fill out the form below and I will get back to you within 24 hours.
            </p>
            <ContactForm />
          </div>
        </div>

      </div>
    </main>
  );
}