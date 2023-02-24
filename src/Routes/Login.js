import { useState, useEffect } from "react";
import { loginUser } from "../util/API";
import { useOutletContext, useNavigate } from "react-router-dom";


const Login  = () => {
    const [token, setToken] = useOutletContext();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('Please Enter Username and Password ');
    const navigate = useNavigate();
    useEffect(() => {
        if(token){
            return navigate('/home')
        }
    },[token, navigate])


    async function submitForm (event) {
        event.preventDefault();
        if (!username){
            setErrorMessage("Please enter Username");
        }else if (!password){
            setErrorMessage("Incorrect Passsword")
        }else {
            setErrorMessage('');
            const user = {username,password}
            const response = await loginUser(user);
            console.log(response);
            if (response.error){
                setErrorMessage(response.error.message)
            }else {
                localStorage.setItem('token', response.token)
                setToken(response.token)
            }
        }
        setUsername('');
        setPassword('');
    }
    return (
    <div className = 'loginbox'>   
    <section className ="login">    
        <h1 className = 'title'> Log In </h1>
        <form className = 'loginForm' onSubmit={submitForm}>
        <p>{errorMessage}</p>
            <label>Username</label>
            <input 
                type="text" 
                value={username}
                onChange={event => setUsername(event.target.value)}
            />
            <label>Password</label>
            <input 
                type="password" 
                value={password} 
                onChange={event => setPassword(event.target.value)}
            />
            <button type="submit" onChange={event => (event.target.value)}>Login</button>
        </form>
    </section>
    </div>
    )
}

export default Login;