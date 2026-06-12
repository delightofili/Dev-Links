import UsersLink from "@/components/links/users-link";
import { getCurrentUser } from "@/lib/auth";
import { getUserByUsername } from "@/lib/db";
import { notFound } from "next/navigation";
import { Edit2 } from "lucide-react";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { username } = await params;
  const user = await getUserByUsername(username);

  if (!user) return { title: "User not found" };

  const snippet = user.bio || `Check out ${user.name}'s profile on DevLinks`;
  return {
    title: `${user.name} (@${user.username})`,
    description: snippet,
    openGraph: {
      title: `${user.name}`,
      description: snippet,
      type: "profile",
    },
  };
}

export default async function ProfilePage({ params }) {
  const { username } = await params;
  const user = await getUserByUsername(username);
  const currentUser = await getCurrentUser();

  if (!user) notFound();

  const isOwnProfile = currentUser?.id === user.id;

  return (
    <div className="flex-1 flex text-white min-h-screen bg-black">
      {/* Main Center Content Arena */}
      <div className="flex-1 p-6 md:p-10 space-y-8 border-r border-neutral-900 max-w-4xl">
        <header className="flex items-center justify-between pb-2">
          <h2 className="text-2xl font-extrabold tracking-tighter text-white uppercase">
            User Profile
          </h2>
        </header>

        {/* 1. Profile Info Box -> Vertically stacked to keep metrics beneath info */}
        <div className="w-full bg-neutral-950 border border-neutral-900 rounded-3xl p-6 md:p-8 flex flex-col gap-y-6 relative overflow-hidden">
          {/* Top Row Group: Avatar + Identity Context */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 w-full">
            {/* Large Initial Avatar Sphere */}
            <div className="h-28 w-28 md:h-32 md:w-32 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-5xl font-black text-neutral-500 shrink-0 select-none shadow-xl">
              {user.name.charAt(0).toUpperCase()}
            </div>

            {/* User Details Block */}
            <div className="flex flex-col space-y-2 flex-1 text-center sm:text-left min-w-0 pr-0 sm:pr-24">
              <h1 className="text-3xl font-black text-green-500 tracking-tight leading-none">
                {user.name}
              </h1>
              <p className="text-md font-mono text-neutral-400">
                @{user.username}
              </p>
              <p className="text-sm text-neutral-400 leading-relaxed mt-2">
                {user.bio ||
                  "Full-Stack Developer | Open Source Contributor. Keep on building!"}
              </p>
            </div>
          </div>

          {/* 🔒 Authorization Edit Button: Anchored absolute top right corner */}
          {isOwnProfile && (
            <button className="sm:absolute sm:top-8 sm:right-8 w-full sm:w-auto inline-flex items-center justify-center gap-x-2 px-4 py-2.5 text-xs font-semibold text-neutral-200 bg-neutral-900 border border-neutral-800 rounded-xl hover:bg-neutral-800 hover:text-white hover:border-neutral-700 transition-all duration-150 shadow-md">
              <Edit2 className="w-3.5 h-3.5 text-neutral-400" />
              Edit Profile
            </button>
          )}

          {/* Bottom Row Group: Platform Metrics running edge-to-edge underneath */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-neutral-900/60 w-full">
            <div className="bg-neutral-900/60 border border-neutral-800/80 rounded-2xl p-4 text-center flex flex-col justify-center">
              <span className="text-2xl md:text-3xl font-black text-green-400 font-mono tracking-tight">
                12.4k
              </span>
              <span className="block text-[10px] font-bold text-neutral-500 uppercase tracking-wider mt-1">
                Karma
              </span>
            </div>
            <div className="bg-neutral-900/60 border border-neutral-800/80 rounded-2xl p-4 text-center flex flex-col justify-center">
              <span className="text-2xl md:text-3xl font-black text-white font-mono tracking-tight">
                743
              </span>
              <span className="block text-[10px] font-bold text-neutral-500 uppercase tracking-wider mt-1">
                Links
              </span>
            </div>
            <div className="bg-neutral-900/60 border border-neutral-800/80 rounded-2xl p-4 text-center flex flex-col justify-center">
              <span className="text-2xl md:text-3xl font-black text-green-400 font-mono tracking-tight">
                2.1k
              </span>
              <span className="block text-[10px] font-bold text-neutral-500 uppercase tracking-wider mt-1">
                Upvotes
              </span>
            </div>
          </div>
        </div>

        {/* 2. Submissions Navigation Row */}
        <div className="w-full border-b border-neutral-900 overflow-x-auto scrollbar-none pt-2">
          <div className="flex gap-x-6 md:gap-x-8 text-xs font-bold tracking-wider">
            {["SUBMISSIONS", "UPVOTED", "COMMENTS", "BOOKMARKS"].map((tab) => {
              const isActive = tab === "SUBMISSIONS";
              return (
                <button
                  key={tab}
                  className={`pb-4 border-b-2 transition-all duration-150 whitespace-nowrap ${
                    isActive
                      ? "border-green-500 text-green-400"
                      : "border-transparent text-neutral-500 hover:text-neutral-300"
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. Dynamic Post Feed Insertion */}
        <div className="w-full flex flex-col gap-y-4 pt-2">
          <UsersLink
            profileUserId={user.id}
            currentUserId={currentUser?.id || null}
          />
        </div>
      </div>

      {/* Right Sidebar - Latest Global Activity Panel */}
      <aside className="w-80 p-10 flex flex-col space-y-6 shrink-0 lg:block hidden">
        <h3 className="text-xl font-extrabold tracking-tighter text-white uppercase">
          Latest Activity
        </h3>
        <div className="flex flex-col gap-y-3">
          {[
            {
              title: "Building Scalable APIs with Node.js",
              time: "1 year ago",
            },
            { title: "React State Management in 2024", time: "2 minutes ago" },
            { title: "Fire Engiuating Sombining apps", time: "1 post ago" },
            {
              title: "Designing with Tailwind to written nordas",
              time: "2 months ago",
            },
            { title: "Next.js 14 Guide in 2024", time: "2 months ago" },
            { title: "SQL Performance Tips...", time: "2 months ago" },
            { title: "Vite vs. Webpack", time: "2 months ago" },
          ].map((activity, index) => (
            <div
              key={index}
              className="flex gap-4 p-4 rounded-xl bg-neutral-900/30 border border-neutral-900 hover:border-neutral-800 transition-all cursor-pointer"
            >
              <div className="h-9 w-9 rounded-lg bg-neutral-950 border border-neutral-800 flex items-center justify-center shrink-0">
                <span className="text-xs text-neutral-600 font-mono">
                  &lt;/&gt;
                </span>
              </div>
              <div className="flex flex-col min-w-0 justify-center">
                <span className="text-sm font-semibold text-neutral-200 truncate pr-2">
                  {activity.title}
                </span>
                <span className="text-[11px] text-neutral-500 mt-0.5">
                  {activity.time}
                </span>
              </div>
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
}
