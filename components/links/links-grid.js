import LinkItem from "./link-item";

export default function LinksGrid({ currentUserId, links }) {
  if (!links || links.length === 0) {
    return (
      <p className="text-neutral-500 text-center p-8">
        No links yet. Be the first to post.
      </p>
    );
  }

  return (
    <>
      <ul className="grid grid-cols-1 gap-4 w-full">
        {links.map((link) => (
          <li key={`${link.id}-${link.hasUpvoted}`}>
            <LinkItem {...link} currentUserId={currentUserId} />
          </li>
        ))}
      </ul>
    </>
  );
}
