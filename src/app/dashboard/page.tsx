// src/app/dashboard/page.tsx
import { FolderKanban, FileText, MessageSquare, Mail } from "lucide-react";

const STATS = [
  { label: "Total Projects", value: "4", icon: FolderKanban, color: "text-blue-500", bg: "bg-blue-500/10" },
  { label: "Blog Posts", value: "2", icon: FileText, color: "text-orange-500", bg: "bg-orange-500/10" },
  { label: "Testimonials", value: "5", icon: MessageSquare, color: "text-green-500", bg: "bg-green-500/10" },
  { label: "Unread Messages", value: "0", icon: Mail, color: "text-purple-500", bg: "bg-purple-500/10" },
];

export default function DashboardOverview() {
  return (
    <div className="mx-auto max-w-5xl space-y-8">
      {/* Greeting */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Welcome back, Shafayat!</h2>
        <p className="text-muted-foreground">Here is what&apos;s happening with your portfolio today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="rounded-xl border bg-card p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div className={`rounded-lg p-2.5 ${stat.bg}`}>
                  <Icon className={`size-5 ${stat.color}`} />
                </div>
                <span className="text-3xl font-bold">{stat.value}</span>
              </div>
              <p className="mt-4 text-sm font-medium text-muted-foreground">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Recent Activity Section (Placeholder) */}
      <div className="rounded-xl border bg-card shadow-sm">
        <div className="border-b px-6 py-4">
          <h3 className="font-semibold">Recent Activity</h3>
        </div>
        <div className="p-6 text-center text-sm text-muted-foreground">
          No recent activity to show.
        </div>
      </div>
    </div>
  );
}