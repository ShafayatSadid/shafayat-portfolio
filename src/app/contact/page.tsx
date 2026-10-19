// src/app/contact/page.tsx
import { ContactForm } from "@/components/forms/ContactForm";
import { Mail, MapPin, Phone } from "lucide-react";

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
            <div className="flex items-center gap-4">
              <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Mail className="size-5" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Email</p>
                <p className="font-semibold">hello@shafayatsadid.com</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <MapPin className="size-5" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Location</p>
                <p className="font-semibold">Bangladesh</p>
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