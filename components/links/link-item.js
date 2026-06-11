import { MessageSquare, Repeat2, ExternalLink } from "lucide-react";
import UpvoteButton from "../ui/upvote-button";

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
    <div className="grid grid-cols-[48px_1fr] gap-x-4 w-full max-w-2xl bg-neutral-950 border border-neutral-900 rounded-2xl p-5 hover:border-green-500/30 transition-all group">
      {/* LEFT COLUMN: UPVOTE BOX */}
      <UpvoteButton
        hasUpvoted={hasUpvoted}
        initialVotes={upvotes_count}
        linkId={id}
      />

      <div className="flex flex-col space-y-3">
        {/* 1. USER IDENTITY BAR */}
        <div className="flex items-center gap-x-2">
          {/* Mock Avatar Circle */}
          <div className="w-6 h-6 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center text-[10px] font-bold text-neutral-400">
            A
          </div>
          <span className="text-sm font-medium text-neutral-200 hover:underline cursor-pointer">
            {username}
          </span>
          <span className="text-xs text-neutral-500">•</span>
          <span className="text-xs text-neutral-500">14m ago</span>
        </div>

        <div>
          <h2 className="text-lg font-bold text-green-400 leading-snug group-hover:text-green-300 transition-colors">
            &quot;{title}&quot;
            <span className="inline-flex items-center gap-x-1 text-xs font-normal text-neutral-500 ml-2 hover:text-neutral-400 cursor-pointer">
              {url} <ExternalLink className="w-3 h-3" />
            </span>
          </h2>
        </div>

        <p className="text-sm text-neutral-400 leading-relaxed max-w-prose">
          {description}
        </p>

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

        <div className="flex items-center gap-x-6 text-xs text-neutral-500 pt-3 border-t border-neutral-900/60">
          <button className="flex items-center gap-x-1.5 hover:text-neutral-300 transition-colors cursor-pointer">
            <MessageSquare className="w-4 h-4" />
            <span>{commentsCount} comments</span>
          </button>

          <button className="flex items-center gap-x-1.5 hover:text-neutral-300 transition-colors cursor-pointer">
            <Repeat2 className="w-4 h-4" />
            <span>Repost</span>
          </button>
        </div>
      </div>
    </div>
  );
}
