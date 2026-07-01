import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import WelcomeSection from "../../components/dashboard/WelcomeSection";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import ResumeUploadCard from "../../components/upload/ResumeUploadCard";
import MyResumes from "./MyResumes";
import API from "../../services/authapi";

export default function Dashboard() {
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

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
        }
    }, []);
    const [resumes, setResumes] = useState([]);

    const fetchResumes = useCallback(async () => {
        try {
            const response = await API.get("/resume/resumes", { withCredentials: true });
            setResumes(response.data.resumes);
        } catch (error) {
            console.error("Error fetching resumes:", error);
            setResumes([]);
        }
    }, []);

    const onAnalyzeResume = async (resumeId) => {
        try {
            
            navigate(`/analysis/${resumeId}`,);
        } catch (error) {
            console.log("FULL ERROR");

            console.log(error);
            console.log(stack);
            console.log(error.response);
            console.log(error.request);
            console.log(error.message);
        }
    };

    const onDeleteResume = async (resumeId) => {
        try {
            await API.delete(`/resume/${resumeId}`, { withCredentials: true });
            setResumes((prevResumes) => prevResumes.filter((resume) => resume._id !== resumeId));
        } catch (error) {
            console.error("Error deleting resume:", error);
        }
    };
    useEffect(() => {
        const timerId = window.setTimeout(() => {
            fetchResumes();
        }, 0);

        return () => window.clearTimeout(timerId);
    }, [fetchResumes]);

    return (
        <div className="min-h-screen bg-slate-100 text-slate-950">
            <div className="flex min-h-screen">
                <Sidebar
                    isOpen={isSidebarOpen}
                    onClose={() => setIsSidebarOpen(false)}
                    onLogout={handleLogout}
                />

                <div className="flex min-w-0 flex-1 flex-col">
                    <Navbar user={user} onMenuClick={() => setIsSidebarOpen(true)} />

                    <main className="flex-1 px-4 py-8 sm:px-6 lg:px-8">
                        <WelcomeSection user={user} />
                        <ResumeUploadCard onUploadSuccess={fetchResumes} />
                        <MyResumes resumes={resumes} onAnalyze={onAnalyzeResume} onDelete={onDeleteResume} />
                    </main>
                </div>
            </div>
        </div>
    );
}
