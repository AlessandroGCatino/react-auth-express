import { useState } from "react"
import { useAuth } from "../contexts/AuthContext";


export default function(){
    
    const { login } = useAuth();
    
    const authForm = {
        username: "",
        password: ""
    }

    const [authData, setAuthData] = useState(authForm)

    const [loginError, setLoginError] = useState(null);


    const handleField = (name, value) => {
        setAuthData(curr => ({
            ...curr,
            [name]: value
        }));
    }



    const handleSubmit = async e => {
        e.preventDefault();
        try{
            await login(authData);
            setAuthData(authForm);
        }catch(err){
            setLoginError(err);
        }
    }

    return(<>
        <form onSubmit={handleSubmit} className="loginForm">
        <h3>Effettua il login per visualizzare i dettagli dei post!</h3>
        <input 
                type="text"
                placeholder="Email" 
                value={authData.email}
                onChange={e => handleField('email', e.target.value)}
            />
            <input 
                type="password"
                placeholder="Password" 
                value={authData.password}
                onChange={e => handleField('password', e.target.value)}
            />
            {loginError !== null && <div className="error">{loginError.message}</div>}
            {loginError?.errors && loginError.errors.map( (err, index) => (
                <div key={`err${index}`}>{err.msg}</div>
            ))}
            <button type="submit">Login</button>
        </form>
    </>
    )


}