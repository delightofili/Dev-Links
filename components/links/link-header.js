"use client";

import Link from "next/link";
import { Bell, Search } from "lucide-react";
import { useState } from "react";
export default function LinkHeader() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="sticky top-0 w-full p-2 flex items-center justify-between">
      <form className="">
        <div className="flex items-center gap-3 bg-neutral-800 px-3 py-1.5 rounded-lg border border-neutral-700/80  transition-colors">
          <Search className="text-neutral-500 h-5 w-5 " />
          <input
            type="text"
            placeholder="Search DevLinks..."
            className="bg-transparent text-white w-full focus:outline-none placeholder:text-neutral-500 text-sm"
          />
        </div>
      </form>
      <div className="relative group flex gap-3 items-center">
        <Bell className="text-neutral-500" />
        <Link
          href="/submit"
          className="border-2 px-2 text-xl border-green-600 rounded-md text-green-600 font-bold cursor-pointer"
        >
          +
        </Link>
        {!isOpen && (
          <div className="absolute top-12  opacity-0 -translate-y-1 transition-all duration-300 ease-out delay-150 group-hover:opacity-100 bg-neutral-700 text-white text-xs px-2 py-1 rounded shadow-md pointer-events-none whitespace-nowrap">
            submit link
          </div>
        )}
      </div>
    </div>
  );
}
