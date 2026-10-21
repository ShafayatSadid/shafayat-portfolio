// src/app/dashboard/blogs/page.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getBlogs, deleteBlog } from "@/lib/api";
import { BlogPost } from "@/types/blog";
import { Button, buttonVariants } from "@/components/ui/button";
import { Plus, Edit, Trash2, Loader2, Calendar } from "lucide-react";
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

export default function BlogsListPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [blogToDelete, setBlogToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchBlogs = async () => {
    try {
      const data = await getBlogs();
      setBlogs(data);
    } catch (error) {
      toast.error("Failed to load blogs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      await fetchBlogs();
    })();
  }, []);

  const confirmDelete = async () => {
    if (!blogToDelete) return;
    
    setIsDeleting(true);
    try {
      await deleteBlog(blogToDelete);
      toast.success("Blog deleted successfully");
      setBlogs(blogs.filter((b) => b._id !== blogToDelete));
    } catch (error) {
      toast.error("Failed to delete blog");
    } finally {
      setIsDeleting(false);
      setBlogToDelete(null);
    }
  };

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Blog Posts</h2>
          <p className="text-muted-foreground">Manage your blog content here.</p>
        </div>
        <Link href="/dashboard/blogs/new" className={cn(buttonVariants(), "gap-2 rounded-full")}>
          <Plus className="size-4" />
          Create New Blog
        </Link>
      </div>

      {loading ? (
        <div className="flex h-40 items-center justify-center rounded-2xl border bg-card">
          <Loader2 className="size-6 animate-spin text-muted-foreground" />
        </div>
      ) : blogs.length === 0 ? (
        <div className="flex h-40 flex-col items-center justify-center rounded-2xl border bg-card text-muted-foreground">
          <p>No blogs found. Create your first one!</p>
        </div>
      ) : (
        /* Grid Layout for Both Desktop & Mobile */
        <div className="grid gap-6 sm:grid-cols-2">
          {blogs.map((blog) => (
            <div 
              key={blog._id} 
              className="flex flex-col justify-between rounded-2xl border bg-card p-6 shadow-sm transition-all hover:shadow-md"
            >
              <div>
                <h3 className="text-xl font-bold leading-tight tracking-tight mb-2 line-clamp-2">
                  {blog.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 truncate">
                  /{blog.slug}
                </p>
                
                {/* Date Badge */}
                <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground bg-muted/50 w-fit px-3 py-1.5 rounded-md">
                  <Calendar className="size-3.5" />
                  {blog.createdAt ? new Date(blog.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "N/A"}
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="mt-8 flex items-center justify-between border-t pt-5">
                <Link 
                  href={`/dashboard/blogs/${blog._id}/edit`} 
                  className={cn(buttonVariants({ variant: "outline", size: "sm" }), "rounded-full h-9 px-5")}
                >
                  <Edit className="mr-2 size-4" /> Edit
                </Link>
                <Button 
                  variant="destructive" 
                  size="sm" 
                  className="rounded-full h-9 px-5 bg-destructive/10 text-destructive hover:bg-destructive hover:text-white transition-colors"
                  onClick={() => setBlogToDelete(blog._id)}
                >
                  <Trash2 className="mr-2 size-4" /> Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal (তোমার করা ডিজাইন অনুযায়ী) */}
      <AlertDialog open={!!blogToDelete} onOpenChange={(open) => !open && setBlogToDelete(null)}>
        <AlertDialogContent className="rounded-2xl sm:max-w-md">
          <AlertDialogHeader className="gap-5">
            <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-destructive/10 sm:mx-0">
              <Trash2 className="size-7 text-red-500" />
            </div>
            <div>
              <AlertDialogTitle className="text-xl">Delete Blog Post?</AlertDialogTitle>
              <AlertDialogDescription className="mt-2 text-base leading-relaxed">
                Are you sure you want to delete this blog post? This action cannot be undone and will permanently remove it from your database.
              </AlertDialogDescription>
            </div>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-6 gap-3 sm:gap-2">
            <AlertDialogCancel disabled={isDeleting} className="rounded-full px-6">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={(e) => {
                e.preventDefault();
                confirmDelete();
              }} 
              disabled={isDeleting}
              className="rounded-full bg-red-500 px-6 text-white hover:bg-red-600 gap-2"
            >
              {isDeleting ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 className="size-4" />
                  Yes, Delete
                </>
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}