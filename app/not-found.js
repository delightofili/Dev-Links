import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 bg-black">
      <h1 className="text-white text-4xl font-bold">⚠️ | 404</h1>
      <h2 className="text-white text-2xl font-bold">Page not found</h2>
      <p className="text-neutral-400 text-center max-w-md">
        The page you are looking for does not exist or has been removed.
      </p>
      <Link
        href="/"
        className="bg-green-700 text-white px-6 py-2 rounded-full text-sm hover:bg-green-600 transition"
      >
        Go home
      </Link>
    </div>
  );
}
