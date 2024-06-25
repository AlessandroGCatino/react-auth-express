import { useState } from "react"
import { useAuth } from "../contexts/AuthContext";
import { useGlobal } from "../contexts/GlobalContext";


export default function(){
    
    const { login } = useAuth();
    const { setUsername } = useGlobal();
    
    const authForm = {
        username: "",
        password: ""
    }

    const [authData, setAuthData] = useState(authForm)

    const handleField = (name, value) => {
        setAuthData(curr => ({
            ...curr,
            [name]: value
        }));
    }



    const handleSubmit = (e) => {
        e.preventDefault()
        setUsername(authData.username)
        login()

    }

    return(<>
        <form onSubmit={handleSubmit} className="loginForm">
        <h3>Effettua il login per visualizzare i dettagli dei post!</h3>
            <input type="text"
                placeholder="Username" 
                value={authData["username"]}
                onChange={(e) => handleField("username" ,e.target.value)}
            />
            <input type="password"
                placeholder="Password" 
                value={authData["password"]}
                onChange={(e) => handleField("password",e.target.value)}
            />
            <button type="submit">Login</button>
        </form>
    </>
    )


}