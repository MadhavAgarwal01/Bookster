import axios from "axios";
import { useContext, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./UserBookings.css";
import Navbar from "../../components/navbar/Navbar";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import useFetch from "../../hooks/useFetch";
import BookingCard from "../../components/bookingCard/BookingCard";
import { useEffect } from "react";
import SearchItem from "../../components/searchItem/SearchItem";

const UserBooking = () => {

    const navigate = useNavigate();
    var { user } = useContext(AuthContext);
    var { data, loading, error, reFetch } = useFetch(`/booking/${user._id}`);

    const [bookings, setBookings] = useState([]);

    const combineData = () => {
        if (!loading) {
            data.map(async (bookingItem) => {
                await axios.get(`/hotels/find/${bookingItem.hotelId}`)
                    .then((res) => {
                        const item = {
                            booking: bookingItem,
                            hotelData: res.data,
                            cancelCallback: deleteBooking
                        }
                        setBookings(bookings => [...bookings, item]);
                        console.log("bookings:", bookings)
                    })
                    .catch((err) => {
                        console.log("Error in fetching hotelData : ", err);
                    })
            })
        }
    }
    useEffect(() => {
        console.log("Data : ", data);
        setBookings([]);
        combineData();
    }, [data.length]);

    const deleteBooking = async (bookingID) => {
        console.log('Delete button clicked for: ', bookingID);

        // delete sequence
        axios.delete(`/booking/${user._id}/${bookingID}`)
            .then((res) => {
                // Refresh sequence
                console.log("Deleted res: ", res.data);
                setBookings([]);
                reFetch();
            })
            .catch((err) => {
                console.log("Delete error: ", err);
            })
    }

    try {
        return (
            <div>
                <Navbar type="userPage" />
                <div className="fakeHeader"></div>
                <div className="userBookingsPage">
                    <div className="bookingsContainer">
                        <h2>My Bookings</h2>
                        <div className="userBookings">
                            {
                                loading ?
                                    "loading"
                                    :
                                    <>
                                        {bookings.map((item) => (
                                            <BookingCard
                                                key={item._id}
                                                data={item}
                                                mode="booking_details"
                                            />
                                        ))}
                                    </>
                            }
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

export default UserBooking;