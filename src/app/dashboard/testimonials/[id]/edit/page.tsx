// src/app/dashboard/testimonials/[id]/edit/page.tsx
"use client";

import { Suspense, use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getTestimonialById, updateTestimonial } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Loader2, Save, Star } from "lucide-react";
import { toast } from "sonner";

function EditTestimonialContent({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    feedback: "",
    rating: 5,
  });

  useEffect(() => {
    (async () => {
      try {
        const data = await getTestimonialById(resolvedParams.id);
        setFormData({
          name: data.name,
          role: data.role,
          feedback: data.feedback,
          rating: data.rating,
        });
      } catch (error) {
        toast.error("Failed to load testimonial data");
        router.push("/dashboard/testimonials");
      } finally {
        setLoading(false);
      }
    })();
  }, [resolvedParams.id, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateTestimonial(resolvedParams.id, formData);
      toast.success("Testimonial updated successfully!");
      router.push("/dashboard/testimonials");
      router.refresh();
    } catch (error) {
      toast.error("Failed to update testimonial.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="size-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl pb-20">
      <div className="mb-8 flex items-center gap-4">
        <Link href="/dashboard/testimonials" className="text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="size-5" />
        </Link>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Edit Testimonial</h2>
          <p className="text-muted-foreground text-sm">Update the client&apos;s feedback.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 rounded-2xl border bg-card p-6 shadow-sm md:p-8">
        
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">Client Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="role">Role / Company</Label>
            <Input
              id="role"
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
            rows={4}
            className="resize-none"
            value={formData.feedback}
            onChange={(e) => setFormData({ ...formData, feedback: e.target.value })}
            required
          />
        </div>

        <div className="flex justify-end border-t pt-6">
          <Button type="submit" disabled={saving} className="rounded-full px-8 gap-2">
            {saving ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
            {saving ? "Updating..." : "Update Testimonial"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default function EditTestimonialPage({ params }: { params: Promise<{ id: string }> }) {
  return (
    <Suspense fallback={
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="size-8 animate-spin text-muted-foreground" />
      </div>
    }>
      <EditTestimonialContent params={params} />
    </Suspense>
  );
}