"use client";

import Modal from "@/components/ui/modal";
import { useRouter } from "next/navigation";
import { MoveRight } from "lucide-react";

import { useActionState, useEffect, useState } from "react";
import { submitLink } from "@/app/action";
import { useToast } from "@/lib/context/toast-context";

export default function PostModal() {
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [state, formAction, pending] = useActionState(submitLink, null);
  const router = useRouter();
  const { setToast } = useToast();

  useEffect(() => {
    if (state?.success) {
      setToast({
        message: "Link submitted successfully",
        type: "success",
      });
      router.back();
    }
  }, [state, setToast, router]);

  const handleKeyDown = (e) => {
    if (e.key === "," || e.key === "Enter") {
      e.preventDefault();

      const cleanTag = tagInput.trim().replace(/,/g, "");

      if (cleanTag && tags.length < 5 && !tags.includes(cleanTag)) {
        setTags([...tags, cleanTag]);
        setTagInput("");
      }
    }
  };
  return (
    <Modal className="no-scrollbar">
      <div className="relative p-5 ">
        <button
          onClick={() => router.back()}
          className="absolute cursor-pointer top-0 right-3 text-2xl text-white/60"
        >
          x
        </button>
        <h1 className="text-green-500 text-2xl mb-2">Submit a Link</h1>
        <p className="text-white/60 mb-3">
          Share something valueable with the community
        </p>
        {state?.error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-3 rounded-xl mb-4">
            {state.error}
          </div>
        )}
        <form action={formAction} className="flex flex-col space-y-3">
          <div className="flex flex-col gap-y-2 w-full max-w-md">
            <label
              htmlFor="category"
              className="text-xs font-semibold text-neutral-400 uppercase tracking-wider"
            >
              Type
            </label>
            <div className="group relative w-full flex items-center">
              <select
                id="category"
                name="category"
                defaultValue=""
                className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2.5 text-sm text-neutral-200 focus:outline-none focus:border-green-500 cursor-pointer appearance-none"
              >
                <option value="" disabled hidden>
                  Select a Category
                </option>
                <option value="article">Article</option>
                <option value="tutorial">Tutorial</option>
                <option value="job">Job</option>
              </select>

              <div className="absolute right-3 pointer-events-none text-neutral-500 group-focus-within:text-green-500 transition-colors">
                <svg
                  className="h-4 w-4 stroke-[2.5]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </div>
            </div>
          </div>
          {/* TITLE */}
          <div className="flex flex-col gap-y-2 w-full max-w-md">
            <label
              htmlFor="title"
              className="text-xs font-semibold text-neutral-400 uppercase tracking-wider"
            >
              Title
            </label>
            <div className="group relative w-full flex items-center">
              <input
                type="text"
                name="title"
                placeholder="e.g. An open source CLI to boost Productivity"
                className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2.5 text-sm text-neutral-200 focus:outline-none focus:border-green-500 "
              />
            </div>
          </div>
          {/* URL */}
          <div className="flex flex-col gap-y-2 w-full max-w-md">
            <label
              htmlFor="url"
              className="text-xs font-semibold text-neutral-400 uppercase tracking-wider"
            >
              Url
            </label>
            <div className="group relative w-full flex items-center">
              <input
                id="url"
                type="text"
                name="url"
                placeholder="https://example.com"
                className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2.5 text-sm text-neutral-200 focus:outline-none focus:border-green-500 "
              />
            </div>
          </div>
          {/* DESCRIPTION */}
          <div className="flex flex-col gap-y-2 w-full max-w-md">
            <label
              htmlFor="description"
              className="text-xs font-semibold text-neutral-400 uppercase tracking-wider"
            >
              Description
            </label>
            <div className="group relative w-full flex items-center">
              <textarea
                id="description"
                type="text"
                name="description"
                placeholder="Describe what this link is about"
                className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2.5 text-sm text-neutral-200 focus:outline-none focus:border-green-500 "
              />
            </div>
          </div>
          {/* Tags */}
          <div className="flex flex-col gap-y-2 w-full max-w-md">
            <label
              htmlFor="tags"
              className="text-xs font-semibold text-neutral-400 uppercase tracking-wider"
            >
              Tags
            </label>
            <div className="flex flex-wrap gap-2 items-center w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 focus-within:border-green-500 transition-colors min-h-[44px]">
              {tags.map((tag, index) => (
                <span key={index}>
                  #{tag}
                  <button
                    type="button"
                    onClick={() => setTags(tags.filter((_, i) => i !== index))}
                    className="hover:text-green-300 font-bold cursor-pointer ml-0.5"
                  >
                    ×
                  </button>
                </span>
              ))}
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={
                  tags.length === 0
                    ? "Add up to 5 tags (press comma or enter)"
                    : ""
                }
                className="flex-1 bg-transparent text-sm text-neutral-200 outline-none min-w-30 "
              />
              <input type="hidden" name="tags" value={tags.join(",")} />
              <div className="flex gap-2 items-center">
                <div className="flex gap-2 items-center">
                  <p className="text-green-500">{tags.length}/5</p>
                  <p className="text-neutral-400">tags</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex w-full items-end justify-end">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => router.back()}
                className="border  text-neutral-500 border-neutral-700 cursor-pointer py-1.5 px-4 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={pending}
                className="border gap-4 flex font-pold relative text-neutral-900 bg-green-500 border-neutral-700/20 py-1.5 px-4 rounded-lg"
              >
                {pending ? "Submiting..." : "Submit"}{" "}
                <MoveRight className="font-bold" />
              </button>
            </div>
          </div>
        </form>
      </div>
    </Modal>
  );
}
