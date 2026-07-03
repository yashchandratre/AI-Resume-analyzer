import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import WelcomeSection from "../../components/dashboard/WelcomeSection";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import ResumeUploadCard from "../../components/upload/ResumeUploadCard";
import MyResumes from "./MyResumes";
import API from "../../services/authapi";
import { toast } from "sonner";

export default function Dashboard() {
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const [analysisResult, setAnalysisResult] = useState([]);
    const [resumes, setResumes] = useState([]);

    const [user] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem("user")) || {};
        } catch {
            return {};
        }
    });

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
        }
    }, []);

    const fetchResumes = useCallback(async () => {
        try {
            const response = await API.get("/resume/resumes", { withCredentials: true });
            setResumes(response.data.resumes);
        } catch (error) {
            console.error("Error fetching resumes:", error);
            setResumes([]);
        }
    }, []);


    // const onAnalyzeResume = async (resumeId) => {
    //     try {
    //         const response = await API.get(`/analysis/analysisresult/${resumeId}`, { withCredentials: true });
    //         console.log(response.data);

    //         if (!response.data.length != 0 && response.data.some(result => result.resume === resumeId)) {
    //             navigate(`/analysis/${resumeId}`,);
    //         } else {
    //             toast.error("This resume has already been analyzed. Redirecting to the analysis result page.");
    //             navigate(`/allanalysis/${resumeId}`,);
    //         }
    //     } catch (error) {
    //         console.log("FULL ERROR");
    //         console.error(error);
    //     }
    // };
    const onAnalyzeResume = async (resumeId) => {
        try {
            navigate(`/analysis/${resumeId}`);
        } catch (error) {
            console.error(error);
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
        <>
        <section id="wellcome-section">
            <WelcomeSection user={user} resumes={resumes} />
        </section>
        <section id="upload">
            <ResumeUploadCard onUploadSuccess={fetchResumes} />
        </section>
            <MyResumes resumes={resumes} onAnalyze={onAnalyzeResume} onDelete={onDeleteResume} />
        </>
    );
}
