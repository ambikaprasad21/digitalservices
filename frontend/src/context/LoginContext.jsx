import { createContext, useContext, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { API_URL } from "../utility/constant";

const LoginContext = createContext();

export function LoginContextProvider({ children }) {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = async (password) => {
    try {
      const response = await axios.post(
        `${API_URL}/admin/login`,
        { password },
        {
          withCredentials: true,
        }
      );

      const userData = response.data;
      setUser(userData.user);
      localStorage.setItem("user", JSON.stringify(userData.user));
      return userData;
    } catch (error) {
      console.error("Login failed:", error);
      throw new Error(error.response?.data?.message || "Failed to log in.");
    }
  };

  const logout = async () => {
    try {
      await axios.post(`${API_URL}/admin/logout`, null, {
        withCredentials: true,
      });

      setUser(null);
      localStorage.removeItem("user");
      toast.success("Loged out successfully");
    } catch (error) {
      console.error("Logout failed:", error);
      throw new Error(error.response?.data?.message || "Failed to log out.");
    }
  };

  const isLoggedIn = () => !!user;

  return (
    <LoginContext.Provider value={{ user, login, logout, isLoggedIn }}>
      {children}
    </LoginContext.Provider>
  );
}

function useLogin() {
  const context = useContext(LoginContext);
  if (context === undefined) {
    throw new Error("UserContext used outside the UserProvider");
  }

  return context;
}

export { LoginContext, useLogin };
