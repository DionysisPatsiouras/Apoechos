import { useContext } from 'react'
import { useForm } from 'react-hook-form'

import { Navigate, Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext'

import CSS from '../css/Login/Login.module.css'

import { email_regex } from '../utils/Regex'


export default function Login() {


    let { loginUser, user }: any = useContext(AuthContext)


    const form = useForm<any>()
    const { register, handleSubmit, formState } = form
    const { errors } = formState


    const onSubmit = (data: { email: any, password: any }) => {
        loginUser(data)
    }

    return (

        user ?
            <Navigate to="/discover" />
            :
            <div className={CSS.container}>

                <h6 className={CSS.title}>Σύνδεση</h6>

                <form onSubmit={handleSubmit(onSubmit)}>

                    <label htmlFor="email" >E-mail *</label>
                    <input
                        className={CSS.inputs}
                        type='email'
                        {...register('email', {
                            required: 'Υποχρεωτικό πεδίο',
                            pattern: {
                                value: email_regex,
                                message: 'Μη έγκυρη διεύθυνση email'
                            }
                        })}
                    />

                    {/* @ts-ignore */}
                    {errors?.email &&
                        // @ts-ignore
                        <p className={'error_msg'}>{errors?.email?.message}</p>
                    }


                    <label htmlFor="password" >Κωδικός πρόσβασης *</label>
                    <input
                        className={CSS.inputs}
                        type='password'
                        {...register('password', {
                            required: 'Υποχρεωτικό πεδίο'
                        })}
                    />


                    {/* @ts-ignore */}
                    {errors?.password &&
                        // @ts-ignore
                        <p className={'error_msg'}>{errors?.password?.message}</p>
                    }

                    <button type='submit'>Σύνδεση</button>
                </form>


                <section>
                    Don’t have an account?
                    <br></br>
                    Register <Link to='/register' style={{ 'color': '#5F69C6' }}>here</Link>
                </section>

            </div>
    )
}

