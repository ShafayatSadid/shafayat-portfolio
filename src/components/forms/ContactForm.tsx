// src/components/forms/ContactForm.tsx
"use client";

import { useState } from "react";
import { submitContactForm } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2, CheckCircle2 } from "lucide-react";

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
      await submitContactForm(data);
      setSuccess(true);
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-2xl border bg-card p-6 shadow-sm md:p-8">
      {success ? (
        <div className="flex h-full flex-col items-center justify-center text-center py-12">
          <CheckCircle2 className="mb-4 size-16 text-primary" />
          <h3 className="mb-2 text-2xl font-bold">Message Sent!</h3>
          <p className="text-muted-foreground">
            Thank you for reaching out. I&apos;ll get back to you soon.
          </p>
          <Button onClick={() => setSuccess(false)} variant="outline" className="mt-6 rounded-full">
            Send another message
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" placeholder="John Doe" required />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" placeholder="john@example.com" required />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="message">Message</Label>
            <Textarea 
              id="message" 
              name="message" 
              placeholder="Tell me about your project..." 
              rows={5} 
              required 
            />
          </div>

          <Button type="submit" size="lg" className="w-full rounded-full" disabled={loading}>
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
      )}
    </div>
  );
}