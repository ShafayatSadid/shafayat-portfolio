// src/app/contact/page.tsx
import { ContactForm } from "@/components/forms/ContactForm";
import { Mail, MapPin, Phone } from "lucide-react";
import { Metadata } from "next";
import { FaWhatsapp } from "react-icons/fa";

export const metadata: Metadata = {
  title: "Contact — Shafayat Sadid",
  description: "Get in touch with me for freelance projects, collaborations, or just to say hi.",
};

export default function ContactPage() {
  return (
    <main className="mx-auto min-h-[80vh] max-w-5xl px-4 py-24">
      <div className="mb-16 text-center">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
          Get in <span className="text-primary">Touch</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          Have a question or want to work together? Leave your details below and I&apos;ll get back to you as soon as possible.
        </p>
      </div>

      <div className="grid gap-12 md:grid-cols-2">
        {/* Contact Info */}
        <div className="flex flex-col gap-8">
          <div>
            <h2 className="mb-6 text-2xl font-bold">Let&apos;s talk about your project</h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              I&apos;m currently available for freelance work and open to new opportunities.
              Whether you have a specific project in mind or just want to say hi, I&apos;d love to hear from you.
            </p>
          </div>

          <div className="flex flex-col gap-6">
            {/* Email */}
            <div className="flex items-center gap-4">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Mail className="size-5" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Email</p>
                <a href="mailto:mdshafayathossainsadid@gmail.com" className="font-semibold hover:text-primary transition-colors">
                  mdshafayathossainsadid@gmail.com
                </a>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-center gap-4">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <MapPin className="size-5" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Location</p>
                <p className="font-semibold">Cairo, Egypt</p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-center gap-4">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Phone className="size-5" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Phone</p>
                <a href="tel:+201558659455" className="font-semibold hover:text-primary transition-colors">
                  +20 155 963 9455
                </a>
              </div>
            </div>

            {/* WhatsApp */}
            <div className="flex items-center gap-4">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#25D366]/10 text-[#25D366]">
                <FaWhatsapp className="size-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">WhatsApp</p>
                <a
                  href="https://wa.me/201558659455"
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold hover:text-[#25D366] transition-colors"
                >
                  Message me on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <ContactForm />
      </div>
    </main>
  );
}
