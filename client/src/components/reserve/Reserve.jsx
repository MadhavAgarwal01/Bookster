import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import "./Reserve.css";
import useFetch from "../../hooks/useFetch";
import { useContext, useState } from "react";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { DateRange } from "react-date-range";
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { format } from "date-fns"

const Reserve = ({ setOpen, hotelData, con_date }) => {

    console.log("con_date: ", con_date)
    const hotelId = hotelData._id;
    const navigate = useNavigate();
    var { user } = useContext(AuthContext);

    const [selectedRooms, setSelectedRooms] = useState([]);
    const { data, loading, error } = useFetch(`/hotels/rooms/${hotelId}`);
    const [date, setDate] = useState(con_date);
    const [openDate, setOpenDate] = useState(false);

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
            // console.log("selectedRooms.length : ", selectedRooms.length)
            if (selectedRooms.length < 1) return;

            setOpen(false);
            navigate("/payment", { state: { selectedRooms, date, hotelData } });

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

                    <div className="editDates">
                        <div className="rHeading">
                            <span>Check-in - Check-out:</span>
                        </div>
                        <span onClick={() => { setOpenDate(!openDate) }}>
                            {`${format(date[0].startDate, "dd/MM/yyy")} to ${format(date[0].endDate, "dd/MM/yyy")}`}
                        </span>
                        {openDate &&
                            <DateRange
                                editableDateInputs={true}
                                onChange={(item) => setDate([item.selection])}
                                moveRangeOnFirstSelection={false}
                                ranges={[{ ...date[0], key: 'selection' }]}
                                minDate={new Date()}
                                className="reserveDates"
                            />}
                    </div>

                    {data.map((item) => (
                        <div className="rItem" key={item._id} >
                            <div className="rItemInfo">
                                <div className="rTitle">{item.title}</div>
                                <div className="rDesc">{item.desc}</div>
                                <div className="rMax">
                                    Max people: {item.maxPeople}
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