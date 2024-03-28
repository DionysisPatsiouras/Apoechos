import { useContext, useState } from 'react'
import { Navigate, Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import AuthContext from '../context/AuthContext'
import axios from 'axios'

import CSS from '../css/Login/Login.module.css'

import { email_regex } from '../utils/Regex'



export default function Register() {

    let { user }: any = useContext(AuthContext)
    const form = useForm()
    const { register, handleSubmit, formState, watch } = form
    const { errors } = formState
    const [emailInUse, setEmailInUse] = useState('')
    const [accountCreated, setAccountCreated] = useState(false)
    const navigate = useNavigate();


    const onSubmit = (data: any) => {
        console.log('Form submitted', data)
        axios
            .post('http://127.0.0.1:8000/user/register/', {
                email: data.email,
                password: data.password
            })
            .then((response) => {
                console.log(response)
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



            <div className={CSS.container}>

                <h6 className={CSS.title}>{accountCreated ? 'Account Created' : 'Register'}</h6>
                <form onSubmit={handleSubmit(onSubmit)} noValidate style={{ 'display': accountCreated ? 'none' : 'flex' }}>

                    {/* EMAIL */}
                    <label htmlFor="email" className={CSS.fieldLabel}>E-mail *</label>
                    <input className={CSS.inputs} type="email" id="email" 
                        {...register("email", {
                            onChange: () => setEmailInUse(''),
                            pattern: {
                                value: email_regex,
                                message: 'Μη έγκυση διεύθυνση email',
                            },
                            required: 'Υποχρεωτικό πεδίο'
                        })} />

                    {emailInUse &&
                        <p className={'error_msg'}>{emailInUse}</p>
                    }




                    {/* @ts-ignore */}
                    {errors?.email &&
                        // @ts-ignore
                        <p className={'error_msg'}>{errors?.email?.message}</p>

                    }



                    {/* PASSWORD */}
                    <label htmlFor="password" className={CSS.fieldLabel}>Κωδικός πρόσβασης *</label>
                    <input className={CSS.inputs} type="password" id="password"
                        {...register("password", {
                            required: "Υποχρεωτικό πεδίο",
                            minLength: {
                                // value: 8,
                                value: 3,
                                message: "Password must have at least 8 characters"
                            }
                        })} />

                    {/* @ts-ignore */}
                    {errors?.password &&
                        // @ts-ignore
                        <p className={'error_msg'}>{errors?.password?.message}</p>
                    }




                    {/* REPEAT PASSWORD */}
                    <label htmlFor="confirm_password" className={CSS.fieldLabel}>Επανάληψη κωδικού*</label>
                    <input className={CSS.inputs} type="password" id="confirm_password" 
                        {...register("confirm_password", {
                            required: 'Υποχρεωτικό πεδίο',
                            // check if passwords match
                            validate: (val) => {
                                if (watch('password') !== val) {
                                    return "Your passwords do not match";
                                }
                            }
                        })} />
                    {/* @ts-ignore */}
                    {errors?.confirm_password &&
                        // @ts-ignore
                        <p className={'error_msg'}>{errors?.confirm_password?.message}</p>
                    }




                    {/* TERMS AND CONDITIONS CHECKBOX */}
                    <div className={CSS.terms}>
                        <input type='checkbox' id="terms"
                            {...register("checkbox", {
                                required: "You must agree with Terms & Conditions to create an account"
                            })}
                        />
                        <label htmlFor='terms' className={CSS.termsLabel}>By clicking here, I state that I have read and understood the terms and conditions * </label><br></br><br></br>
                        {/* @ts-ignore */}
                        <p className={'error_msg'}>{errors.checkbox?.message}</p>
                    </div>
                    <button>Create Account</button>
                </form>

                {
                    !accountCreated ?
                        <section>
                            Already have an account?
                            <br></br>
                            Login <Link to='/login' style={{ 'color': '#5F69C6' }}>here</Link>
                        </section>

                        :
                        <p>You are redirecting to Login..</p>
                }

            </div >
    )
}
