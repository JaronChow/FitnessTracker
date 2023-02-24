import { Outlet, Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Root = () => {
    const [token, setToken] = useState(localStorage.getItem('token'))
    const navigate = useNavigate();
    const logout  = () => {
        localStorage.removeItem('token')
        setToken('');
        navigate('/home')
    }
    
    return (
        <div>  
            <section className="homeTitle">
            <header><Link to = 'home' className="TITLE"> Better Fitness 2023</Link></header>
            <nav className='nav'>
                <Link to ='home'> Home </Link>
                <Link to='routines'>Routines</Link>
                <Link to ='activities'> Activities</Link>
                {token && <Link to='users/routines'>My Routines</Link>}
                {!token ? <Link to='register'>Register</Link> : ''}
                {!token ? <Link to='login'>Log In</Link> : ''}
                {token ? <button className = 'logout' onClick={logout}>Logout</button> : ''}
            </nav>
            </section>
            <>
            </>
            <main>
                <Outlet context={[token,setToken]}/>
            </main>
        </div>
    )
}

export default Root;