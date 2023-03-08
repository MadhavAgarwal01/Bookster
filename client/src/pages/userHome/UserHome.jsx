import axios from "axios";
import { useContext, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./UserHome.css";
import Navbar from "../../components/navbar/Navbar";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import useFetch from "../../hooks/useFetch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

const UserHome = () => {
    const [details, setDetails] = useState({
        username: undefined,
        password: undefined,
        email: undefined,
        phone: undefined,
        city: undefined,
        country: undefined
    });

    var { user, loading, error, dispatch, redirectTo } = useContext(AuthContext);
    const navigate = useNavigate();
    var { data, loading, reFetch } = useFetch(`/users/${user._id}`);
    const [tab, setTab] = useState(0);
    const [status, setStatus] = useState(false);
    const [allowDelete, setAllowDelete] = useState(false);

    const handleChange = (e) => {
        setDetails((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const updateDetals = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.put(`/users/${user._id}`, details);
            console.log("Update Res: ", res.data);
            setStatus(true);
            reFetch();
        } catch (err) {
            console.log("Update Error: ", err);
        }
    };

    const deleteAccount = async () => {
        try {
            const res = await axios.delete(`/users/${user._id}`);
            dispatch({ type: "LOGOUT" });
            navigate("/");
        } catch (error) {
            console.log("Error: ", error);
        }
    }

    try {
        return (
            <div>
                <Navbar type="userPage" />
                <div className="fakeHeader"></div>
                <div className="UserHome">
                    <div className="userHomeContainer">
                        <div className="userOptions">
                            <div onClick={() => { setTab(0); setStatus(false) }} className="tabOption">Update Details</div>
                            <div onClick={() => { setTab(1); setStatus(false) }} className="tabOption">Delete Account</div>
                        </div>
                        <div className="tabsContainer">
                            {tab === 0 && <div className="updateDetailsTab">
                                <h2>Update Details</h2>
                                <div className="UserHomeItem">
                                    <span>Username : </span>
                                    <input
                                        type="text"
                                        placeholder={data.username}
                                        id="username"
                                        onChange={handleChange}
                                        className="rInput"
                                    />
                                </div>
                                <div className="UserHomeItem">
                                    <span>Phone : </span>
                                    <input
                                        type="number"
                                        placeholder={data.phone}
                                        id="phone"
                                        onChange={handleChange}
                                        className="rInput"
                                    />
                                </div>
                                <div className="UserHomeItem">
                                    <span>Email : </span>
                                    <input
                                        type="email"
                                        placeholder={data.email}
                                        id="email"
                                        onChange={handleChange}
                                        className="rInput"
                                    />
                                </div>
                                <div className="UserHomeItem">
                                    <span>City : </span>
                                    <input
                                        type="text"
                                        placeholder={data.city}
                                        id="city"
                                        onChange={handleChange}
                                        className="rInput"
                                    />
                                </div>
                                <div className="UserHomeItem">
                                    <span>Country : </span>
                                    <input
                                        type="text"
                                        placeholder={data.country}
                                        id="country"
                                        onChange={handleChange}
                                        className="rInput"
                                    />
                                </div>
                                <div className="btns">
                                    <button disabled={loading}
                                        onClick={() => { window.location.reload(true) }}
                                        className="userButton">
                                        RESET
                                    </button>
                                    <button disabled={loading} onClick={updateDetals} className="userButton">
                                        UPDATE DETAILS
                                    </button>
                                </div>
                                {status && <span className="successUpdate"><FontAwesomeIcon icon={faCheckCircle} /> Details updated sucessfully</span>}
                            </div>}
                            {tab === 1 && <div className="deleteAccountTab">
                                <h2>Permanently delete your account</h2>
                                <div className="intentionalDelete">
                                    <input
                                        type="checkbox"
                                        value={false}
                                        onChange={() => { setAllowDelete(!allowDelete) }} />
                                    <p>This action cannot be undone. We are not responsible for loss of any information pertaining to the user account post account deletion.</p>
                                </div>
                                <button disabled={!allowDelete} onClick={deleteAccount} className="userButton">
                                    Delete Account
                                </button>
                            </div>}
                        </div>
                    </div>
                    <MailList />
                    <Footer />
                </div>
            </div>
        );
    } catch (err) {
        console.log(err)
    }
};

export default UserHome;