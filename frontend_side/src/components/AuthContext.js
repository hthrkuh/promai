import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Create context
export const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setAuth(true);
        } else {
            setAuth(false);
        }
    }, [navigate]);

    const login = (token) => {
        localStorage.setItem("token", token);
        setAuth(true);
        navigate("/TrendingGIFs"); // Redirect to home or any other page
    };

    const logout = () => {
        localStorage.removeItem("token");
        setAuth(false);
        navigate("/auth"); // Redirect to login page
    };

    return (
        <AuthContext.Provider value={{ auth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
