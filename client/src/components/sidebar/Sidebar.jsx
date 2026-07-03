import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
    Upload,
    FileText,
    BrainCircuit,
    History,
    User,
    Settings,
    LogOut,
    LayoutDashboardIcon,
    X,
    Sparkles
} from "lucide-react";

const navItems = [
    {
        label: "Dashboard",
        href: "/",
        icon: LayoutDashboardIcon,
    },
    {
        label: "Upload Resume",
        href: "/#upload",
        icon: Upload,
    },
    {
        label: "My Resumes",
        href: "/myresumes",
        icon: FileText,
    },
    {
        label: "AI Analysis",
        href: "/analysis-history",
        icon: BrainCircuit,
    },
    {
        label: "History",
        href: "/#resumes",
        icon: History,
    },
    // {
    //     label: "Profile",
    //     href: "/#profile",
    //     icon: User,
    // },
    // {
    //     label: "Settings",
    //     href: "/#settings",
    //     icon: Settings,
    // },
];

export default function Sidebar({ isOpen, onClose, onLogout }) {
  const location = useLocation();

  // Helper to check if item is active
  const isActive = (item) => {
    if (item.href === "/") {
      return location.pathname === "/";
    }
    return location.pathname + location.hash === item.href;
  };

  const sidebarContent = (
    <div className="flex flex-col h-full bg-slate-900 text-slate-300">
      {/* Brand Logo & Name */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-slate-800">
        <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-blue-600 flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/20">
          <Sparkles className="h-4.5 w-4.5" />
        </div>
        <div>
          <span className="text-base font-bold tracking-tight text-white block">
            ResumeAI
          </span>
          <span className="text-xs block text-slate-500 font-medium">ATS Analyzer v1.0</span>
        </div>
        {/* Mobile Close Button */}
        <button
          onClick={onClose}
          className="ml-auto p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white lg:hidden transition"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
        {navItems.map((item) => {
          const active = isActive(item);
          return (
            <Link
              key={item.label}
              to={item.href}
              onClick={onClose}
              className={`relative flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-semibold transition-all group ${
                active
                  ? "text-white"
                  : "text-slate-400 hover:bg-slate-800/40 hover:text-slate-200"
              }`}
            >
              {/* Active Background Pill (Framer Motion) */}
              {active && (
                <motion.div
                  layoutId="activeNavIndicator"
                  className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-indigo-700 rounded-xl -z-10 shadow-lg shadow-indigo-600/10"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}

              {/* Left Active Line Indicator */}
              {active && (
                <div className="absolute left-0 top-3 bottom-3 w-1 bg-white rounded-r-md" />
              )}

              <item.icon className={`h-5 w-5 transition-transform duration-200 group-hover:scale-105 ${
                active ? "text-white" : "text-slate-400 group-hover:text-slate-300"
              }`} />
              
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logout Button Footer */}
      <div className="p-4 border-t border-slate-800">
        <button
          type="button"
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-rose-400 hover:bg-rose-950/20 hover:text-rose-300 transition group cursor-pointer"
        >
          <LogOut className="h-5 w-5 transition-transform duration-200 group-hover:-translate-x-1" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-sm lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Desktop Sidebar (Permanent) */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-72 border-r border-slate-200 lg:block">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 left-0 z-50 flex w-72 flex-col lg:hidden shadow-2xl"
          >
            {sidebarContent}
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
