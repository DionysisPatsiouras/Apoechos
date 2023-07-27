
import React, { useContext } from 'react'
import AuthContext from '../context/AuthContext'
import { Navigate, Link } from 'react-router-dom'
import style from '../style/RegisterPage.module.css'

export default function RegisterPage() {


    let { user } = useContext(AuthContext)

    return (

        user ?
            <Navigate to="/discover" />
            :

            <div className={style.container}>

                <h6 className={style.title}>Register</h6>

                <form>
                    <div className={style.container2}>
                        <div className={style.bar}>
                            <input type="email" name="email" placeholder="E-mail" />
                            <input type="password" name="password" placeholder="Password" />
                            <input type="password" name="password" placeholder="Repeat Password" />
                            <input type="date" name="birth" placeholder='MM/DD/YYYY' />
                        </div>
                        <div className={style.bar}>
                            <input type="text" name="firstname" placeholder="Firstname" />
                            <input type="text" name="lastname" placeholder="Lastname" />

                            <input type="text" name="country" placeholder="Country" />

                            <input list="cars" placeholder="Gender"></input>
                            <datalist id="cars">
                                <option value="Male" />
                                <option value="Female" />
                            </datalist>
                        </div>
                    </div>

                    <div className={style.terms}>
                        <input type='checkbox' id="terms" placeholder='dsdda' />
                        <label for="terms">By creating an account, I agree with Terms and Conditions of this website * </label>
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
