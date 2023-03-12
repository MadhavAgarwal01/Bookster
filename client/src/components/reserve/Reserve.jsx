import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import "./Reserve.css";
import useFetch from "../../hooks/useFetch";
import { useContext, useState } from "react";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Reserve = ({ setOpen, hotelData, date }) => {

    const hotelId = hotelData._id;
    const navigate = useNavigate();
    var { user } = useContext(AuthContext);

    const [selectedRooms, setSelectedRooms] = useState([]);
    const { data, loading, error } = useFetch(`/hotels/rooms/${hotelId}`);

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

    const handleClick = async () => {
        try {
            // await Promise.all(
            //     selectedRooms.map((roomId) => {

            //         console.log("All date:", alldate);
            //         console.log("room ID: ", roomId);
            //         console.log("user ID: ", user._id);

            //         const res = axios.put(`/rooms/availability/${roomId}`, {
            //             date: alldate,
            //         });
            //         console.log("Selected!", res.data);
            //         return res.data;
            //     })
            // );

            navigate("/payment", { state: { selectedRooms, date, hotelData } });
            setOpen(false);

        } catch (err) {
            console.log(err);
        }
    };
    return (
        <div className="reserve">
            <div className="roomContainer">
                <FontAwesomeIcon
                    icon={faCircleXmark}
                    className="rClose"
                    onClick={() => setOpen(false)}
                />
                <div className="roomDetails">
                    <div className="rHeading">
                        <span>Select your rooms:</span>
                    </div>
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
                    <div className="bookBTN">
                        <button onClick={handleClick} className="resButton">
                            Reserve Now!
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Reserve;