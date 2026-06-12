import { getUsersLinks } from "@/lib/db";
import LinksGrid from "./links-grid";

export default async function UsersLink({ profileUserId, currentUserId }) {
  const links = getUsersLinks(profileUserId);

  return <LinksGrid links={links} currentUserId={currentUserId} />;
}
