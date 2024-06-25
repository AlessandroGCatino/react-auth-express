import axios from "../axiosSetup";
import { useState } from "react";
import IndexPosts from "../components/IndexPosts";



export default function(){
    const [response, setResponse] = useState(null);

    const getPosts = async (page) => {
        setResponse(null);
        const url = `/posts?page=${page}&postPerPage=10`;
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