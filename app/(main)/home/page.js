import LinkPosts from "@/components/links/link-posts";
import { LinkItemSkeleton } from "@/components/links/link-skeleton";
import { getCurrentUser } from "@/lib/auth";
import { Suspense } from "react";

export default async function HomePage() {
  const user = await getCurrentUser();
  return (
    <div>
      <Suspense fallback={<LinkItemSkeleton />}>
        <LinkPosts currentUserId={user?.id} />
      </Suspense>
    </div>
  );
}
