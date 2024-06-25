import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import useStorage from "../hooks/useStorage";
import { useGlobal } from "./GlobalContext";

const AuthContext = createContext();

const AuthProvider = ({children}) => {

    const navigate = useNavigate();
    const { clearUserName } = useGlobal()

    const [isLoggedIn, setIsLoggedIn] = useStorage(false, 'isLoggedIn');

    const login = (payload, redirectTo) => {
        setIsLoggedIn(true);
        navigate(redirectTo || '/');
    }

    const logout = () => {
        setIsLoggedIn(false);
        clearUserName();
        navigate('/login');
    }

    const value = {
        isLoggedIn,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

const useAuth = () => {
    const value = useContext(AuthContext);
    if(value === undefined){
        throw new Error('Non sei dentro al Auth Provider.');
    }
    return value;
}

export {AuthProvider, useAuth};