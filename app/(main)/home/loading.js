export default function LoadingHome() {
  const dummyFeedItems = [1, 2, 3];

  return (
    <div className="w-full flex flex-col gap-y-4 max-w-[800px] mx-auto">
      {dummyFeedItems.map((item) => (
        <div
          key={item}
          className="w-full border border-neutral-900 bg-neutral-950/40 rounded-2xl p-4 animate-pulse grid grid-cols-[54px_1fr] gap-x-4 select-none"
        >
          {/* Left Column: Vertical Upvote Box Skeleton */}
          <div className="flex flex-col items-center justify-start pt-1">
            <div className="w-10 h-14 rounded-xl bg-neutral-900 border border-neutral-800/50 flex flex-col items-center justify-center gap-y-2">
              <div className="w-3 h-3 bg-neutral-800 rounded-sm" />
              <div className="w-4 h-3 bg-neutral-800 rounded" />
            </div>
          </div>

          {/* Right Column: Link Post Details */}
          <div className="flex flex-col pr-2">
            {/* Meta bar: Type Tag & Time label */}
            <div className="flex items-center gap-x-3 mb-2.5">
              <div className="h-4 bg-neutral-900 border border-neutral-800/40 rounded-md w-16" />
              <div className="h-3 bg-neutral-900 rounded w-12 font-mono" />
            </div>

            {/* Title Line Block */}
            <div className="h-5 bg-neutral-900 rounded-md w-11/12 mb-2" />
            <div className="h-5 bg-neutral-900 rounded-md w-2/3 mb-4" />

            {/* Description Sub-text lines */}
            <div className="space-y-1.5 mb-4">
              <div className="h-3 bg-neutral-900 rounded w-full" />
              <div className="h-3 bg-neutral-900 rounded w-5/6" />
            </div>

            {/* Bottom Info bar: Comments count & Author handle */}
            <div className="flex items-center justify-between border-t border-neutral-900 pt-3 mt-1">
              <div className="flex gap-x-4">
                <div className="h-3 bg-neutral-900 rounded w-16" />
                <div className="h-3 bg-neutral-900 rounded w-12" />
              </div>
              <div className="h-3 bg-neutral-900 rounded w-20 font-mono" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
