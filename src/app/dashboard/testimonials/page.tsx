// src/app/dashboard/testimonials/page.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getTestimonials, deleteTestimonial } from "@/lib/api";
import { Testimonial } from "@/types/testimonial";
import { Button, buttonVariants } from "@/components/ui/button";
import { Plus, Edit, Trash2, Loader2, Star } from "lucide-react";
import { toast } from "sonner";
import { cn } from "cn";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function TestimonialsListPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [reviewToDelete, setReviewToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchTestimonials = async () => {
    try {
      const data = await getTestimonials();
      setTestimonials(data);
    } catch (error) {
      toast.error("Failed to load testimonials");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      await fetchTestimonials();
    })();
  }, []);

  const confirmDelete = async () => {
    if (!reviewToDelete) return;
    setIsDeleting(true);
    try {
      await deleteTestimonial(reviewToDelete);
      toast.success("Testimonial deleted successfully");
      setTestimonials(testimonials.filter((t) => t._id !== reviewToDelete));
    } catch (error) {
      toast.error("Failed to delete testimonial");
    } finally {
      setIsDeleting(false);
      setReviewToDelete(null);
    }
  };

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Testimonials</h2>
          <p className="text-muted-foreground">Manage your client reviews here.</p>
        </div>
        <Link href="/dashboard/testimonials/new" className={cn(buttonVariants(), "gap-2 rounded-full")}>
          <Plus className="size-4" />
          Add Testimonial
        </Link>
      </div>

      {loading ? (
        <div className="flex h-40 items-center justify-center rounded-2xl border bg-card">
          <Loader2 className="size-6 animate-spin text-muted-foreground" />
        </div>
      ) : testimonials.length === 0 ? (
        <div className="flex h-40 flex-col items-center justify-center rounded-2xl border bg-card text-muted-foreground">
          <p>No testimonials found. Add your first one!</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2">
          {testimonials.map((t) => (
            <div key={t._id} className="flex flex-col justify-between rounded-2xl border bg-card p-6 shadow-sm transition-all hover:shadow-md">
              <div>
                {/* Rating */}
                <div className="mb-4 flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`size-4 ${i < t.rating ? "fill-primary text-primary" : "fill-muted text-muted-foreground/30"}`} />
                  ))}
                </div>
                {/* Feedback */}
                <p className="text-sm italic leading-relaxed text-foreground/90 line-clamp-4">
                  &quot;{t.feedback}&quot;
                </p>
              </div>

              {/* Client Info & Actions */}
              <div className="mt-6 flex items-center justify-between border-t pt-4">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                    {t.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold">{t.name}</h4>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Link 
                    href={`/dashboard/testimonials/${t._id}/edit`} 
                    className={cn(buttonVariants({ variant: "outline", size: "icon" }), "size-8 rounded-md")}
                  >
                    <Edit className="size-4" />
                  </Link>
                  <Button 
                    variant="destructive" 
                    size="icon" 
                    className="size-8 rounded-md"
                    onClick={() => setReviewToDelete(t._id)}
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Modal */}
      <AlertDialog open={!!reviewToDelete} onOpenChange={(open) => !open && setReviewToDelete(null)}>
        <AlertDialogContent className="rounded-2xl sm:max-w-md">
          <AlertDialogHeader className="gap-5">
            <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-destructive/10 sm:mx-0">
              <Trash2 className="size-7 text-red-500" />
            </div>
            <div>
              <AlertDialogTitle className="text-xl">Delete Testimonial?</AlertDialogTitle>
              <AlertDialogDescription className="mt-2 text-base leading-relaxed">
                Are you sure you want to delete this review? This action cannot be undone.
              </AlertDialogDescription>
            </div>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-6 gap-3 sm:gap-2">
            <AlertDialogCancel disabled={isDeleting} className="rounded-full px-6">Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={(e) => { e.preventDefault(); confirmDelete(); }} 
              disabled={isDeleting}
              className="rounded-full bg-red-500 px-6 text-white hover:bg-red-600 gap-2"
            >
              {isDeleting ? <Loader2 className="size-4 animate-spin" /> : <Trash2 className="size-4" />}
              {isDeleting ? "Deleting..." : "Yes, Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}