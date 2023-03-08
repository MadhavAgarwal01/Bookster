import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Countdown from "react-countdown";
import "./Login.css";

const Login = () => {
    const [credentials, setCredentials] = useState({
        username: undefined,
        password: undefined
    });

    var { loading, error, dispatch, redirectTo } = useContext(AuthContext);

    if (redirectTo === undefined || redirectTo === null) redirectTo = "/";
    console.log("redirectTo: ", redirectTo);
    const navigate = useNavigate()

    const handleChange = (e) => {
        setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const handleClick = async (e) => {
        e.preventDefault();
        dispatch({ type: "LOGIN_START" });
        try {
            const res = await axios.post("/auth/login", credentials);
            dispatch({ type: "LOGIN_SUCCESS", payload: { data: res.data.details, redirectTo: redirectTo } });

            console.log("RedirectTo: ", redirectTo);
            navigate(redirectTo)
        } catch (err) {
            dispatch({ type: "LOGIN_FAILURE", payload: err });
            console.log("reloading in 3 secs")
        }
    };


    return (
        <div className="login">
            <div className="lContainer">
                <div className="loginPage">
                    <h1>Bookster</h1>
                </div>
                <input
                    type="text"
                    placeholder="username"
                    id="username"
                    onChange={handleChange}
                    className="lInput"
                />
                <input
                    type="password"
                    placeholder="password"
                    id="password"
                    onChange={handleChange}
                    className="lInput"
                />
                <button disabled={loading} onClick={handleClick} className="lButton">
                    LOGIN
                </button>
                <div className="registerLink" onClick={() => { navigate("/register") }}>New user? <span>Register here</span></div>
                {error ?
                    <div className="errorBlock">
                        <span>{error?.response?.data?.message}</span>
                        <Countdown
                            date={Date.now() + 3000}
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

export default Login;