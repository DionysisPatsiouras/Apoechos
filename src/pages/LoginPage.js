import React, { useContext, useState } from 'react'
import AuthContext from '../context/AuthContext'
import { Navigate, Link } from 'react-router-dom'
import style from '../style/LoginPage.module.css'



export default function LoginPage() {

    let { loginUser, user } = useContext(AuthContext)

    const [message, setMessage] = useState('')

    
    const [data, setData] = useState({
        email: '',
        password: ''
    })

    const handleInput = (event) => {
        setData({ ...data, [event.target.name]: event.target.value })
    }




    return (

        user ?
            <Navigate to="/discover" />
            :

            <div className={style.container}>

                <h6 className={style.title}>Log In</h6>

                <form onSubmit={loginUser}>
                    <input type="email" name="email" placeholder="E-mail" onChange={handleInput} />
                    <input type="password" name="password" placeholder="Password" onChange={handleInput} />

                    <button>Log In</button>
                </form>

                <br></br>
                {message}
                {console.log(data)}

                <section>
                    Don’t you have an account?
                    <br></br>
                    Register <Link to='/register' style={{ 'color': '#5F69C6' }}>here</Link>
                </section>

            </div>
    )
}

