// app/loading.js (The catch-all generic global loader)
export default function GlobalLoading() {
  return (
    <div className="w-full max-w-[800px] mx-auto p-4">
      <div className="w-full border border-neutral-900 bg-neutral-950/20 rounded-2xl p-5 animate-pulse flex flex-col gap-y-4">
        {/* Header Unit: Avatar Circle & Name Blocks */}
        <div className="flex items-center gap-x-4 border-b border-neutral-900 pb-4">
          <div className="w-12 h-12 rounded-xl bg-neutral-900 border border-neutral-800/40 shrink-0" />
          <div className="flex flex-col gap-y-2 w-full">
            <div className="h-4 bg-neutral-900 rounded w-1/4" />
            <div className="h-3 bg-neutral-900 rounded w-1/3" />
          </div>
        </div>

        {/* Core Layout Data Bars */}
        <div className="space-y-3 py-2">
          <div className="h-3.5 bg-neutral-900 rounded w-full" />
          <div className="h-3.5 bg-neutral-900 rounded w-full" />
          <div className="h-3.5 bg-neutral-900 rounded w-4/5" />
          <div className="h-3.5 bg-neutral-900 rounded w-1/2" />
        </div>

        {/* Big Layout Focus Container (Perfect for general media/detail views) */}
        <div className="h-44 w-full bg-neutral-900/60 border border-neutral-800/30 rounded-xl mt-2" />
      </div>
    </div>
  );
}
