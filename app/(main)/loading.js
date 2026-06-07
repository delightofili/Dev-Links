export default function loading() {
  return (
    <div className="m-4 border rounded-xl border-neutral-800 animate-pulse">
      <div className="p-4 grid grid-cols-[60px_1fr] gap-3">
        <div className="w-10 h-10 rounded-full bg-neutral-800" />
        <div className="flex flex-col gap-2 pt-1">
          <div className="h-3 bg-neutral-800 rounded w-1/4" />
          <div className="h-3 bg-neutral-800 rounded w-1/3" />
          <div className="h-4 bg-neutral-800 rounded w-3/4 mt-2" />
          <div className="h-4 bg-neutral-800 rounded w-1/2" />
          <div className="h-48 bg-neutral-800 rounded-xl mt-3" />
        </div>
      </div>
    </div>
  );
}
