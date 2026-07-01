"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, Boxes, Clock3, LogOut, Settings, UserRound, Zap } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { user } from "@/data/user";

const items = [
  { label: "Dashboard", href: "/dashboard", icon: BarChart3 },
  { label: "Projects", href: "/projects", icon: Boxes },
  { label: "Deployments", href: "/projects/atlas-web/deployments", icon: Clock3 },
  { label: "Settings", href: "/settings", icon: Settings },
  { label: "Account", href: "/account", icon: UserRound },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-full flex-col bg-surface">
      <Link href="/dashboard" className="mb-8 flex items-center gap-3 px-2 pt-1">
        <span className="grid h-9 w-9 place-items-center rounded-md bg-primary text-surface"><Zap size={20} /></span>
        <span className="text-lg font-semibold">DeployIt</span>
      </Link>
      <nav className="space-y-1">
        {items.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn("flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-secondary transition hover:bg-white/5 hover:text-foreground", active && "bg-primary text-surface hover:bg-primary hover:text-surface")}
            >
              <Icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto border-t pt-4">
        <div className="flex items-center gap-3 px-2">
          <Avatar>
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>KM</AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium">{user.name}</p>
            <p className="truncate text-xs text-secondary">@{user.githubUsername}</p>
          </div>
        </div>
        <Button variant="ghost" className="mt-4 w-full justify-start text-secondary"><LogOut size={16} /> Logout</Button>
      </div>
    </aside>
  );
}
