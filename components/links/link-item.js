"use client";

import { MessageSquare, Repeat2, ExternalLink } from "lucide-react";
import UpvoteButton from "../ui/upvote-button";
import Link from "next/link";

export default function LinkItem({
  id,
  title,
  username,
  url,
  hasUpvoted,
  description,
  category,
  tags,
  upvotes_count,
  commentsCount,
}) {
  const tagsArray = tags ? tags.split(",").map((t) => t.trim()) : [];

  return (
    <div className="grid grid-cols-[48px_1fr] gap-x-4 w-full max-w-2xl bg-neutral-950 border border-neutral-900 rounded-2xl p-5 hover:border-green-500/20 transition-all group relative">
      <UpvoteButton
        hasUpvoted={hasUpvoted}
        initialVotes={upvotes_count}
        linkId={id}
      />

      <div className="flex flex-col space-y-3">
        <div className="flex items-center gap-x-2">
          <div className="w-6 h-6 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center text-[10px] font-bold text-neutral-400">
            A
          </div>
          <span className="text-sm font-medium text-neutral-200 hover:underline cursor-pointer">
            {username}
          </span>
          <span className="text-xs text-neutral-500">•</span>
          <span className="text-xs text-neutral-500">14m ago</span>
        </div>

        <div className="flex items-start flex-wrap gap-x-2">
          <Link
            href={`/links/${id}`}
            className="text-lg font-bold text-green-400 leading-snug hover:text-green-300 transition-colors cursor-pointer"
          >
            &quot;{title}&quot;
          </Link>

          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-x-1 text-xs font-normal text-neutral-500 hover:text-neutral-300 transition-colors mt-1.5 cursor-pointer"
          >
            {url.replace(/^https?:\/\/(www\.)?/, "").slice(0, 18)}...
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* 3. DESCRIPTION CARD TARGET LINK */}
        <Link href={`/links/${id}`} className="block cursor-pointer">
          <p className="text-sm text-neutral-400 leading-relaxed max-w-prose">
            {description.length > 160
              ? `${description.slice(0, 160)}...`
              : description}
          </p>
        </Link>

        {/* 4. SYSTEM TAG BADGES */}
        <div className="flex flex-wrap gap-2 pt-1">
          <span className="text-xs font-semibold uppercase tracking-wider bg-neutral-900 text-green-400 border border-neutral-800 px-2.5 py-1 rounded-md">
            {category}
          </span>

          {tagsArray.map((tag, index) => (
            <span
              key={index}
              className="text-xs font-medium bg-green-500/5 border border-green-500/10 text-green-400/80 px-2.5 py-1 rounded-md hover:bg-green-500/10 cursor-pointer transition-colors"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* 5. METRIC COUPLING ACTIONS STRIP */}
        <div className="flex items-center gap-x-6 text-xs text-neutral-500 pt-3 border-t border-neutral-900/60">
          <Link
            href={`/links/${id}`}
            className="flex items-center gap-x-1.5 hover:text-neutral-300 transition-colors cursor-pointer"
          >
            <MessageSquare className="w-4 h-4" />
            <span>{commentsCount || 0} comments</span>
          </Link>

          <button className="flex items-center gap-x-1.5 hover:text-neutral-300 transition-colors cursor-pointer">
            <Repeat2 className="w-4 h-4" />
            <span>Repost</span>
          </button>
        </div>
      </div>
    </div>
  );
}
