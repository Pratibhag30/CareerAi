import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode"; 
import * as authService from "../services/authServices.js";
import toast from "react-hot-toast";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // App load hone pe token/user check
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (token && storedUser) {
      try {
        const decoded = jwtDecode(token); //  decode JWT
        if (decoded.exp * 1000 < Date.now()) {
          handleLogout(); // token expired
        } else {
          setUser(JSON.parse(storedUser)); // set state → Sidebar rerender
        }
      } catch (err) {
        handleLogout(); // invalid token
      }
    }
  }, []);

  // Login function
  const handleLogin = async (loginData) => {
    const res = await authService.login(loginData); // call backend
    setUser(res.user); // update state → Sidebar rerender
  };

  // Logout function
  const handleLogout = () => {
    authService.logout(); // remove localStorage
    setUser(null);        //  update state → Sidebar rerender
    toast.success("User logout from CareerAI")
  };

  return (
    <AuthContext.Provider value={{ user, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};
