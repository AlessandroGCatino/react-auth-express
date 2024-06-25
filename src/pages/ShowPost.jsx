import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const apiUrl = import.meta.env.VITE_BASE_API_URL;

export default function (){

    const {slug} = useParams()

    const [post, setPost] = useState(null);

    const getPosts = async () => {
        setPost(null);
        const url = `${apiUrl}/posts/${slug}`;
        const { data: response } = await axios.get(url);
        setPost(response);
    }

    useEffect(() => {
        getPosts();
    }, [slug]);


    return (
        <>
          <div className="showPage">
            {!post && "Loading..."}
            {post && 
            <>
                <h1>{post.title}</h1>
                <figure>
                    <img src={post.image} alt={post.title} />
                </figure>
                <p>{post.content}</p>
                <p>Categoria: {post.category.title}</p>
                <p>Tags: {post.tags.map(el => el.title).join(', ')}</p>
                <p className={post.published?"publ":"notPubl"}>{post.published? 'Pubblicato' : 'Non pubblicato'}</p>
            </>
            }
          </div>
        </>
      )
}