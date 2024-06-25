import { useGlobal } from '../contexts/GlobalContext.jsx'

export default function(){

    const {userName} = useGlobal()


    return (
        <div className='homepage'>
            <h1>Homepage</h1>
            <p>Questa è l'homepage!</p>
            { userName && 
            <h3>Benvenuto {userName}!</h3>}

        </div>
    )
}