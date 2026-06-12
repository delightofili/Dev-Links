import LinkItem from "@/components/links/link-item";
import { getCachedLinks } from "@/lib/queries";

export default async function CategoryPage({ params }) {
  const { name } = await params;

  const links = await getCachedLinks(null, name, "new");

  return (
    <div className="flex flex-col gap-y-6 w-full max-w-2xl mx-auto py-8">
      {/* 2. Add a dynamic title so users know what category they are looking at */}
      <h1 className="text-2xl font-bold capitalize text-white tracking-tight">
        {name}{" "}
        <span className="text-neutral-500 font-normal text-lg">Feed</span>
      </h1>

      <div className="flex flex-col gap-y-4">
        {/* 3. Map over the filtered links just like your homepage does */}
        {links.length === 0 ? (
          <p className="text-neutral-500 text-sm">
            No links found in this category yet.
          </p>
        ) : (
          links.map((link) => <LinkItem key={link.id} {...link} />)
        )}
      </div>
    </div>
  );
}
