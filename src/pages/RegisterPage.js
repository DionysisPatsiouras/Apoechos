
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
        password2: '',
        first_name: '',
        last_name: '',
        birthdate: '',
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

        // const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        // if (!emailRegex.test(data.email)) {
        //     setCheckEmailMessage('Please enter a valid email address');
        // } else {
        //     setCheckEmailMessage('');
        // }

    }


    return (


        user ?
            <Navigate to="/discover" />
            :

            <div className={style.container}>

                <h6 className={style.title}>Register</h6>

                {console.log(message)}

                <form onSubmit={handleSubmit}>
                    <div className={style.container2}>
                        <div className={style.bar}>
                            <input type="email" name="email" placeholder="E-mail" onChange={handleInput} autoComplete='on' />

                            <input type="password" name="password" placeholder="Password" onChange={handleInput} autoComplete='off' />
                            <input type="password" name="password2" placeholder="Repeat Password" onChange={handleInput} autoComplete='off' />
                            <input type="date" name="birthdate" placeholder='MM/DD/YYYY' onChange={handleInput} />
                        </div>
                        <div className={style.bar}>
                            <input type="text" name="first_name" placeholder="First Name" onChange={handleInput} />
                            <input type="text" name="last_name" placeholder="Last Name" onChange={handleInput} />

                            {/* <input type="text" name="country" placeholder="Country" onChange={handleInput} /> */}

                            {/* <input list="cars" placeholder="Gender" onChange={handleInput} readOnly={ handleInput ? false : true}></input> */}
                            {/* <datalist id="cars" >
                                <option value="Male" />
                                <option value="Female" />
                            </datalist> */}
                        </div>
                    </div>


                    <div className={style.terms}>
                        {/* <input type='checkbox' id="terms" placeholder='' onClick={() => { setBoxStatus(!boxStatus); setBoxMsg('') }} /> */}
                        <input type='checkbox' id="terms" placeholder='' />
                        <label htmlFor='terms'>I have read and agree with Terms and Conditions of this website * </label><br></br>

                    </div>
                    {/* <small className={style.boxMsg}>{boxMsg}</small> */}

                    {/* <button style={{ 'backgroundColor': boxStatus === false ? '#C0C0C0' : '#4CA054', 'cursor': boxStatus === false ? 'pointer' : 'pointer' }} >Create Account</button> */}
                    <button >Create Account</button>
                </form>




                <section>
                    Already have an account?
                    <br></br>
                    Login <Link to='/login' style={{ 'color': '#5F69C6' }}>here</Link>
                </section>

            </div>

    )
}
