import { useContext, useState } from 'react'
import { Navigate, Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import AuthContext from '../context/AuthContext'
import CSS from '../css/Login/Login.module.css'

// utils
import Call from '../utils/Call'
import { Routes } from '../utils/Routes'
import FormError from '../utils/FormError'

// regex
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

        const registerUser = new Call(Routes.auth.register, 'POST', data)
        console.log(data)
        registerUser
            .POST_NO_TOKEN()
            .then((res) => {
                // console.log(res)
                setAccountCreated(true)
                setTimeout(() => {
                    navigate('/login');
                }, 1500)
            })
            .catch((err) => {
                console.log(err)
                setEmailInUse(err.response.data.email)
                setEmailInUse('To email χρησιμοποιείται ήδη')
            })

        console.log('Form submitted', data)

    }


    return (
        user ?
            <Navigate to="/discover" /> :



            <div className={CSS.container}>

                <h6 className={CSS.title}>{accountCreated ? 'Επιτυχής εγγραφή!' : 'Εγγραφή'}</h6>
                <form onSubmit={handleSubmit(onSubmit)} noValidate style={{ 'display': accountCreated ? 'none' : 'flex' }}>
                    <div style={{display: 'flex', gap: '20px'}}>
                        <div>
                            <div style={{ display: 'flex', flexDirection: 'column'}}>

                                {/* EMAIL */}
                                <label htmlFor="email" className={CSS.fieldLabel}>E-mail</label>
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


                                <FormError value={errors?.email} />
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                {/* DATE */}
                                <label htmlFor="password" className={CSS.fieldLabel}>Ημ/νία γέννησης</label>
                                <input className={CSS.inputs} type="date" id="password"
                                    {...register("birthdate", {
                                        required: "Υποχρεωτικό πεδίο",

                                    })} />

                                <FormError value={errors?.password} />
                            </div>
                        </div>
                        <div>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                {/* PASSWORD */}
                                <label htmlFor="password" className={CSS.fieldLabel}>Κωδικός πρόσβασης</label>
                                <input className={CSS.inputs} type="password" id="password"
                                    {...register("password", {
                                        required: "Υποχρεωτικό πεδίο",
                                        minLength: {
                                            // value: 8,
                                            value: 3,
                                            message: "Πολύ μικρός κωδικός πρόσβασης"
                                        }
                                    })} />

                                <FormError value={errors?.password} />


                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                {/* REPEAT PASSWORD */}
                                <label htmlFor="confirm_password" className={CSS.fieldLabel}>Επανάληψη κωδικού</label>
                                <input className={CSS.inputs} type="password" id="confirm_password"
                                    {...register("confirm_password", {
                                        required: 'Υποχρεωτικό πεδίο',
                                        // check if passwords match
                                        validate: (val) => {
                                            if (watch('password') !== val) {
                                                return "Οι κωδικοί δεν ταιριάζουν";
                                            }
                                        }
                                    })} />

                                <FormError value={errors?.confirm_password} />
                            </div>



                          

                        </div>
                    </div>
                      {/* TERMS AND CONDITIONS CHECKBOX */}
                      <div className={`${CSS.terms} items-inline`} >
                                <input type='checkbox' id="terms"
                                    {...register("checkbox", {
                                        required: "You must agree with Terms & Conditions to create an account"
                                    })}
                                />
                                <label htmlFor='terms' className={CSS.termsLabel}>
                                    Συμφωνώ με τους όρους χρήσης της εφαρμογής
                                </label>

                                <FormError value={errors.checkbox} />
                            </div>

                            <button className={CSS.form_btn}>Επιβεβαίωση</button>
                </form>



                {
                    !accountCreated ?
                        <section>
                            Είσαι ήδη εγγεγραμμένος;
                            <br></br>
                            Συνδέσου <Link to='/login' style={{ 'color': '#5F69C6' }}>εδώ</Link>
                        </section>

                        :
                        <p>Ανακατεύθυνση..</p>
                }

            </div >
    )
}
