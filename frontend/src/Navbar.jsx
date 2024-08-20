import { Link } from "react-router-dom";
import { useAuth, logout } from "./auth.jsx";

function LoggedInLinks() {
    return(
        <div className="collapse navbar-collapse" id="navbarNav">
            <li className="nav-item">
                <Link className="nav-link active" to="/">Home</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link active" to="/create_recipe">Create Recipes</Link>
            </li>
            <li className="nav-item">
                <a
                    className="nav-link active"
                    href="#"
                    onClick={() => logout()}
                >
                    Logout
                </a>
            </li>
        </div>
    );
}

function LoggedOutLinks() {
    return(
        <div className="collapse navbar-collapse" id="navbarNav">
            <li className="nav-item">
                <Link className="nav-link active" to="/">Home</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link active" to="/signup">Sign Up</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link active" to="/login">Login</Link>
            </li>
        </div>
    );
}

function NavBar() {
    const [loggedIn] = useAuth();
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Recipes</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        {loggedIn ? <LoggedInLinks /> : <LoggedOutLinks />}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;
