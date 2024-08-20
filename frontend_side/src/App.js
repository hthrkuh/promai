import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";

import Toast from "./components/Toast";
import HomePage from "./components/homePage";
import TrendingGIFs from "./components/TrendingGIFs";
import Auth from "./components/Auth";
import Success from "./components/Success";
import { AuthProvider } from "./components/AuthContext"; // Import AuthProvider
import ProtectedRoute from "./components/ProtectedRoute"; // Import ProtectedRoute
import Header from "./components/header";

function App() {
    return (
        <div className="container-fluid">
            <Toast />
            <Router>
                <AuthProvider>
                    <div>
                        <Header />
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route
                                path="/TrendingGIFs"
                                element={
                                    <ProtectedRoute
                                        element={<TrendingGIFs />}
                                    />
                                }
                            />
                            <Route path="/success" element={<Success />} />
                            <Route path="/auth" element={<Auth />} />
                        </Routes>
                    </div>
                </AuthProvider>
            </Router>
        </div>
    );
}

export default App;
