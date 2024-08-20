import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { Link } from "react-router-dom";
import "./style/Header.css"; // Import CSS file

export default function Header() {
    const { auth, logout } = useContext(AuthContext);

    return (
        <header>
            <div className="header-container">
                <div className="left-side">
                    <div className="logo">
                        <img src="/logo.png" alt="logo" />
                    </div>
                    <span className="title">
                        <span style={{ color: "yellow" }}>Made with </span>
                        <span style={{ color: "red" }}>♥</span> by{" "}
                        <span style={{ color: "white" }}>Yair levi</span>
                    </span>
                </div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/TrendingGIFs">Trending GIFs</Link>
                        </li>
                    </ul>
                </nav>
                <div className="right-side">
                    {auth ? (
                        <button onClick={logout}>Logout</button>
                    ) : (
                        <Link to="/auth">Login</Link>
                    )}
                </div>
            </div>
        </header>
    );
}
