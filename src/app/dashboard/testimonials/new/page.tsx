// src/app/dashboard/testimonials/new/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createTestimonial } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Loader2, Save, Star } from "lucide-react";
import { toast } from "sonner";

export default function NewTestimonialPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    feedback: "",
    rating: 5, // ডিফল্ট ৫ স্টার
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createTestimonial(formData);
      toast.success("Testimonial added successfully!");
      router.push("/dashboard/testimonials");
      router.refresh();
    } catch (error) {
      toast.error("Failed to add testimonial.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl pb-20">
      <div className="mb-8 flex items-center gap-4">
        <Link href="/dashboard/testimonials" className="text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="size-5" />
        </Link>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Add Testimonial</h2>
          <p className="text-muted-foreground text-sm">Record a happy client&apos;s feedback.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 rounded-2xl border bg-card p-6 shadow-sm md:p-8">
        
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">Client Name</Label>
            <Input
              id="name"
              placeholder="e.g., Tanvir Ahmed"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="role">Role / Company</Label>
            <Input
              id="role"
              placeholder="e.g., CEO at Monohor"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Rating</Label>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setFormData({ ...formData, rating: star })}
                className="focus:outline-none transition-transform hover:scale-110"
              >
                <Star 
                  className={`size-8 ${
                    star <= formData.rating 
                      ? "fill-primary text-primary" 
                      : "fill-muted text-muted-foreground/30"
                  }`} 
                />
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="feedback">Feedback</Label>
          <Textarea
            id="feedback"
            placeholder="What did the client say about your work?"
            rows={4}
            className="resize-none"
            value={formData.feedback}
            onChange={(e) => setFormData({ ...formData, feedback: e.target.value })}
            required
          />
        </div>

        <div className="flex justify-end border-t pt-6">
          <Button type="submit" disabled={loading} className="rounded-full px-8 gap-2">
            {loading ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
            {loading ? "Saving..." : "Save Testimonial"}
          </Button>
        </div>
      </form>
    </div>
  );
}