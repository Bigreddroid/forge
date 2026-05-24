"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  FileText,
  Users,
  Zap,
  Settings,
  Github,
  Flame,
} from "lucide-react";

const nav = [
  { href: "/dashboard" as const, label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/content" as const, label: "Content", icon: FileText },
  { href: "/dashboard/leads" as const, label: "Leads", icon: Users },
  { href: "/dashboard/workflows" as const, label: "Workflows", icon: Zap },
  { href: "/dashboard/settings" as const, label: "Settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 w-[240px] bg-zinc-900 border-r border-zinc-800 flex flex-col z-10">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-5 h-16 border-b border-zinc-800">
        <div className="flex items-center justify-center w-8 h-8 bg-orange-500 rounded-lg">
          <Flame className="w-4 h-4 text-white" />
        </div>
        <span className="text-lg font-bold tracking-tight text-white">FORGE</span>
        <span className="ml-auto badge-zinc text-[10px]">Cloud</span>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {nav.map(({ href, label, icon: Icon }) => {
          const active =
            href === "/dashboard" ? pathname === href : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                active
                  ? "bg-orange-500/10 text-orange-400"
                  : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800"
              )}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-3 pb-4 space-y-1 border-t border-zinc-800 pt-3">
        <a
          href="https://github.com/Bigreddroid/forge"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800 transition-colors"
        >
          <Github className="w-4 h-4 shrink-0" />
          Open Source
        </a>
        <div className="px-3 py-2 flex items-center justify-between">
          <p className="text-[11px] text-zinc-600">FORGE v0.1.0</p>
          <UserButton
            appearance={{
              elements: {
                avatarBox: "w-6 h-6",
              },
            }}
          />
        </div>
      </div>
    </aside>
  );
}
