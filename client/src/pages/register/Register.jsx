import axios from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Countdown from "react-countdown";
import "./Register.css";

const Register = () => {
    const [credentials, setCredentials] = useState({
        username: undefined,
        password: undefined,
        email: undefined,
        phone: undefined,
        city: undefined,
        country: undefined
    });

    var { loading, error, dispatch, redirectTo } = useContext(AuthContext);
    if (redirectTo === undefined || redirectTo === null) redirectTo = "/";

    const [status, setStatus] = useState(false);
    const navigate = useNavigate()
    const handleChange = (e) => {
        setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("/auth/register", credentials);
            console.log("Res: ", res.data);
            console.log("Register RedirectTo: ", redirectTo);
            setStatus(true);

        } catch (err) {
            dispatch({ type: "REGISTER_FAILURE", payload: err });
            console.log("Reloading in 3 secs")
        }
    };


    return (
        <div className="register">
            <div className="rContainer">
                <div className="registerPage">
                    <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
                        <h1 >Bookster</h1>
                    </Link>
                </div>
                <div className="registerItem">
                    <span>Username : </span>
                    <input
                        type="text"
                        placeholder="Username"
                        id="username"
                        onChange={handleChange}
                        className="rInput"
                    />
                </div>
                <div className="registerItem">
                    <span>Password : </span>
                    <input
                        type="password"
                        placeholder="Password"
                        id="password"
                        onChange={handleChange}
                        className="rInput"
                    />
                </div>
                <div className="registerItem">
                    <span>Phone : </span>
                    <input
                        type="number"
                        placeholder="Phone"
                        id="phone"
                        onChange={handleChange}
                        className="rInput"
                    />
                </div>
                <div className="registerItem">
                    <span>Email : </span>
                    <input
                        type="email"
                        placeholder="Email"
                        id="email"
                        onChange={handleChange}
                        className="rInput"
                    />
                </div>
                <div className="registerItem">
                    <span>City : </span>
                    <input
                        type="text"
                        placeholder="City"
                        id="city"
                        onChange={handleChange}
                        className="rInput"
                    />
                </div>
                <div className="registerItem">
                    <span>Country : </span>
                    <input
                        type="text"
                        placeholder="Country"
                        id="country"
                        onChange={handleChange}
                        className="rInput"
                    />
                </div>
                <button disabled={loading} onClick={handleClick} className="rButton">
                    SIGN UP
                </button>
                <div className="loginLink" onClick={() => { navigate("/login") }}>{status ? "Account created successfully! " : "Existing user? "} <span> Login here</span></div>
                {error ?
                    <div className="errorBlock">
                        <span>{error?.response?.data?.message} | </span>
                        <Countdown
                            date={Date.now() + 5000}
                            intervalDelay={0}
                            precision={0.1}
                            renderer={props => <div>Reloading in..... {props.seconds}s</div>}
                            onComplete={() => { window.location.reload(true) }}
                        />
                    </div>
                    : <span>&nbsp;</span>}
            </div>
        </div>
    );
};

export default Register;