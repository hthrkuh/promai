import React from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ element, requiredRole }) => {
    const token = localStorage.getItem("token");

    if (!token) {
        return <Navigate to="/auth" />;
    }

    try {
        const decodedToken = jwtDecode(token);

        // Check if the user's role matches the required role
        if (requiredRole !== undefined && decodedToken.role !== requiredRole) {
            return <Navigate to="/" />;
        }

        return element;
    } catch (error) {
        console.error("Invalid token:", error);
        return <Navigate to="/auth" />;
    }
};

export default ProtectedRoute;
