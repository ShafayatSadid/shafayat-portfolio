// src/app/dashboard/layout.tsx
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import DashboardShell from "./DashboardShell";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  // ডেটাবেস চেক (এখানে Node.js এনভায়রনমেন্ট, তাই কোনো এরর আসবে না)
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const role = (session?.user as { role?: string })?.role;

  if (!session || role !== "admin") {
    redirect("/");
  }

  // ভেরিফাই হলে UI রেন্ডার হবে
  return <DashboardShell>{children}</DashboardShell>;
}