import "./Navbar.css"
import "./Navbar_res.css"
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCoffee } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const Navbar = (props) => {

    const { user, loading, error, dispatch } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [menu, setMenu] = useState(false);

    const logoutBtn = async () => {
        console.log("User : ", user);
        if (props.type === "userPage") navigate("/");
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
    const registerBtn = async () => {
        try {
            dispatch({ type: "CUR_LOC", payload: location.pathname });
            navigate("/register")
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
                    <div className="navItems">
                        <span className="userName">Welcome {user.username}!</span>
                        <FontAwesomeIcon className="faIcon" icon={faBars} onClick={() => { setMenu(!menu) }} />
                        {menu && <div className="verifiedOptions">
                            <button onClick={logoutBtn} className="optionButton">Logout</button>
                            <button onClick={() => { navigate("/account") }} className="optionButton">Account</button>
                            <button onClick={() => { navigate("/bookings") }} className="optionButton">My Bookings</button>
                        </div>}
                    </div>
                    :
                    <div className="navItems">
                        <button onClick={registerBtn} className="navButton">Register</button>
                        <button onClick={loginBtn} className="navButton">Login</button>
                    </div>}
            </div>
        </div>
    );
}

export default Navbar;