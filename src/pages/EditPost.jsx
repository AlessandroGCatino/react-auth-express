import React, { useState, useEffect } from 'react';
import axios from '../axiosSetup';
import { useNavigate, useParams } from 'react-router-dom';
import { useGlobal } from "../contexts/GlobalContext";


export default function(){

    const { tags, categories } = useGlobal();


    const initialData = {
        title: '',
        content: '',
        image: '',
        categoryID: "",
        tags: [],
        published: false
    }

    const { slug } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(initialData);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`/posts/${slug}`);
                setPost(response.data);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchPost();
    }, [slug]);

    const handleField = (e) => {
        const { name, value } = e.target;
        setPost({ ...post, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`/posts/${slug}`, post);
            navigate(`/posts/${slug}`);
        } catch (error) {
            setError(error);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading post: {error.message}</p>;

    return (
        <div>
            <h1>Edit Post</h1>
            <form onSubmit={handleSubmit} className="create">
                {Object.keys(initialData).map((name, index) => {
                    const value = initialData[name];
                    if(name === 'categoryID'){
                        return (
                            <label key={`formElement${index}`} >
                                {name}
                                <select
                                    value={post[name]}
                                    onChange={(e) => handleField(name, Number(e.target.value))}
                                >
                                    <option value="" disabled>Seleziona una categoria</option>
                                {categories.map(c => (
                                    <option key={`categoryId${c.id}`} value={c.id}>{c.title}</option>
                                ))}        
                                </select>
                            </label>
                        ) 
                    }
                    switch(typeof value){
                        case 'boolean':
                        return (
                            <label key={`formElement${index}`}>
                                {name}
                                <input
                                    name={name}
                                    type="checkbox"
                                    checked={post[name]}
                                    onChange={(e) => handleField(name, e.target.checked)}
                                />
                            </label>
                        )
                        case 'object':
                        return (
                            <div key={`formElement${index}`} className="tags">
                                <p>Tags:</p>
                                <ul>
                                    {tags.map(({ id, title }, index) => (
                                        <li key={`tag${index}`}>
                                            <label>
                                                <input
                                                    type="checkbox"
                                                    checked={post.tags.includes(id)}
                                                    onChange={() => {
                                                        const curr = post.tags;
                                                        const newTags = curr.includes(id) ? 
                                                        curr.filter(el => el !== id) : 
                                                        [...curr, Number(id)];
                                                        handleField('tags', newTags);
                                                    }}
                                                />
                                                {title}
                                            </label>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )
                        default:
                        return (
                            <label key={`formElement${index}`}>
                                {name}:
                                <input
                                    name={name}
                                    type={typeof value === 'number' ? 'number' : 'text'}
                                    value={post[name]}
                                    onChange={(e) => handleField(name, typeof value === 'number' ? Number(e.target.value) : e.target.value)}
                                />
                            </label>
                        )
                    }
                })}
                <button>Salva</button>
            </form>
        </div>
    );
};