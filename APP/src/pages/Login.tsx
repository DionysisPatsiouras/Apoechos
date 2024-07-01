import { useContext } from 'react'
import { useForm } from 'react-hook-form'

import { Navigate, Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext'

import CSS from '../css/Login/Login.module.css'

import { email_regex } from '../utils/Regex'
import FormError from '../utils/FormError'

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
                        // value={'admin@mail.com'}
                        {...register('email', {
                            required: 'Υποχρεωτικό πεδίο',
                            pattern: {
                                value: email_regex,
                                message: 'Μη έγκυρη διεύθυνση email'
                            }
                        })}
                    />

                    <FormError value={errors?.email} />


                    <label htmlFor="password" >Κωδικός πρόσβασης *</label>
                    <input
                        // value={'123'}
                        className={CSS.inputs}
                        type='password'
                        {...register('password', {
                            required: 'Υποχρεωτικό πεδίο'
                        })}
                    />




                    <FormError value={errors?.password} />


                    <button className={CSS.form_btn} type='submit'>Σύνδεση</button>
                </form>


                <section>
                    Δεν έχεις λογαριασμό;
                    <br></br>
                    Κάνε εγγραφή <Link to='/register' style={{ 'color': '#5F69C6' }}>εδώ</Link>
                </section>

            </div>
    )
}

