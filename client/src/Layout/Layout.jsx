import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
        <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-indigo-50">

            {/* Sidebar */}
            <Sidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
                onLogout={handleLogout}
            />

            {/* Main Section */}
            <div className="lg:ml-72 flex min-h-screen flex-col">

                {/* Navbar */}
                <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/80 backdrop-blur-md">
                    <Navbar
                        user={user}
                        onMenuClick={() => setIsSidebarOpen(true)}
                    />
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto">
                    <div className="mx-auto max-w-7xl px-6 py-8">

                        {children}

                    </div>
                </main>

            </div>
        </div>
    );
}