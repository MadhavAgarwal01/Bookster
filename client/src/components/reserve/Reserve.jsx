import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

import "./Reserve.css";
import useFetch from "../../hooks/useFetch";
import { useContext, useState } from "react";
import { SearchContext } from "../../context/SearchContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Reserve = ({ setOpen, hotelId }) => {
    const [selectedRooms, setSelectedRooms] = useState([]);
    const { data, loading, error } = useFetch(`/hotels/rooms/${hotelId}`);
    const { date } = useContext(SearchContext);

    const getDateInRange = (startDate, endDate) => {
        const start = new Date(startDate);
        const end = new Date(endDate).getTime();
        const sdate = new Date(start.getTime());
        const dateArray = [];

        while (sdate <= end) {
            dateArray.push(new Date(sdate).getTime());
            sdate.setDate(sdate.getDate() + 1);
            // console.log(sdate.getDate());
        }
        return dateArray;
    };

    const alldate = getDateInRange(date[0].startDate, date[0].endDate);
    // console.log("DateRange: ", alldate);

    const isAvailable = (roomNumber) => {
        // console.log("roomNumber.unavailableDates : ", roomNumber.unavailableDates);
        const isFound = roomNumber.unavailableDates.some((day) =>
            alldate.includes(new Date(day).getTime())
        );
        return !isFound;
    };

    const handleSelect = (e) => {
        const checked = e.target.checked;
        const value = e.target.value;
        setSelectedRooms(
            checked
                ? [...selectedRooms, value]
                : selectedRooms.filter((item) => item !== value)
        );
    };

    const navigate = useNavigate();
    const handleClick = async () => {
        try {
            await Promise.all(
                selectedRooms.map((roomId) => {

                    console.log("All date:", alldate);

                    const res = axios.put(`/rooms/availability/${roomId}`, {
                        date: alldate,
                    });
                    console.log("Selected!", res.data);
                    return res.data;
                })
            );
            setOpen(false);
            // navigate("/");

        } catch (err) {
            console.log(err);
        }
    };
    return (
        <div className="reserve">
            <div className="rContainer">
                <FontAwesomeIcon
                    icon={faCircleXmark}
                    className="rClose"
                    onClick={() => setOpen(false)}
                />
                <span>Select your rooms:</span>
                {data.map((item) => (
                    <div className="rItem" key={item._id} >
                        <div className="rItemInfo">
                            <div className="rTitle">{item.title}</div>
                            <div className="rDesc">{item.desc}</div>
                            <div className="rMax">
                                Max people: <b>{item.maxPeople}</b>
                            </div>
                            <div className="rPrice">${item.price}</div>
                        </div>
                        <div className="rSelectRooms">
                            {item.roomNumbers.map((roomNumber, i) => (
                                <div className="room" key={i}>
                                    <label>{roomNumber.number}</label><input
                                        type="checkbox"
                                        value={roomNumber._id}
                                        onChange={handleSelect}
                                        disabled={!isAvailable(roomNumber)} />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
                <button onClick={handleClick} className="rButton">
                    Reserve Now!
                </button>
            </div>
        </div>
    );
};

export default Reserve;