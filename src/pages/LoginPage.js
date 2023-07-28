import React, { useContext, useState } from 'react'
import AuthContext from '../context/AuthContext'
import { Navigate, Link } from 'react-router-dom'
import style from '../style/LoginPage.module.css'



export default function LoginPage() {

    let { loginUser, user, error } = useContext(AuthContext)
 

    const [data, setData] = useState({
        email: '',
        password: ''
    })

    const handleInput = (event) => {
    
        error.email = ''
        error.password = ''
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
                    <p className={style.errorHandle}>{error.email}</p>
                    <input type="password" name="password" placeholder="Password" onChange={handleInput} />
                    <p className={style.errorHandle}>{error.password}</p>
               
                    <button>Log In</button>
                </form>

                <br></br>
                
                {/* {console.log(data)} */}

                <section>
                    Don’t have an account?
                    <br></br>
                    Register <Link to='/register' style={{ 'color': '#5F69C6' }}>here</Link>
                </section>

            </div>
    )
}

