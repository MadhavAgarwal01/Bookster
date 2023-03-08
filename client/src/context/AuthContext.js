import { useEffect } from "react";
import { useReducer } from "react";
import { createContext } from "react";

const INITIAL_STATE = {
    user: JSON.parse(localStorage.getItem("user")) || null,
    loading: false,
    error: null,
    redirectTo: null
};

export const AuthContext = createContext(INITIAL_STATE);

const AuthReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN_START":
            return {
                user: null,
                loading: true,
                error: null,
                redirectTo: "/"
            };
        case "LOGIN_SUCCESS":
            return {
                user: action.payload.data,
                loading: false,
                error: null,
                redirectTo: action.payload.redirectTo
            };
        case "LOGIN_FAILURE":
            return {
                user: null,
                loading: false,
                error: action.payload,
                redirectTo: "/login"
            };
        case "LOGOUT":
            return {
                user: null,
                loading: false,
                error: null,
                redirectTo: "/"
            };
        case "CUR_LOC":
            return {
                user: null,
                loading: false,
                error: null,
                redirectTo: action.payload
            };
        case "REGISTER_FAILURE":
            return {
                user: null,
                loading: false,
                error: action.payload,
                redirectTo: "/register"
            };
        default:
            return state;
    }
};

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(state.user))
    }, [state.user])
    // console.log("Inside Auth reducer: ", state);

    return (
        <AuthContext.Provider
            value={{
                user: state.user,
                loading: state.loading,
                error: state.error,
                redirectTo: state.redirectTo,
                dispatch,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
