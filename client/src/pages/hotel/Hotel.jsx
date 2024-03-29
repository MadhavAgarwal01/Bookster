import "./Hotel.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCircleArrowLeft,
    faCircleArrowRight,
    faCircleXmark,
    faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { parseISO } from "date-fns"
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Reserve from "../../components/reserve/Reserve";
import { useEffect } from "react";

const Hotel = () => {
    const location = useLocation().pathname;
    const id = location.split("/")[2];
    console.log("Hotel id: ", id)

    const [slideNumber, setSlideNumber] = useState(0);
    const [open, setOpen] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const navigate = useNavigate();

    const { data, loading, error, reFetch } = useFetch(`/hotels/find/${id}`);
    const { user, dispatch } = useContext(AuthContext);

    var storedState = JSON.parse(localStorage.getItem("state"));
    console.log("storedState date: ", storedState.date[0]);
    const options = storedState.options;
    const [date, setDate] = useState([{
        startDate: parseISO(storedState.date[0].startDate),
        endDate: parseISO(storedState.date[0].endDate)
    }]);

    const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
    function dayDifference(date1, date2) {
        const timeDiff = Math.abs(date2.getTime() - date1.getTime());
        const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
        return diffDays;
    }
    const days = dayDifference(date[0].endDate, date[0].startDate);
    console.log("hotel date: ", date);

    const handleOpen = (i) => {
        setSlideNumber(i);
        setOpen(true);
    };

    const handleMove = (direction) => {
        let newSlideNumber;
        if (direction === "l") {
            newSlideNumber = (slideNumber - 1) % data.photos.length
        } else {
            newSlideNumber = (slideNumber + 1) % data.photos.length
        }
        setSlideNumber(newSlideNumber)
    };

    const handleClick = async () => {
        if (user) {
            setOpenModal(true);
        } else {
            try {
                dispatch({ type: "CUR_LOC", payload: location });
                navigate("/login")
            } catch (err) {
                console.log(err);
            }
        }
    };

    return (
        <div>
            <Navbar />
            <Header type="list" />
            {loading ? "Loading, please wait..." :
                <div className="hotelContainer">
                    {open && (
                        <div className="slider">
                            <FontAwesomeIcon
                                icon={faCircleXmark}
                                className="close"
                                onClick={() => setOpen(false)}
                            />
                            <FontAwesomeIcon
                                icon={faCircleArrowLeft}
                                className="arrow"
                                onClick={() => handleMove("l")}
                            />
                            <div className="sliderWrapper">
                                <img src={data.photos[slideNumber]} alt="" className="sliderImg" />
                            </div>
                            <FontAwesomeIcon
                                icon={faCircleArrowRight}
                                className="arrow"
                                onClick={() => handleMove("r")}
                            />
                        </div>
                    )}
                    <div className="hotelWrapper">
                        <button onClick={handleClick} className="bookNow">Reserve or Book Now!</button>
                        <h1 className="hotelTitle">{data.name}</h1>
                        <div className="hotelAddress">
                            <FontAwesomeIcon icon={faLocationDot} />
                            <span>{data.address}</span>
                        </div>
                        <span className="hotelDistance">
                            Excellent location – {data.distance}m from center
                        </span>
                        <span className="hotelPriceHighlight">
                            Book a stay over ${data.cheapestPrice} at this property and get a free airport taxi
                        </span>
                        <div className="hotelImages">
                            {data.photos?.map((photo, i) => (
                                <div className="hotelImgWrapper" key={i}>
                                    <img
                                        onClick={() => handleOpen(i)}
                                        src={photo}
                                        alt=""
                                        className="hotelImg"
                                    />
                                </div>
                            ))}
                        </div>
                        <div className="hotelDetails">
                            <div className="hotelDetailsTexts">
                                <h1 className="hotelTitle">{data.title}</h1>
                                <p className="hotelDesc">{data.desc}</p>
                            </div>
                            <div className="hotelDetailsPrice">
                                <h1>Perfect for a {days}-night stay!</h1>
                                <span>
                                    Located in the real heart of Krakow, this property has an
                                    excellent location score of 9.8!
                                </span>
                                <h2>
                                    <b>${days * data.cheapestPrice * options.room}</b> ({days} nights)
                                </h2>
                                <button onClick={handleClick}>Reserve or Book Now!</button>
                            </div>
                        </div>
                        {openModal && <Reserve setOpen={setOpenModal} hotelData={data} con_date={date} />}
                    </div>
                    <MailList />
                    <Footer />
                </div>}
        </div>
    );
};

export default Hotel;