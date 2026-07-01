export default function Navbar({ user, onMenuClick }) {
  const displayName = user?.fname || user?.name || "User";
  const initials = displayName
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onMenuClick}
            aria-label="Open sidebar"
            className="grid h-10 w-10 place-items-center rounded-md border border-slate-200 text-slate-700 lg:hidden"
          >
            <span className="h-0.5 w-5 bg-current shadow-[0_6px_0_current,0_-6px_0_current]" />
          </button>

          <div className="grid h-10 w-10 place-items-center rounded-lg bg-teal-600 font-bold text-white">
            AI
          </div>
          <div>
            <p className="text-base font-semibold text-slate-950">AI Resume Analyzer</p>
            <p className="text-xs text-slate-500">Resume upload workspace</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden text-sm font-medium text-slate-700 sm:inline">{displayName}</span>
          <div className="grid h-10 w-10 place-items-center rounded-full bg-slate-900 text-sm font-semibold text-white">
            {initials || "U"}
          </div>
        </div>
      </div>
    </header>
  );
}
