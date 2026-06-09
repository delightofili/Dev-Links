// components/layouts/MainLayout.jsx
import LinkHeader from "@/components/links/link-header";
import SideBar from "@/components/sidebar/side-bar";

export default function MainLayout({ children, modal }) {
  return (
    // Pure black background for true developer dark mode
    <div className="min-h-screen bg-black text-neutral-200 font-sans antialiased flex justify-center selection:bg-green-500/20 selection:text-green-400">
      {/* 2-Column Core Architecture */}
      <div className="w-full max-w-[1300px] grid grid-cols-[auto_1fr] px-2 sm:px-4">
        {/* Left Side: Clean Sidebar */}
        <SideBar />

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
