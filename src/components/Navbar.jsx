import { Link, NavLink } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import { useGlobal } from "../contexts/GlobalContext"
import { useEffect } from "react"

const urlPages = [
    {
        label: 'Home',
        href: '/'
    },
    {
        label: 'Posts',
        href: '/posts'
    }
]

export default function(){

    const { isLoggedIn, logout } = useAuth()
    let { userName } = useGlobal()

    useEffect(() => {
    
    }, [userName])

    return (
        <header>
            <nav className="navbar">
                <menu>
                    {urlPages.map( ({label, href}, i) => (
                        <li key={`urlPage${i}`}>
                            <NavLink to={href} end>{label}</NavLink>
                        </li>
                    ))}
                    {!isLoggedIn ?
                        <li>
                            <NavLink to="/login">Login</NavLink>
                        </li>
                    :
                        <li>
                            <span onClick={logout}>Logout</span>
                        </li>
                    }
                </menu>
            </nav>
        </header>
    )
}