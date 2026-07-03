import { Menu, Bell, Search, Sparkles } from "lucide-react";

export default function Navbar({ user, onMenuClick }) {
  const displayName = user?.fname || user?.name || "User";
  const initials = displayName
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/70 backdrop-blur-md">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left Section: Mobile Menu Trigger & Logo */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={onMenuClick}
            aria-label="Open sidebar"
            className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 lg:hidden transition cursor-pointer"
          >
            <Menu className="h-5 w-5" />
          </button>

          {/* Small Logo for Tablet/Mobile */}
          <div className="flex items-center gap-2 lg:hidden">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-blue-600 flex items-center justify-center font-bold text-white shadow-md shadow-indigo-500/20">
              <Sparkles className="h-4.5 w-4.5" />
            </div>
            <span className="text-sm font-bold tracking-tight text-slate-900">ResumeAI</span>
          </div>
        </div>

        {/* Middle Section: Elegant Search Bar (Vercel/Linear Style) */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Search className="h-4 w-4" />
            </span>
            <input
              type="text"
              placeholder="Search resumes or analysis reports..."
              className="pl-9 pr-4 py-2 block w-full rounded-xl border border-slate-200/85 bg-slate-50/50 text-xs focus:outline-none focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/5 transition"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <kbd className="inline-flex items-center gap-0.5 rounded border border-slate-200 bg-white px-1.5 font-sans text-[10px] font-medium text-slate-400">
                ⌘K
              </kbd>
            </div>
          </div>
        </div>

        {/* Right Section: Notifications and User Avatar */}
        <div className="flex items-center gap-4">
          {/* Notification Button */}
          <button className="relative p-2 rounded-xl text-slate-500 hover:bg-slate-50 transition cursor-pointer">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1.5 right-1.5 h-2.5 w-2.5 rounded-full bg-indigo-600 ring-2 ring-white" />
          </button>

          {/* User Details */}
          <div className="flex items-center gap-3 pl-3 border-l border-slate-200">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-slate-800 leading-none">{displayName}</p>
              <p className="text-[11px] font-medium text-slate-400 mt-1">Free Tier Account</p>
            </div>

            {/* Profile Avatar Card */}
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-slate-800 to-slate-900 border border-slate-700/10 flex items-center justify-center text-xs font-bold text-white shadow-sm">
              {initials || "U"}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
