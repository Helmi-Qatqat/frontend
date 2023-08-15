import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation, Link, useNavigate  } from 'react-router-dom'
import './Login.css'
export default function Login() {
    const pathname = useLocation().pathname;
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    })
    let navigate = useNavigate()
    useEffect(() => {
        if(localStorage.getItem('user_data')) {
            navigate("/")
        }
    }, [navigate])
    async function handleSubmit(event) {
        event.preventDefault();
        const url = process.env.REACT_APP_SERVER_URL
        const result = await axios.post(url + pathname, formData);
        localStorage.setItem('user_data', JSON.stringify(result.data))
        navigate("/")
    }
    function redirector(pathname) {
        return pathname === '/signin'? '/signup' : '/signin' 
    }

    function parseWord(pathname) {
        return pathname === '/signin'? 'SignIn' : 'SignUp' 
    }

    function handleChange(event) {
        const {name, value} = event.target
        setFormData((prevData) => ({...prevData, [name]: value}))
    }
    function clearForm() {
        setFormData((prevData) => ({username: '', password: ''}))
    }
    return (
        <div className='login-container'>
            <h3>{parseWord(pathname)}</h3>
            <form>
                <div className='input-container'>
                    <label>Username:</label>
                    <input
                        required={true}
                        name={'username'}
                        value={formData.username}
                        onChange={(event) => handleChange(event)}
                        />
                </div>
                <div className='input-container'>
                    <label>Password:</label>
                    <input
                        required={true}
                        name={'password'}
                        value={formData.password}
                        onChange={(event) => handleChange(event)}
                        />
                </div>
                <button
                    className='submit-button'
                    onClick={(event) => handleSubmit(event)}    
                >
                    {parseWord(pathname)}</button>
                <p>{pathname === '/signin' ? "Don't have an account ?" : "Already have an account?"}</p>
                <Link 
                    className='redirector-anchor'
                    to={redirector(pathname)}
                    onClick={clearForm}
                >
                    {parseWord(redirector(pathname))}
                </Link>
            </form>
        </div>
    )
}