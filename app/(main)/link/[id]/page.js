import { getLinkById } from "@/lib/db";
import { getCachedLink } from "@/lib/queries";
import { getCurrentUser } from "@/lib/auth";
import { notFound } from "next/navigation";
import { ExternalLink, MessageSquare, ArrowLeft } from "lucide-react";
import Link from "next/link";
import UpvoteButton from "@/components/ui/upvote-button";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const link = getLinkById(id);

  if (!link) {
    return { title: "Link not found | DevLinks" };
  }

  const snippet = link.description
    ? `${link.description.slice(0, 60)}...`
    : "Resource details";

  return {
    title: `"${link.title}" by @${link.username} | DevLinks`,
    description: snippet,
    openGraph: {
      title: `${link.title} - Shared by ${link.name}`,
      description: snippet,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: link.title,
      description: snippet,
    },
  };
}

export const revalidate = 60;

export default async function SingleLinkPage({ params }) {
  const { id } = await params;
  const user = await getCurrentUser();

  const link = await getCachedLink(id, user?.id);

  if (!link) {
    notFound();
  }

  const tagsArray = link.tags ? link.tags.split(",").map((t) => t.trim()) : [];

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-8 space-y-6">
      <Link
        href="/home"
        className="inline-flex items-center gap-x-2 text-xs font-semibold uppercase tracking-wider text-neutral-500 hover:text-green-400 transition-colors group mb-2"
      >
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        Back to community feed
      </Link>

      <article className="grid grid-cols-[48px_1fr] gap-x-5 w-full bg-neutral-950 border border-neutral-900 rounded-2xl p-6 shadow-xl shadow-black/40">
        <div className="flex flex-col items-center">
          <UpvoteButton
            key={`${link.id}-${link.hasUpvoted}`}
            linkId={link.id}
            initialVotes={link.upvotes_count}
            hasUpvoted={link.hasUpvoted}
          />
        </div>

        {/* RIGHT COMPONENT COLUMN: DETAILS AND DESCRIPTION TEXT */}
        <div className="flex flex-col space-y-4">
          {/* USER PROFILE INFO STRIP */}
          <div className="flex items-center gap-x-2">
            <div className="w-6 h-6 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-[10px] font-bold text-green-400 uppercase">
              {link.username?.slice(0, 2)}
            </div>
            <span className="text-sm font-medium text-neutral-200">
              {link.name}
            </span>
            <span className="text-xs text-neutral-500">@{link.username}</span>
          </div>

          {/* HEADLINE AND LINK URL */}
          <div>
            <h1 className="text-2xl font-black text-neutral-100 tracking-tight leading-snug">
              {link.title}
            </h1>
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-x-1.5 text-xs text-green-400 hover:text-green-300 transition-colors font-mono mt-2 bg-green-500/5 border border-green-500/10 px-3 py-1.5 rounded-lg cursor-pointer"
            >
              {link.url}
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* POST DESCRIPTION BODY */}
          <p className="text-base text-neutral-300 leading-relaxed max-w-prose whitespace-pre-wrap pt-2">
            {link.description}
          </p>

          {/* TAG BADGES ARRAYS */}
          <div className="flex flex-wrap gap-2 pt-2">
            <span className="text-xs font-bold uppercase tracking-widest bg-neutral-900 text-green-400 border border-neutral-800 px-3 py-1.5 rounded-lg">
              {link.category}
            </span>

            {tagsArray.map((tag, idx) => (
              <span
                key={idx}
                className="text-xs font-medium bg-green-500/5 border border-green-500/10 text-green-400/80 px-3 py-1.5 rounded-lg hover:bg-green-500/10 transition-colors"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </article>

      <hr className="border-neutral-900/80 my-8" />

      {/* DISCUSSIONS FORUM ZONE */}
      <section className="space-y-6">
        <div className="flex items-center gap-x-2 text-neutral-400 font-bold text-sm">
          <MessageSquare className="w-5 h-5 text-green-500" />
          <h2>Discussion Forum (Coming Next)</h2>
        </div>

        <div className="border border-dashed border-neutral-800/80 rounded-xl p-8 text-center text-sm text-neutral-600 font-mono">
          [Comment input system layout placeholder container]
        </div>
      </section>
    </div>
  );
}
