import { faCalendarDays } from "@fortawesome/free-regular-svg-icons";
import {
    faBed,
    faCar,
    faMountainCity,
    faPerson,
    faPlane,
    faTaxi,
} from "@fortawesome/free-solid-svg-icons";
import "./Header.css";
import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useContext } from "react";
import { DateRange } from "react-date-range";
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { format } from "date-fns"
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";

function Header({ type }) {
    const [destination, setDestination] = useState("");
    const [openDate, setOpenDate] = useState(false);
    const [date, setDate] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: "selection",
        },
    ]);
    const [openOptions, setOpenOptions] = useState(false);
    const [options, setOptions] = useState({
        adult: 1,
        children: 0,
        room: 1
    });
    const handleOption = (name, operation) => {
        setOptions((prev) => {
            return {
                ...prev,
                [name]: operation === "i" ? options[name] + 1 : options[name] - 1
            };
        });
    };
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const { dispatch } = useContext(SearchContext);

    const handleSearch = async () => {
        console.log({ destination, date, options });
        await dispatch({ type: "NEW_SEARCH", payload: { destination, date, options } });
        navigate("/hotels")
    };

    const handleClick = event => {
        document.getElementById("stays").classList.remove("active");
        document.getElementById("flights").classList.remove("active");
        document.getElementById("car_rentals").classList.remove("active");
        document.getElementById("attractions").classList.remove("active");
        document.getElementById("airport_taxis").classList.remove("active");
        event.currentTarget.classList.add('active');
    };

    return (
        <div className="header">
            <div className={type === "list" ? "headerContainer listMode" : "headerContainer"}>
                <div className="headerList">
                    <div className='headerListItem' onClick={handleClick} id="stays">
                        <FontAwesomeIcon icon={faBed} />
                        <span>Stays</span>
                    </div>
                    <div className='headerListItem' onClick={handleClick} id="flights">
                        <FontAwesomeIcon icon={faPlane} />
                        <span>Flights</span>
                    </div>
                    <div className='headerListItem' onClick={handleClick} id="car_rentals">
                        <FontAwesomeIcon icon={faCar} />
                        <span>Car rentals</span>
                    </div>
                    <div className='headerListItem' onClick={handleClick} id="attractions">
                        <FontAwesomeIcon icon={faMountainCity} />
                        <span>Attractions</span>
                    </div>
                    <div className='headerListItem' onClick={handleClick} id="airport_taxis">
                        <FontAwesomeIcon icon={faTaxi} />
                        <span>Airport taxis</span>
                    </div>
                </div>

                {type !== "list" && <>
                    <h1 className="headerTitle">A lifetime of discounts? It's Genius.</h1>
                    <p className="headerDesc">
                        Get rewarded for your travels – unlock instant savings of 10% or more
                        with a free Bookster account
                    </p>
                    {!user && <button className="headerBtn">Sign in / Register</button>}

                    <div className="headerSearch">
                        <div className="headerSearchItem">
                            <FontAwesomeIcon icon={faBed} className="headerIcon" />
                            <input
                                type="text"
                                placeholder="Where are you going?"
                                className="headerSearchInput"
                                onChange={(event) => setDestination(event.target.value)}
                            />
                        </div>
                        <div className="headerSearchItem">
                            <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
                            <span className="headerSearchText" onClick={() => { setOpenDate(!openDate) }}>
                                {`${format(date[0].startDate, "dd/MM/yyy")} to ${format(date[0].endDate, "dd/MM/yyy")}`}
                            </span>
                            {openDate && <DateRange
                                editableDateInputs={true}
                                onChange={(item) => setDate([item.selection])}
                                moveRangeOnFirstSelection={false}
                                ranges={date}
                                minDate={new Date()}
                                className="date"
                            />}
                        </div>
                        <div className="headerSearchItem">
                            <FontAwesomeIcon icon={faPerson} className="headerIcon" />
                            <span className="headerSearchText" onClick={() => { setOpenOptions(!openOptions) }}>{options.adult} adult . {options.children} children . {options.room} room</span>
                            {openOptions && <div className="options">
                                <div className="optionItem">
                                    <span className="optionText">Adult</span>
                                    <div className="optionCounter">
                                        <button className="optionCounterButton" onClick={() => handleOption("adult", "d")} disabled={options.adult <= 1}>-</button>
                                        <span className="optionCounterNumber">{options.adult}</span>
                                        <button className="optionCounterButton" onClick={() => handleOption("adult", "i")}>+</button>
                                    </div>
                                </div>
                                <div className="optionItem">
                                    <span className="optionText">Children</span>
                                    <div className="optionCounter">
                                        <button className="optionCounterButton" onClick={() => handleOption("children", "d")} disabled={options.children <= 0}>-</button>
                                        <span className="optionCounterNumber">{options.children}</span>
                                        <button className="optionCounterButton" onClick={() => handleOption("children", "i")}>+</button>
                                    </div>
                                </div>
                                <div className="optionItem">
                                    <span className="optionText">Room</span>
                                    <div className="optionCounter">
                                        <button className="optionCounterButton" onClick={() => handleOption("room", "d")} disabled={options.room <= 1}>-</button>
                                        <span className="optionCounterNumber">{options.room}</span>
                                        <button className="optionCounterButton" onClick={() => handleOption("room", "i")}>+</button>
                                    </div>
                                </div>
                            </div>
                            }
                        </div>
                        <div className="headerSeachItem">
                            <button className="headerSearchBtn" onClick={handleSearch}>Search</button>
                        </div>
                    </div>
                </>}
            </div>
        </div>
    );
}

export default Header;
