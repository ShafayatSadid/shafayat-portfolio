// src/components/forms/ContactForm.tsx
"use client";

import { useState } from "react";
import { submitContactForm } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

export function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      message: formData.get("message") as string,
    };

    try {
      // শুধু ব্যাকএন্ডে পাঠাচ্ছি (MongoDB-তে সেভ হবে)
      await submitContactForm(data);

      setSuccess(true);
      toast.success("Message sent successfully!");
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="flex h-[400px] flex-col items-center justify-center text-center">
        <CheckCircle2 className="mb-4 size-16 text-primary" />
        <h3 className="mb-2 text-2xl font-bold">Message Sent!</h3>
        <p className="text-muted-foreground mb-6">
          Thank you for reaching out. I&apos;ll get back to you soon.
        </p>
        <Button onClick={() => setSuccess(false)} variant="outline" className="rounded-full">
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <Label htmlFor="name" className="text-foreground/80">Name</Label>
        <Input id="name" name="name" placeholder="Your name" required className="bg-background border-border focus-visible:ring-1 focus-visible:ring-primary h-12 rounded-xl" />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="email" className="text-foreground/80">Email</Label>
        <Input id="email" name="email" type="email" placeholder="Your email address" required className="bg-background border-border focus-visible:ring-1 focus-visible:ring-primary h-12 rounded-xl" />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="message" className="text-foreground/80">Message</Label>
        <Textarea id="message" name="message" placeholder="Tell me about your project..." rows={5} required className="bg-background border-border focus-visible:ring-1 focus-visible:ring-primary rounded-xl resize-none" />
      </div>

      <Button type="submit" size="lg" className="w-full rounded-full h-12 mt-2" disabled={loading}>
        {loading ? (
          <>
            <Loader2 className="mr-2 size-4 animate-spin" />
            Sending...
          </>
        ) : (
          "Send Message"
        )}
      </Button>
    </form>
  );
}