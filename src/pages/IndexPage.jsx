import axios from "axios";
import { useState } from "react";
import IndexPosts from "../components/IndexPosts";
const apiUrl = import.meta.env.VITE_BASE_API_URL;



export default function(){
    const [response, setResponse] = useState(null);

    const getPosts = async (page) => {
        setResponse(null);
        const url = `${apiUrl}/posts?page=${page}&postPerPage=10`;
        const { data: response } = await axios.get(url);
        setResponse(response);
    }

  return (
    <>
    <IndexPosts 
        response={response}
        onPageChange={page => getPosts(page)}/>
    </>
  )
}