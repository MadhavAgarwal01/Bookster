import "./Navbar.css"
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

function Navbar() {

    const { user, loading, error, dispatch } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    console.log(location)

    const logoutBtn = async () => {
        dispatch({ type: "LOGOUT" });
    }

    const loginBtn = async () => {
        try {
            dispatch({ type: "CUR_LOC", payload: location.pathname });
            navigate("/login")
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="navbar">
            <div className="navContainer">
                <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
                    <h2 className="logo">Bookster</h2>
                </Link>
                {user ?
                    <div className="loggedIn">
                        <span className="userName">Welcome {user.username}!</span>
                        <button onClick={logoutBtn} className="navButton">Logout</button>
                    </div>
                    :
                    <div className="navItems">
                        <button onClick={() => { navigate("/register") }} className="navButton">Register</button>
                        <button onClick={loginBtn} className="navButton">Login</button>
                    </div>}
            </div>
        </div>
    );
}

export default Navbar;