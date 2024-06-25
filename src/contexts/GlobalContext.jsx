import { createContext, useContext, useEffect, useState } from "react";
import axios from "../axiosSetup";

const GlobalContext = createContext();

const GlobalProvider = ({children}) => {

    const [tags, setTags] = useState([]);
    const [categories, setCategories] = useState([]);

    const fetchData = async () => {
        const { data: tagsData } = await axios.get(`/tags`);
        const { data: categoriesData } = await axios.get(`/categories`);
        setTags(tagsData);
        setCategories(categoriesData);
    }

    useEffect(() => {
        fetchData();
    },[]);
    
    return(
        <GlobalContext.Provider value={{
            tags,
            categories
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

const useGlobal = () => {
    const value = useContext(GlobalContext);
    //se non sono in un consumer del GlobalContext.Provider, value sarà undefined
    if(value === undefined){
        throw new Error('Non sei dentro al Global Provider!');
    }
    return value;
}

export { GlobalProvider, useGlobal }