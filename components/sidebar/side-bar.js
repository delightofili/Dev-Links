// components/sidebar/side-bar.jsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Wrench,
  FileText,
  GraduationCap,
  Briefcase,
  MessageSquare,
  Bookmark,
  ChevronRight,
} from "lucide-react";

export default function SideBar() {
  const pathname = usePathname();

  const navItems = [
    { name: "Feed", href: "/", icon: Home },
    { name: "Tools", href: "/tools", icon: Wrench },
    { name: "Articles", href: "/articles", icon: FileText },
    { name: "Tutorials", href: "/tutorials", icon: GraduationCap },
    { name: "Jobs", href: "/jobs", icon: Briefcase },
    { name: "Discussions", href: "/discussions", icon: MessageSquare },
    { name: "Bookmarks", href: "/bookmarks", icon: Bookmark },
  ];

  return (
    <aside className="sticky top-0 h-screen w-20 xl:w-64 flex flex-col justify-between py-6 pr-4 bg-black border-r border-neutral-900 select-none shrink-0">
      <div className="flex flex-col w-full">
        <div className="flex gap-2.5 items-center px-3 py-2 mb-8 cursor-pointer group">
          <span className="text-xl font-extrabold tracking-tighter text-green-500 font-mono">
            &lt;/&gt;
          </span>
          <h1 className="xl:block hidden text-2xl font-bold tracking-tight text-white">
            Dev<span className="text-green-500">Links</span>
          </h1>
        </div>

        <nav className="flex flex-col gap-y-1 w-full">
          {navItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-x-4 px-4 py-3 rounded-xl transition-all duration-150 group w-full text-[15px] font-medium relative
                  ${
                    isActive
                      ? "bg-green-950/20 text-green-400 font-semibold"
                      : "text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900/40"
                  }`}
              >
                {isActive && (
                  <span className="absolute left-0 top-1/4 h-1/2 w-[3px] bg-green-500 rounded-r-md" />
                )}

                <item.icon
                  className={`h-5 w-5 stroke-[1.8] transition-colors 
                    ${isActive ? "text-green-400" : "text-neutral-500 group-hover:text-neutral-300"}`}
                />
                <span className="xl:block hidden">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="w-full border-t border-neutral-900 pt-4">
        <div className="flex items-center justify-between p-2 rounded-xl bg-neutral-900/20 border border-neutral-900 hover:border-neutral-800 transition-all duration-150 cursor-pointer group">
          <div className="flex items-center gap-x-3 min-w-0">
            {/* Minimal Green Profile Box */}
            <div className="h-9 w-9 rounded-xl bg-green-950/20 border border-green-500/30 flex items-center justify-center shrink-0">
              <svg
                className="h-5 w-5 text-green-500"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="3" y="3" width="18" height="18" rx="4" />
                <path d="M7 10h2v2H7zM15 10h2v2h-2zM7 16h10" />
              </svg>
            </div>

            <div className="xl:flex hidden flex-col truncate">
              <span className="text-[13.5px] font-semibold text-neutral-200 truncate">
                dev_alex
              </span>
              <span className="text-[11px] text-neutral-500 font-mono tracking-tight">
                12.4k karma
              </span>
            </div>
          </div>
          <ChevronRight className="xl:block hidden h-4 w-4 text-neutral-600 group-hover:text-neutral-400 transition-colors shrink-0" />
        </div>
      </div>
    </aside>
  );
}
