import { useEffect, useReducer } from "react";
import { createContext } from "react";
import { parseISO } from "date-fns"

const today = new Date();
const nextDay = new Date();
nextDay.setDate(today.getDate() + 1);

const RESET_STATE = {
    destination: undefined,
    date: [{
        startDate: today,
        endDate: nextDay
    }],
    type: undefined,
    options: {
        adult: 1,
        children: 0,
        room: 1
    }
};

var INITIAL_STATE = RESET_STATE;
export const SearchContext = createContext(INITIAL_STATE);

const SearchReducer = (state, action) => {

    switch (action.type) {
        case "NEW_SEARCH":
            if (action.payload) {
                console.log("Inside Reducer!", action);
                localStorage.setItem("state", JSON.stringify(action.payload))
            }
            return action.payload;
        case "INITIAL_STATE":
            return INITIAL_STATE;
        case "RESET_SEARCH":
            return RESET_STATE;
        default:
            return state;
    }
};

export const SearchContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(SearchReducer, INITIAL_STATE);

    useEffect(() => {
        // localStorage.setItem("state", JSON.stringify(state))
        var storedState = JSON.parse(localStorage.getItem("state"));

        INITIAL_STATE = {
            destination: storedState?.destination || RESET_STATE.destination,
            date: [{
                startDate: parseISO(storedState?.date[0].startDate) || RESET_STATE.date[0].startDate,
                endDate: parseISO(storedState?.date[0].endDate) || RESET_STATE.date[0].endDate
            }],
            type: storedState?.type || RESET_STATE.type,
            options: storedState?.options || RESET_STATE.options
        };
    })
    console.log("INITIAL_STATE: ", INITIAL_STATE);

    return (
        <SearchContext.Provider
            value={{
                destination: state.destination,
                date: state.date,
                type: state.type,
                options: state.options,
                dispatch,
            }}
        >
            {children}
        </SearchContext.Provider>
    );
};
