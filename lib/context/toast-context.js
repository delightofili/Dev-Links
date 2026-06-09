"use client";

import { createContext, useContext, useEffect, useState } from "react";

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      setToast(null);

      return () => clearTimeout(timer);
    }, 3000);
  }, [toast]);

  return (
    <ToastContext.Provider value={{ toast, setToast }}>
      {children}

      {toast && (
        <div className="fixed top-5 right-5 bg-neutral-900 border border-green-500/30 rounded-xl p-4 z-9999 animate-in slide-in-from-right fade-in duration-300">
          <p className="text-sm font-semibold text-white">{toast.message}</p>
        </div>
      )}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be within ToastProvider");
  }
  return context;
}
