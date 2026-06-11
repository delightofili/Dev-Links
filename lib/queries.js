import { unstable_cache } from "next/cache";
import { getLinks, isUpvoted } from "./db";

export const getCachedLinks = unstable_cache(
  async (currentUserId) => {
    await new Promise((r) => setTimeout(r, 2000));
    const links = getLinks();

    return links.map((link) => ({
      ...link,
      hasUpvoted: currentUserId ? isUpvoted(currentUserId, link.id) : false,
    }));
  },
  ["links"],
  { tags: ["links"], revalidate: 60 },
);

export async function getLinkWithInteraction(currentUserId) {
  const links = db.prepare("SELECT * FROM links ORDER BY id DESC").all();

  return links.map((link) => ({
    ...link,
    hasUpvoted: currentUserId ? isUpvoted(currentUserId, link.id) : false,
  }));
}
