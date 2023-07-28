
import React, { useContext, useState } from 'react'
import axios from 'axios'
import AuthContext from '../context/AuthContext'
import { Navigate, Link } from 'react-router-dom'
import style from '../style/RegisterPage.module.css'


export default function RegisterPage() {


    let { user } = useContext(AuthContext)
    const [message, setMessage] = useState('')

    const [data, setData] = useState({
        email: '',
        password: '',
        first_name: '',
        last_name: '',
        // date_joined: '',
        // gender: '',

    })


    function handleSubmit(event) {
        event.preventDefault()

        axios({
            method: 'post',
            url: 'http://127.0.0.1:8000/users/',
            data: data
        }).then(response => {
            console.log(response.data)
            console.log(response)
            alert('account created')
        })

    }


    const handleInput = (event) => {
        setData({ ...data, [event.target.name]: event.target.value })
        // if(data.email === ''){
        //     setMessage('enter email')
        // }
    }

    return (


        user ?
            <Navigate to="/discover" />
            :

            <div className={style.container}>
                {console.log(data)}
                <h6 className={style.title}>Register</h6>
                {message}
                <form onSubmit={handleSubmit}>
                    <div className={style.container2}>
                        <div className={style.bar}>
                            <input type="email" name="email" placeholder="E-mail" onChange={handleInput} />
                            <input type="password" name="password" placeholder="Password" onChange={handleInput} />
                            {/* <input type="password" name="password" placeholder="Repeat Password" /> */}
                            {/* <input type="date" name="birth" placeholder='MM/DD/YYYY' onChange={handleInput} /> */}
                        </div>
                        <div className={style.bar}>
                            <input type="text" name="first_name" placeholder="Firstname" onChange={handleInput} />
                            <input type="text" name="last_name" placeholder="Lastname" onChange={handleInput} />

                            {/* <input type="text" name="country" placeholder="Country" onChange={handleInput} /> */}

                            {/* <input list="cars" placeholder="Gender" onChange={handleInput}></input> */}
                            {/* <datalist id="cars">
                                <option value="Male" />
                                <option value="Female" />
                            </datalist> */}
                        </div>
                    </div>

                    <div className={style.terms}>
                        <input type='checkbox' id="terms" placeholder='' />
                        {/* <label for="terms">By creating an account, I agree with Terms and Conditions of this website * </label> */}
                    </div>
                    <button>Create Account</button>
                </form>

                <section>
                    Already have an account?
                    <br></br>
                    Login <Link to='/login' style={{ 'color': '#5F69C6' }}>here</Link>
                </section>

            </div>

    )
}
