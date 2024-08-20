import { jwtDecode } from "jwt-decode";
import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Create context
export const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(false);
    const [user, setUser] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setAuth(true);
            const decodedToken = jwtDecode(token);
            setUser(decodedToken);
        } else {
            setAuth(false);
            setUser({});
        }
    }, []);

    const login = (token) => {
        localStorage.setItem("token", token);
        setAuth(true);
        const decodedToken = jwtDecode(token);
        setUser(decodedToken);
        navigate("/TrendingGIFs"); // Redirect to home or any other page
    };

    const logout = () => {
        localStorage.removeItem("token");
        setAuth(false);
        setUser({});
        navigate("/auth"); // Redirect to login page
    };

    return (
        <AuthContext.Provider value={{ auth, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
