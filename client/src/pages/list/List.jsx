import "./List.css";
import "./List_res.css";
import react, { useContext, useState } from "react";
import React from 'react';
import Select from 'react-select'
import { useMediaQuery } from 'react-responsive';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation } from "react-router-dom";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import { DateRange } from "react-date-range";
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { format } from "date-fns"
import SearchItem from "../../components/searchItem/SearchItem";
import useFetch from "../../hooks/useFetch";
import { SearchContext } from "../../context/SearchContext";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";

function List() {

    const { dispatch, ...others } = useContext(SearchContext);
    const con_destination = others.destination;
    const con_options = others.options;
    const con_date = others.date;
    const con_type = others.type;
    React.useEffect(() => {
        console.log("List effect!", { con_destination, con_date, con_type, con_options });
    }, [{ con_destination, con_date, con_type, con_options }]);

    const [destination, setDestination] = useState(con_destination);
    const [options, setOptions] = useState(con_options);
    const [date, setDate] = useState(con_date);
    const typeArray = ["hotel", "apartments", "resorts", "villas", "cabin"];
    const typeIndex = Math.max(0, typeArray.findIndex((element) => element === con_type));

    const types = [
        { value: "hotel", label: "hotel" },
        { value: "apartments", label: "apartments" },
        { value: "resorts", label: "resorts" },
        { value: "villas", label: "villas" },
        { value: "cabin", label: "cabin" }];
    const [selectedOption, setSelectedOption] = useState(types[typeIndex]);
    const type = selectedOption.value;

    React.useEffect(() => {
        console.log("Type effect!", selectedOption);
    }, [selectedOption]);

    const [openDate, setOpenDate] = useState(false);
    const [min, setMin] = useState(undefined);
    const [max, setMax] = useState(undefined);

    const { data, loading, reFetch } = useFetch(
        `/hotels?city=${destination}&min=${min || 0}&max=${max || 999}&type=${type}`
    );

    const handleClick = () => {
        console.log("Search button clicked!");
        dispatch({ type: "NEW_SEARCH", payload: { destination, date, type, options } });
        reFetch();
    }
    const isMobile = useMediaQuery({ query: `(max-width: 767px)` });
    const [openSearchFilters, setOpenSearchFilters] = useState(false);

    return (
        <div>
            <Navbar />
            <Header type="list" />
            <div className="listContainer">
                <div className="listWrapper">
                    {isMobile &&
                        <div className="searchFilterToggle" onClick={() => setOpenSearchFilters(!openSearchFilters)}>
                            <h3>Filters</h3>
                            <FontAwesomeIcon className="hamburger" icon={faBars} />
                        </div>
                    }
                    {(!isMobile || openSearchFilters) &&
                        <div className="listSearch">
                            <h1 className="lsTitle">Search</h1>
                            <div className="lsItem">
                                <label>Destination</label>
                                <input placeholder={destination} onChange={e => setDestination(e.target.value)} type="text" />
                            </div>
                            <div className="lsItem">
                                <label>Check-in - Check-out</label>
                                <span onClick={() => { setOpenDate(!openDate) }}>
                                    {`${format(date[0].startDate, "dd/MM/yyy")} to ${format(date[0].endDate, "dd/MM/yyy")}`}
                                </span>
                                {openDate &&
                                    <DateRange
                                        editableDateInputs={true}
                                        onChange={(item) => setDate([item.selection])}
                                        moveRangeOnFirstSelection={false}
                                        ranges={date}
                                        minDate={new Date()}
                                    />}
                            </div>
                            <div className="lsItem">
                                <label>Destination</label>
                                <Select
                                    defaultValue={types[typeIndex]}
                                    isClearable={true}
                                    isSearchable={true}
                                    options={types}
                                    onChange={setSelectedOption}
                                />
                            </div>
                            <div className="lsItem">
                                <label>Options</label>
                                <div className="lsOptions">
                                    <div className="lsOptionItem">
                                        <span className="lsOptionText">
                                            Min Price <small>per night</small>
                                        </span>
                                        <input type="number" onChange={e => setMin(e.target.value)} min={0} className="lsOptionInput" />
                                    </div>
                                    <div className="lsOptionItem">
                                        <span className="lsOptionText">
                                            Max Price <small>per night</small>
                                        </span>
                                        <input type="number" onChange={e => setMax(e.target.value)} min={0} className="lsOptionInput" />
                                    </div>
                                    <div className="lsOptionItem">
                                        <span className="lsOptionText">
                                            Adult
                                        </span>
                                        <input type="number" onChange={e => setOptions({ ...options, adult: e.target.value })} min={1} className="lsOptionInput" placeholder={options.adult} />
                                    </div>
                                    <div className="lsOptionItem">
                                        <span className="lsOptionText">
                                            Children
                                        </span>
                                        <input type="number" onChange={e => setOptions({ ...options, children: e.target.value })} min={0} className="lsOptionInput" placeholder={options.children} />
                                    </div>
                                    <div className="lsOptionItem">
                                        <span className="lsOptionText">
                                            Room
                                        </span>
                                        <input type="number" onChange={e => setOptions({ ...options, room: e.target.value })} min={1} className="lsOptionInput" placeholder={options.room} />
                                    </div>
                                </div>
                            </div>
                            <button className="lsSearch" onClick={handleClick}>Search</button>
                        </div>
                    }
                    <div className="listResult">
                        {loading ?
                            "loading"
                            :
                            <>
                                {(destination === undefined || destination === "") ?
                                    "" :
                                    <span>{data.length} results for "{destination}"</span>
                                }
                                {data.map((item) => (
                                    <SearchItem item={item} key={item._id} />
                                ))}
                            </>
                        }
                    </div>
                </div>
            </div>
            <div className="mailFooter">
                <MailList />
                <Footer />
            </div>
        </div>
    );
};

export default List;