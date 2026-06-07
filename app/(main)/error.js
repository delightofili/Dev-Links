"use client";
export default function Error({ error, reset }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-100 gap-4">
      <div className="text-red-500 text-5xl">⚠️</div>
      <h2 className="text-white text-xl font-bold">Something went wrong</h2>
      <p className="text-neutral-400 text-sm text-center max-w-md">
        {error.message || "An unexpected error occurred"}
      </p>
      <button
        onClick={reset}
        className="bg-green-700 text-white px-6 py-2 rounded-full text-sm hover:bg-green-600 transition"
      >
        Try again
      </button>
    </div>
  );
}
