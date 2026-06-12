import { unstable_cache } from "next/cache";
import { getLinkById, getLinks, isUpvoted } from "./db";

export const getCachedLinks = unstable_cache(
  async (currentUserId, category, sortBy) => {
    await new Promise((r) => setTimeout(r, 2000));
    const links = getLinks({ category, sortBy });

    return links.map((link) => ({
      ...link,
      hasUpvoted: currentUserId ? isUpvoted(currentUserId, link.id) : false,
    }));
  },
  ["links"],
  { tags: ["links"], revalidate: 60 },
);

export const getCachedLink = unstable_cache(
  async (id, currentUserId) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const link = getLinkById(id);
    if (!link) return null;

    return {
      ...link,
      hasUpvoted: currentUserId ? isUpvoted(currentUserId, link.id) : false,
    };
  },
  ["link"],
  { tags: ["links"], revalidate: 60 },
);
