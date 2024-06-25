import { createContext, useContext } from "react";
import useStorage from "../hooks/useStorage";

const GlobalContext = createContext();

const GlobalProvider = ({children}) => {

    const [userName, setUserName] = useStorage(null, 'userName');

    
    const setUsername = (payload) => {
        setUserName(payload)
    }
    
    const clearUserName = () => {
        localStorage.removeItem('userName');
    }
    
    const value = {
        userName,
        setUsername,
        clearUserName,
    };
    
    return (
        <GlobalContext.Provider value={value}>
            {children}
        </GlobalContext.Provider>
    )
}

const useGlobal = () => {
    const value = useContext(GlobalContext);
    if(value === undefined){
        throw new Error('Non sei dentro al Context Provider.');
    }
    return value;
}

export {GlobalProvider, useGlobal};