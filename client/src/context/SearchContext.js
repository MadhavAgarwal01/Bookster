import { useReducer } from "react";
import { createContext } from "react";

const INITIAL_STATE = {
    destination: undefined,
    date: [],
    options: {
        adult: undefined,
        children: undefined,
        room: undefined
    }
};

export const SearchContext = createContext(INITIAL_STATE);

const SearchReducer = (state, action) => {
    console.log("Inside Reducer!", action.payload);
    switch (action.type) {
        case "NEW_SEARCH":
            return action.payload;
        case "RESET_SEARCH":
            return INITIAL_STATE;
        default:
            return state;
    }
};

export const SearchContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(SearchReducer, INITIAL_STATE);
    console.log("Inside Context Provider!", state);

    return (
        <SearchContext.Provider
            value={{
                destination: state.destination,
                date: state.date,
                options: state.options,
                dispatch,
            }}
        >
            {children}
        </SearchContext.Provider>
    );
};
