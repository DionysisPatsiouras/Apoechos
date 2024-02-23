import React, { useContext, useState } from 'react'
import { Navigate, Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import AuthContext from '../context/AuthContext'
import axios from 'axios'
import css from '../style/Pages/RegisterPage.module.css'


export default function RegisterPage() {

    let { user } = useContext(AuthContext)
    const form = useForm()
    const { register, handleSubmit, formState, watch } = form
    const { errors } = formState
    const [emailInUse, setEmailInUse] = useState('')
    const [accountCreated, setAccountCreated] = useState(false)
    const navigate = useNavigate();


    const onSubmit = data => {
        console.log('Form submitted', data)
        axios
            .post('http://127.0.0.1:8000/users/register/', {
                email: data.email,
                password: data.password
            })
            .then((response) => {
                // console.log(response)
                setAccountCreated(true)
                setTimeout(() => {
                    navigate("/login");
                }, 1500)
            })
            .catch((error) => {
                console.log(error)
                setEmailInUse(error.response.data.email)
            })
    }


    return (
        user ?
            <Navigate to="/discover" /> :



            <div className={css.container}>

                <h6 className={css.title}>{accountCreated ? 'Account Created' : 'Register'}</h6>
                <form onSubmit={handleSubmit(onSubmit)} noValidate style={{ 'display': accountCreated ? 'none' : 'flex' }}>

                    {/* EMAIL */}
                    <label htmlFor="email" className={css.fieldLabel}>E-mail *</label>
                    <input type="email" id="email" className={css.registerInput}
                        {...register("email", {
                            onChange: () => setEmailInUse(''),
                            pattern: {
                                value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                                message: "Invalid e-mail format.",
                            },
                            required: "E-mail is required"
                        })} />


                    <p className={css.errorMessage}>{emailInUse}</p>
                    <p className={css.errorMessage}>{errors.email?.message}</p>



                    {/* PASSWORD */}
                    <label htmlFor="password" className={css.fieldLabel}>Password *</label>
                    <input type="password" id="password" className={css.registerInput}
                        {...register("password", {
                            required: "Password is required",
                            minLength: {
                                // value: 8,
                                value: 3,
                                message: "Password must have at least 8 characters"
                            }
                        })} />
                    <p className={css.errorMessage}>{errors.password?.message}</p>



                    {/* REPEAT PASSWORD */}
                    <label htmlFor="confirm_password" className={css.fieldLabel}>Repeat Password *</label>
                    <input type="password" id="confirm_password" className={css.registerInput}
                        {...register("confirm_password", {
                            required: "This field is required",
                            // check if passwords match
                            validate: (val) => {
                                if (watch('password') !== val) {
                                    return "Your passwords do not match";
                                }
                            }
                        })} />
                    <p className={css.errorMessage}>{errors.confirm_password?.message}</p>




                    {/* TERMS AND CONDITIONS CHECKBOX */}
                    <div className={css.terms}>
                        <input type='checkbox' id="terms"
                            {...register("checkbox", {
                                required: "You must agree with Terms & Conditions to create an account"
                            })}
                        />
                        <label htmlFor='terms' className={css.termsLabel}>By clicking here, I state that I have read and understood the terms and conditions * </label><br></br><br></br>
                        <p className={css.errorMessage}>{errors.checkbox?.message}</p>
                    </div>
                    <button>Create Account</button>
                </form>

                {!accountCreated ?
                    <section>
                        Already have an account?
                        <br></br>
                        Login <Link to='/login' style={{ 'color': '#5F69C6' }}>here</Link>
                    </section>

                    :
                    <p>You are redirecting to Login..</p>
                }

            </div>
    )
}
