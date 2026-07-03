import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "../components/sidebar/Sidebar";
import Navbar from "../components/navbar/Navbar";

export default function Layout({ children }) {
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const [user] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem("user")) || {};
        } catch {
            return {};
        }
    });

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };

    return (
        <div className="min-h-screen bg-slate-50/50 flex">
            {/* Sidebar (Desktop and Mobile Drawer) */}
            <Sidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
                onLogout={handleLogout}
            />

            {/* Main Section */}
            <div className="flex-1 flex flex-col min-h-screen lg:pl-72">
                {/* Navbar (Sticky top) */}
                <Navbar
                    user={user}
                    onMenuClick={() => setIsSidebarOpen(true)}
                />

                {/* Page Content with Framer Motion page transition */}
                <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8 overflow-y-auto">
                    <div className="mx-auto max-w-7xl">
                        <AnimatePresence mode="wait">
                            <motion.div
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -15 }}
                                transition={{ duration: 0.35, ease: "easeOut" }}
                            >
                                {children}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </main>
            </div>
        </div>
    );
}