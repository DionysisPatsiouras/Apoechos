
import { useForm } from 'react-hook-form'
import React, { useContext } from 'react'

import AuthContext from '../context/AuthContext'
import { Navigate, Link } from 'react-router-dom'
import style from '../style/Pages/RegisterPage.module.css'


export default function RegisterPage() {


    let { user } = useContext(AuthContext)



    const form = useForm<FormValues>();
    const { register, handleSubmit, formState, watch } = form
    const { errors } = formState

    type FormValues = {
        email: string
        password: string
        confirm_password: string
        checkbox: boolean
        gender: string

    }



    const onSubmit = (data: FormValues) => {
        console.log('Form submitted', data)
    }

    // /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    return (


        user ?
            <Navigate to="/discover" /> :

            <div className={style.container}>

                <h6 className={style.title}>Register</h6>

                <form onSubmit={handleSubmit(onSubmit)} noValidate>

                    {/* EMAIL */}
                    <label htmlFor="email" >E-mail *</label>
                    <input type="email" id="email"
                        {...register("email", {
                            pattern: {
                                value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                                message: "Invalid e-mail format.",
                            },
                            required: "E-mail is required"
                        })} />
                    <p className={style.errorMessage}>{errors.email?.message}</p>

                    {/* PASSWORD */}
                    <label htmlFor="password" >Password *</label>
                    <input type="password" id="password"
                        {...register("password", {
                            required: "Password is required",
                            minLength: {
                                value: 8,
                                message: "Password must have at least 8 characters"
                            }
                        })} />
                    <p className={style.errorMessage}>{errors.password?.message}</p>

                    {/* REPEAT PASSWORD */}
                    <label htmlFor="confirm_password" >Repeat Password *</label>
                    <input type="password" id="confirm_password"
                        {...register("confirm_password", {
                            required: "This field is required",
                            validate: (val: string) => {
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
                                required: "This field is required"
                            })}
                        />
                        <label htmlFor='terms'>By clicking here, I state that I have read and understood the terms and conditions * </label><br></br>
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
