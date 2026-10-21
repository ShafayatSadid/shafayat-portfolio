// src/components/dashboard/Sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  LayoutDashboard, FileText, FolderKanban, 
  MessageSquare, Mail, LogOut 
} from "lucide-react";
import { cn } from "cn";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

const SIDEBAR_ITEMS = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/blogs", label: "Blogs", icon: FileText },
  { href: "/dashboard/projects", label: "Projects", icon: FolderKanban },
  { href: "/dashboard/testimonials", label: "Testimonials", icon: MessageSquare },
  { href: "/dashboard/messages", label: "Messages", icon: Mail },
];

interface SidebarProps {
  onLinkClick?: () => void;
}

export function Sidebar({ onLinkClick }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = authClient.useSession();

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/");
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center border-b px-6">
        <Link href="/" className="text-lg font-bold tracking-tight">
          <span className="text-foreground">Shafayat</span>{" "}
          <span className="text-primary">Admin</span>
        </Link>
      </div>
      
      <div className="flex-1 overflow-auto py-4">
        <nav className="grid gap-1 px-3">
          {SIDEBAR_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onLinkClick}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <Icon className="size-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="border-t p-4">
        <div className="mb-4 flex items-center gap-3 px-2">
          <div className="flex size-9 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-sm">
            {session?.user?.name?.slice(0, 2).toUpperCase() || "AD"}
          </div>
          <div className="flex flex-col truncate">
            <span className="text-sm font-semibold truncate">{session?.user?.name}</span>
            <span className="text-xs text-muted-foreground truncate">{session?.user?.email}</span>
          </div>
        </div>
        <Button 
          variant="outline" 
          className="w-full justify-start text-destructive hover:bg-destructive/10 hover:text-destructive"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 size-4" />
          Log out
        </Button>
      </div>
    </div>
  );
}