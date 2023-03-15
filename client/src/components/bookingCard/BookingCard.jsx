import "./BookingCard.css"
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { format } from "date-fns"
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import useFetch from "../../hooks/useFetch";
import axios from "axios";

function BookingCard({ data }) {

    const booking = data.booking;
    const hotelData = data.hotelData;
    const cancelCallback = data.cancelCallback;

    console.log("booking : ", booking)
    console.log("hotelData : ", hotelData)
    // console.log("hotelID : ", data.hotelId)


    const rooms = booking.roomId.length;
    const date = booking.date;
    const startDate = new Date(date[0]);
    const endDate = new Date(date[date.length - 1]);

    // const cancelCallback = async () => {

    // }

    return (
        <div className="hotelCard">
            <div className="imgFeatures">
                <img
                    src={hotelData.photos[0]}
                    alt=""
                    className="bookImg"
                />
                <span className="bookFeatures">{hotelData.desc}</span>
            </div>
            <div className="bookDesc">
                <div className="hotelPerks">
                    <h1 className="bookTitle">{hotelData.name}</h1>
                    <span className="bookDistance">{hotelData.distance}m from {hotelData.city} center</span>
                    <span className="bookTaxiOp">Free airport taxi</span>
                    <span className="bookSubtitle">
                        Studio Apartment with Air conditioning
                    </span>
                </div>
                <div className="bookCancelPolicy">
                    <span className="bookCancelOp">Free cancellation </span>
                    <span className="bookCancelOpSubtitle">
                        You can cancel later, so lock in this great price today!
                    </span>
                </div>
                <div className="selOptions">
                    <div className="editDate">
                        <FontAwesomeIcon icon={faCalendarDays} className="bookIcon" />
                        <span className="bookText">
                            {`${format(startDate, "dd/MM/yyy")} to ${format(endDate, "dd/MM/yyy")}`}
                        </span>
                    </div>
                    <span>Rooms: {rooms}</span>
                </div>
            </div>
            <div className="bookDetails">
                {hotelData.rating || <div className="bookRating">
                    <div className="ratingReviews">
                        <span>Excellent</span>
                        <p>66 reviews</p>
                    </div>
                    <button>{hotelData.rating || 9.6}</button>
                </div>}
                <div className="bookDetailTexts">
                    <div className="costCard">
                        <span className="siPrice">${booking.price}</span>
                    </div>
                    <span className="bookTaxOp">Includes taxes & fees</span>
                    <button onClick={() => { cancelCallback(booking._id) }} className="bookCheckButton">Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default BookingCard;