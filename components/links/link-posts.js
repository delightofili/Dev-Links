import { getCurrentUser } from "@/lib/auth";
import LinksGrid from "./links-grid";
import { getCachedLinks } from "@/lib/queries";

export default async function LinkPosts() {
  const user = await getCurrentUser();
  const links = await getCachedLinks(user?.id);

  return <LinksGrid links={links} currentUserId={user?.id} />;
}
