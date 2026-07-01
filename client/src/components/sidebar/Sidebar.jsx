import { Link } from "react-router-dom";

const navItems = [
  { label: "Dashboard", href: "/dashboard" },
  // { label: "Upload Resume", href: "/upload", active: true },
  // { label: "Resume History", href: "/history", disabled: true },
  // { label: "Settings", href: "/settings", disabled: true },
];

export default function Sidebar({ isOpen, onClose, onLogout }) {
  return (
    <>
      {isOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={onClose}
          className="fixed inset-0 z-30 bg-slate-950/40 lg:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-72 max-h-screen flex-col border-r border-slate-200 bg-white px-4 py-5 transition-transform duration-200 lg:static lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center gap-3 px-2 pb-6 lg:hidden">
          <div className="grid h-10 w-10 place-items-center rounded-lg bg-teal-600 font-bold text-white">
            AI
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-950">AI Resume Analyzer</p>
            <p className="text-xs text-slate-500">Dashboard</p>
          </div>
        </div>

        <nav className="flex flex-1 flex-col gap-1">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              aria-disabled={item.disabled}
              onClick={onClose}
              className={`rounded-md px-3 py-2.5 text-sm font-medium transition ${
                item.active
                  ? "bg-teal-50 text-teal-700 ring-1 ring-inset ring-teal-100"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
              } ${item.disabled ? "cursor-not-allowed opacity-60" : ""}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          onClick={onLogout}
          className="rounded-md px-3 py-2.5 text-left text-sm font-medium text-red-600 transition hover:bg-red-50"
        >
          Logout
        </button>
      </aside>
    </>
  );
}
