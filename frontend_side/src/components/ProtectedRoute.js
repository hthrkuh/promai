import { Navigate } from "react-router-dom";

// This component wraps around the protected route
const ProtectedRoute = ({ element }) => {
    const token = localStorage.getItem("token");

    // Redirect to login if not authenticated
    return token ? element : <Navigate to="/auth" />;
};

export default ProtectedRoute;
