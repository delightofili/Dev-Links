// components/layouts/MainLayout.jsx
import LinkHeader from "@/components/links/link-header";
import SideBar from "@/components/sidebar/side-bar";
import { getCurrentUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function MainLayout({ children, modal }) {
  const user = await getCurrentUser();
  return (
    <div className="min-h-screen bg-black text-neutral-200 font-sans antialiased flex justify-center selection:bg-green-500/20 selection:text-green-400">
      <div className="w-full max-w-[1300px] grid grid-cols-[auto_1fr] px-2 sm:px-4">
        {/* Left Side: Clean Sidebar */}
        <SideBar user={user} />

        {/* Right Side: Scrollable App View Feed */}
        <main className="min-w-0 w-full pl-6 pr-2 py-6">
          <LinkHeader />
          <div className="w-full min-h-[calc(100vh-3rem)]">
            {children}
            {modal}
          </div>
        </main>
      </div>
    </div>
  );
}
