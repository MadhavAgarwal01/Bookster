import "./Payment.css";
import axios from "axios";
import { useContext, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Navbar from "../../components/navbar/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import useFetch from "../../hooks/useFetch";
import { DateRange } from "react-date-range";
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { format } from "date-fns"
import BookingCard from "../../components/bookingCard/BookingCard";

const Payment = () => {

    const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
    function dayDifference(date1, date2) {
        const timeDiff = Math.abs(date2.getTime() - date1.getTime());
        const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
        return diffDays;
    }

    const getDateInRange = (startDate, endDate) => {
        const start = new Date(startDate);
        const end = new Date(endDate).getTime();
        const sdate = new Date(start.getTime());
        const dateArray = [];

        while (sdate <= end) {
            dateArray.push(new Date(sdate));
            sdate.setDate(sdate.getDate() + 1);
            // console.log(sdate.getDate());
        }
        return dateArray;
    };

    var { user, redirectTo } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const details = location.state;
    const hotelData = details.hotelData;
    const [status, setStatus] = useState(false);
    const [date, setDate] = useState(details.date);

    const alldate = getDateInRange(date[0].startDate, date[0].endDate);
    const days = dayDifference(date[0].endDate, date[0].startDate);
    const rooms = details.selectedRooms.length;
    const cost = days * hotelData.cheapestPrice * rooms;
    const mode = "hotel_details"
    // console.log("Payments :", details);
    // console.log("alldate :", alldate);
    const bookingInfo = {
        userId: user._id,
        hotelId: hotelData._id,
        roomId: details.selectedRooms,
        date: alldate,
        price: cost
    };

    const handleCheckout = async (e) => {
        e.preventDefault();
        try {
            console.log("BookingInfo : ", bookingInfo);

            axios.post(`/booking/${user._id}`, bookingInfo)
                .then((res) => {
                    console.log(res.data);
                    setStatus(!status);
                })
                .catch((err) => {
                    console.log("[Frontend] Booking err:", err);
                })

        } catch (err) {
            console.log(err);
        }
    };

    const backToHotel = (bookingID) => {
        navigate(`/hotels/${hotelData._id}`)
    }

    try {
        return (
            <div>
                <Navbar type="userPage" />
                <div className="fakeHeader"></div>
                <div className="payment">
                    <div className="paymentContainer">
                        <div className="bookingDetails">
                            <h2>Checkout</h2>
                            <BookingCard
                                data={{
                                    booking: bookingInfo,
                                    hotelData: hotelData,
                                    cancelCallback: backToHotel
                                }}
                                mode={mode}
                            />
                        </div>
                        <div className="paymentDetails">
                            <div className="paymentCard">
                                <h1>Total</h1>
                                <div className="priceDiv">
                                    <h1>${cost}</h1>
                                    <span>Includes taxes & fees</span>
                                </div>
                                <button onClick={handleCheckout} className="checkoutButton">
                                    CHECKOUT
                                </button>
                                {status && <span className="bookSuccessUpdate"><FontAwesomeIcon icon={faCheckCircle} /> Booked successfully!</span>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    } catch (err) {
        console.log(err)
    }
};

export default Payment;