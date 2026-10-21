// src/app/dashboard/page.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FolderKanban, FileText, MessageSquare, Mail, Loader2, ArrowRight } from "lucide-react";
import { getDashboardStats, DashboardStats } from "@/lib/api";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "cn";
import { toast } from "sonner";

export default function DashboardOverview() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await getDashboardStats();
        setStats(data);
      } catch (error) {
        toast.error("Failed to load dashboard stats");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // ডাইনামিক স্ট্যাটস অ্যারে
  const statCards = [
    { 
      label: "Total Projects", 
      value: stats?.projects ?? 0, 
      icon: FolderKanban, 
      color: "text-blue-500", 
      bg: "bg-blue-500/10",
      href: "/dashboard/projects" 
    },
    { 
      label: "Blog Posts", 
      value: stats?.blogs ?? 0, 
      icon: FileText, 
      color: "text-orange-500", 
      bg: "bg-orange-500/10",
      href: "/dashboard/blogs"
    },
    { 
      label: "Testimonials", 
      value: stats?.testimonials ?? 0, 
      icon: MessageSquare, 
      color: "text-green-500", 
      bg: "bg-green-500/10",
      href: "/dashboard/testimonials"
    },
    { 
      label: "Total Messages", 
      value: stats?.messages ?? 0, 
      icon: Mail, 
      color: "text-purple-500", 
      bg: "bg-purple-500/10",
      href: "/dashboard/messages"
    },
  ];

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      {/* Greeting */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Welcome back, Shafayat!</h2>
        <p className="text-muted-foreground">Here is what&apos;s happening with your portfolio today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <Link 
              key={i} 
              href={stat.href}
              className="group flex flex-col justify-between rounded-2xl border bg-card p-6 shadow-sm transition-all hover:border-primary/50 hover:shadow-md"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`rounded-xl p-3 ${stat.bg}`}>
                  <Icon className={`size-6 ${stat.color}`} />
                </div>
                <div className="opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0">
                  <ArrowRight className="size-4 text-muted-foreground" />
                </div>
              </div>
              
              <div>
                <div className="flex items-baseline gap-2">
                  {loading ? (
                    <Loader2 className="size-6 animate-spin text-muted-foreground" />
                  ) : (
                    <span className="text-3xl font-bold">{stat.value}</span>
                  )}
                </div>
                <p className="mt-1 text-sm font-medium text-muted-foreground">{stat.label}</p>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Quick Actions Section */}
      <div className="rounded-2xl border bg-card shadow-sm p-6 md:p-8 mt-8">
        <h3 className="text-lg font-bold mb-4">Quick Actions</h3>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          <Link href="/dashboard/blogs/new" className={cn(buttonVariants({ variant: "outline" }), "w-full justify-start gap-2 h-12 rounded-xl")}>
            <FileText className="size-4" /> Write a Blog
          </Link>
          <Link href="/dashboard/projects/new" className={cn(buttonVariants({ variant: "outline" }), "w-full justify-start gap-2 h-12 rounded-xl")}>
            <FolderKanban className="size-4" /> Add Project
          </Link>
          <Link href="/dashboard/testimonials/new" className={cn(buttonVariants({ variant: "outline" }), "w-full justify-start gap-2 h-12 rounded-xl")}>
            <MessageSquare className="size-4" /> Add Testimonial
          </Link>
        </div>
      </div>
    </div>
  );
}