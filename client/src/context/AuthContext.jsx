import React, {
  createContext,
  useState,
  useCallback,
  useEffect,
  useContext,
} from "react";
import { jwtDecode } from "jwt-decode";
import { toast } from "sonner";
import API from "../services/authapi";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  //RESTORE AUTH ON PAGE REFRESH

  useEffect(() => {
    const restoreAuth = () => {
      const token = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");

      if (!token || !storedUser) {
        setAuthLoading(false);
        return;
      }

      try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decoded.exp < currentTime) {
          console.log("Token expired");
          toast.error("Session Expired",{
            description:"Your Session is Expired Please Login Again!"
          })
          localStorage.clear();
          setUser(null);
        } else {
          setUser(JSON.parse(storedUser));
        }
      } catch (err) {
        console.log("Token decode failed");
        localStorage.clear();
        setUser(null);
      }

      setAuthLoading(false);
    };

    restoreAuth();
  }, []);

//   const login = async (credentials) => {
//     try {
//       const response = await AuthAPI.post("login/", credentials);

//       const { access, refresh, user } = response.data;

//       // Save tokens
//       localStorage.setItem("access", access);
//       localStorage.setItem("refresh", refresh);
//       localStorage.setItem("user", JSON.stringify(user));

//       setUser(user);

//       return user;
//     } catch (error) {
//       throw error;
//     }
//   };

//   //Register
//   const register = useCallback(async (userData) => {
//     try {
//       console.log("USer DATA ", userData);

//       await AuthAPI.post("signup/", userData);
//       setError(null);
//       // redirect to login after signup
//     } catch (error) {
//       setError("Registration failed");
//       throw error;
//     }
//   }, []);

  //LOGOUT

  const logout = useCallback(async () => {
    try {
      await API.post("logout/");
      console.log("Logout Success full");
    } catch (error) {
      console.log("Logout API failed");
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setUser(null);
      setError(null);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        error,
        authLoading,
        logout,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
