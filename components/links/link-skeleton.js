export function LinkItemSkeleton() {
  return (
    <div className="grid grid-cols-[48px_1fr] gap-x-4 w-full max-w-2xl bg-neutral-950 border border-neutral-900 rounded-2xl p-5 animate-pulse">
      {/* LEFT COLUMN: UPVOTE BOX SKELETON */}
      <div className="flex flex-col items-center">
        {/* Upvote button block */}
        <div className="w-full aspect-square bg-neutral-900 border border-neutral-800/40 rounded-xl" />
        {/* Vote count block */}
        <div className="h-4 w-6 bg-neutral-900 rounded mt-2" />
      </div>

      {/* RIGHT COLUMN: CONTENT TREE SKELETON */}
      <div className="flex flex-col space-y-3">
        {/* 1. USER IDENTITY BAR */}
        <div className="flex items-center gap-x-2">
          {/* Avatar circle */}
          <div className="w-6 h-6 rounded-full bg-neutral-900" />
          {/* Username block */}
          <div className="h-4 w-24 bg-neutral-900 rounded" />
          <div className="h-3 w-3 bg-neutral-900 rounded-full" />
          {/* Timestamp block */}
          <div className="h-3 w-12 bg-neutral-900 rounded" />
        </div>

        {/* 2. TITLE SKELETON */}
        <div className="space-y-2">
          <div className="h-5 w-3/4 bg-neutral-900 rounded" />
        </div>

        {/* 3. POST BODY DESCRIPTION SKELETON */}
        <div className="space-y-2 pt-1">
          <div className="h-3.5 w-full bg-neutral-900 rounded" />
          <div className="h-3.5 w-11/12 bg-neutral-900 rounded" />
          <div className="h-3.5 w-2/3 bg-neutral-900 rounded" />
        </div>

        {/* 4. BADGES ROW SKELETON */}
        <div className="flex gap-2 pt-2">
          {/* Category badge block */}
          <div className="h-6 w-14 bg-neutral-900 rounded-md" />
          {/* Tag blocks */}
          <div className="h-6 w-20 bg-neutral-900 rounded-md" />
          <div className="h-6 w-16 bg-neutral-900 rounded-md" />
        </div>

        {/* 5. INTERACTION SUB-BAR SKELETON */}
        <div className="flex items-center gap-x-6 pt-4 border-t border-neutral-900/40">
          {/* Comments block */}
          <div className="h-4 w-24 bg-neutral-900 rounded" />
          {/* Repost block */}
          <div className="h-4 w-16 bg-neutral-900 rounded" />
        </div>
      </div>
    </div>
  );
}

export default function LinksGridSkeleton() {
  // Generates an array of 3 placeholders to beautifully fill the grid space
  return (
    <div className="flex flex-col gap-4 w-full">
      <LinkItemSkeleton />
      <LinkItemSkeleton />
      <LinkItemSkeleton />
    </div>
  );
}
