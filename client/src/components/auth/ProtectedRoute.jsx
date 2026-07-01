import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Loader from "../Loader/Loader";

export default function ProtectedRoute({ children }) {
  const { user, authLoading } = useAuth();

  // const token = localStorage.getItem("token");

  if (authLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader text="Loading..." />
      </div>
    );
  }
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
