import axios from "../axiosSetup";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";


export default function (){

    const {slug} = useParams()
    const {isLoggedIn} = useAuth

    const [post, setPost] = useState(null);

    const getPosts = async () => {
        setPost(null);
        const url = `/posts/${slug}`;
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
                {!isLoggedIn && <Link to={`/posts/${slug}/edit`}><button>Modifica Post</button></Link>}
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