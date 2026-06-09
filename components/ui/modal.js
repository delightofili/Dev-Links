"use client";

import { useRouter } from "next/navigation";

export default function Modal({ children }) {
  const router = useRouter();

  return (
    <div
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
      onClick={() => router.back()}
    >
      <div
        className="bg-black border-3 border-green-700 rounded-2xl max-w-xl w-full max-h-[80vh] overflow-y-auto p-2"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
