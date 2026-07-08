"use client";

import { SiDevbox } from "react-icons/si";
import { FiMail, FiLock } from "react-icons/fi";
import Link from "next/link";
import { useActionState, useState } from "react";
import { login } from "@/app/action";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useAuth } from "@/lib/context/auth-context";
import { useRouter } from "next/router";

export const dynamic = "force-static";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    // e.preventDefault() stops the browser's default form submission
    // which would reload the page

    setError("");
    setLoading(true);

    const formData = new FormData(e.target);
    // FormData reads all input values from the form element

    const email = formData.get("email");
    const password = formData.get("password");

    try {
      await login(email, password);
      // calls our auth context login function
      // which calls the backend, stores token, sets user

      router.push("/home");
      // navigate to home after successful login
    } catch (err) {
      setError(err.message);
      // show the error message from the API
    } finally {
      setLoading(false);
    }
  }

  function toogleShowPassword(e) {
    e.preventDefault();
    e.stopPropagation();
    setShowPassword(!showPassword);
  }

  return (
    <div className="w-full max-w-5xl py-6 px-10 bg-neutral-900 rounded-2xl grid grid-cols-1 md:grid-cols-2 gap-16 items-center border border-green-500/20 shadow-[0_0_40px_rgba(34,197,94,0.05)]">
      {/* LEFT SIDE: Brand & System Specs */}
      <div className="w-full flex flex-col gap-6 font-mono">
        <div>
          <h1 className="flex text-3xl font-bold text-green-500 gap-3 items-center tracking-wider drop-shadow-[0_0_8px_rgba(34,197,94,0.3)]">
            <SiDevbox className="h-8 w-8" /> DevLinks
          </h1>
          <p className="text-white/40 text-xs mt-1">
            Developer community. Share. Learn. Build.
          </p>
        </div>

        <div className="bg-neutral-950/60 p-4 rounded-xl border border-neutral-800 text-xs flex flex-col gap-2 text-neutral-400">
          <div className="flex justify-between border-b border-neutral-900 pb-1.5">
            <span className="text-green-500/70">&gt;_ security_gateway</span>
            <span className="text-neutral-600">v1.0.0</span>
          </div>
          <div className="flex justify-between">
            <span>• Encryption Protocol:</span>
            <span className="text-white font-sans font-medium">SSL/TLS</span>
          </div>
          <div className="flex justify-between">
            <span>• Session State:</span>
            <span className="text-white font-sans font-medium">
              Awaiting Token
            </span>
          </div>
        </div>

        <p className="text-white/40 text-xs leading-relaxed">
          <span className="text-green-500">&gt;</span> Connect with developers
          around the world, share high-performance utilities, and upvote
          terminal tools.
        </p>
      </div>

      {/* RIGHT SIDE: The Login Form */}
      <div>
        <div className="mb-5">
          <h1 className="text-xl font-bold text-white tracking-tight">
            Welcome back!
          </h1>
          <p className="text-white/40 text-xs mt-0.5">
            Login to continue your session
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
          {/* EMAIL INPUT WITH ICON */}
          <div className="flex items-center gap-3 bg-neutral-800 px-3 py-2.5 rounded-lg border border-neutral-700/80 focus-within:border-green-500 transition-colors">
            <FiMail className="text-neutral-500 text-lg flex-shrink-0" />
            <input
              name="email"
              type="email"
              placeholder="Email"
              className="bg-transparent text-white w-full focus:outline-none placeholder:text-neutral-500 text-sm"
            />
          </div>

          {/* PASSWORD INPUT WITH ICON */}
          <div className="flex items-center gap-3 bg-neutral-800 px-3 py-2.5 rounded-lg border border-neutral-700/80 focus-within:border-green-500 transition-colors">
            <FiLock className="text-neutral-500 text-lg flex-shrink-0" />
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="bg-transparent text-white w-full focus:outline-none placeholder:text-neutral-500 text-sm"
            />
            <button onClick={toogleShowPassword}>
              {showPassword ? (
                <FaRegEye className="text-green-500 text-lg flex-shrink-0 cursor-pointer" />
              ) : (
                <FaRegEyeSlash className="text-green-500 text-lg flex-shrink-0 cursor-pointer" />
              )}
            </button>
          </div>

          {state?.error && (
            <p className="text-red-500 text-xs font-mono mt-1">{state.error}</p>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="bg-green-500 text-neutral-950 font-bold py-2.5 px-4 rounded-lg disabled:opacity-50 cursor-pointer hover:bg-green-600 transition-colors text-sm shadow-[0_0_15px_rgba(34,197,94,0.15)] mt-2 tracking-wide font-mono"
          >
            {isPending ? "> AUTHENTICATING..." : "AUTHENTICATE"}
          </button>
        </form>

        <p className="text-neutral-400 text-xs mt-4">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="text-green-400 hover:text-green-500 underline underline-offset-4 font-medium"
          >
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}
