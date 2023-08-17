import React, { useContext, useState } from 'react'
import { Navigate, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import AuthContext from '../context/AuthContext'
import axios from 'axios'
import style from '../style/Pages/RegisterPage.module.css'


export default function RegisterPage() {

    let { user } = useContext(AuthContext)
    const form = useForm()
    const { register, handleSubmit, formState, watch } = form
    const { errors } = formState
    const [emailInUse, setEmailInUse] = useState('')


    const onSubmit = data => {
        console.log('Form submitted', data)
        axios
            .post('http://127.0.0.1:8000/users/', {
                email: data.email,
                password: data.password
            })
            .then((response) => {
                console.log(response)
            })
            .catch((error) => {
                console.log(error)
                setEmailInUse(error.response.data.email)
            })
    }


    return (
        user ?
            <Navigate to="/discover" /> :
            
            <div className={style.container}>
                <h6 className={style.title}>Register</h6>
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
      
                    {/* EMAIL */}
                    <label htmlFor="email" className={style.fieldLabel}>E-mail *</label>
                    <input type="email" id="email" className={style.registerInput}
                        {...register("email", {
                            onChange: () => setEmailInUse(''),
                            pattern: {
                                value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                                message: "Invalid e-mail format.",
                            },
                            required: "E-mail is required"
                        })} />
        
     
                    <p className={style.errorMessage}>{emailInUse}</p>
                    <p className={style.errorMessage}>{errors.email?.message}</p>



                    {/* PASSWORD */}
                    <label htmlFor="password" className={style.fieldLabel}>Password *</label>
                    <input type="password" id="password" className={style.registerInput}
                        {...register("password", {
                            required: "Password is required",
                            minLength: {
                                // value: 8,
                                value: 3,
                                message: "Password must have at least 8 characters"
                            }
                        })} />
                    <p className={style.errorMessage}>{errors.password?.message}</p>



                    {/* REPEAT PASSWORD */}
                    <label htmlFor="confirm_password" className={style.fieldLabel}>Repeat Password *</label>
                    <input type="password" id="confirm_password" className={style.registerInput}
                        {...register("confirm_password", {
                            required: "This field is required",
                            // check if passwords match
                            validate: (val) => {
                                if (watch('password') !== val) {
                                    return "Your passwords do not match";
                                }
                            }
                        })} />
                    <p className={style.errorMessage}>{errors.confirm_password?.message}</p>




                    {/* TERMS AND CONDITIONS CHECKBOX */}
                    <div className={style.terms}>
                        <input type='checkbox' id="terms"
                            {...register("checkbox", {
                                required: "You must agree with Terms & Conditions to create an account"
                            })}
                        />
                        <label htmlFor='terms' className={style.termsLabel}>By clicking here, I state that I have read and understood the terms and conditions * </label><br></br><br></br>
                        <p className={style.errorMessage}>{errors.checkbox?.message}</p>
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
