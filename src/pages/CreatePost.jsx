import { useEffect, useState } from "react";
import Form from "../components/Form";
import axios from "../axiosSetup";



export default function(){

    const [response, setResponse] = useState(null);

    const [tags, setTags] = useState([]);
    const getTags = async () => {
        const { data: array } = await axios.get(`/tags`);
        setTags(array);
    }
  
    const [categories, setCategories] = useState([]);
    const getCategorie = async () => {
        const { data: array } = await axios.get(`/categories`);
        setCategories(array);
    }
  
    useEffect(() => {
        getTags();
        getCategorie();
    },[])

    return(
    <Form 
      categories={categories} 
      tags={tags} 
      onCreate={() => {
          setShowCreateForm(false);
          getPosts(1);
      }}/>
    )

}