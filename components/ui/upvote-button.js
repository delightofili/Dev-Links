"use client";

import { useState } from "react";
import { ArrowUp } from "lucide-react";
import { upvoteLink } from "@/app/action";

export default function UpvoteButton({ linkId, initialVotes, hasUpvoted }) {
  const [upVotes, setUpVotes] = useState(initialVotes);
  const [isVoted, setIsvoted] = useState(hasUpvoted);

  function handleVoteChange() {
    if (isVoted) {
      setUpVotes(upVotes - 1);
      setIsvoted(false);
    } else {
      setUpVotes(upVotes + 1);
      setIsvoted(true);
    }
  }

  return (
    <form
      action={upvoteLink}
      onClick={(e) => e.stopPropagation()}
      className="flex flex-col items-center"
    >
      <button
        onClick={handleVoteChange}
        type="submit"
        name="linkId"
        value={linkId}
        className={`flex flex-col items-center justify-center w-full aspect-square border ${isVoted ? "border-green-500 text-green-500" : "border-neutral-800 text-neutral-400"}  rounded-xl hover:bg-green-500/10 hover:border-green-500/40  hover:text-green-400 transition-colors cursor-pointer group-hover:border-neutral-800`}
      >
        <ArrowUp
          className={`w-5 h-5 stroke-[2.5] ${isVoted ? "text-green-500" : "text-neutral-400"}`}
        />
      </button>
      <span
        className={`text-sm font-semibold  ${isVoted ? "text-green-500" : "text-neutral-300"} mt-2 tracking-wide`}
      >
        {upVotes}
      </span>
    </form>
  );
}
