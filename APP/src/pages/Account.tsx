import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import CSS from '../css/Account/Account.module.css'


import AuthContext from '../context/AuthContext'
import FormError from '../utils/FormError'

import Call from '../utils/Call'
import { Routes } from '../utils/Routes'
export default function Account() {

    let { logoutUser }: any = useContext(AuthContext)
    const form = useForm()
    const { register, handleSubmit, formState, watch } = form
    const { errors } = formState





    const delete_account = () => {
        const data = { is_active: false }
        let update_user = new Call(Routes.user.patch, 'PATCH', data)
        update_user.PATCH().then((res) => {
            console.log('User deleted sucessfully');
            alert("O λογαριασμός σας διεγράφη με επιτυχία")
            logoutUser()
        }).catch((err) => console.warn(err))
    }

    return (
        <div className='space'>

            <div className='container'>
                <h2>Ο Λογαριασμός μου</h2>
                <hr className='divider'></hr>



                <hr className='divider'></hr>
                <section className={CSS.box}>
                    <form noValidate>


                        <h3>Αλλαγή κωδικού</h3>
                        <input type='password' id='password'
                            placeholder='Νέος κωδικός'
                            {...register('password', {
                                required: 'Υποχρεωτικό πεδίο'
                            })}
                        />
                        <FormError value={errors?.password} />

                        <input className={CSS.inputs} type='password' id='confirm_password' placeholder='Επανάληψη νέου κωδικού'
                            {...register('confirm_password', {
                                required: 'Υποχρεωτικό πεδίο',
                                validate: (val) => {
                                    if (watch('password') !== val) {
                                        return 'Οι κωδικοί δεν ταιριάζουν'
                                    }
                                }
                            })} />

                        <FormError value={errors?.confirm_password} />

                        <button className='blue_btn'>Ενημέρωση</button>
                    </form>
                </section>


                <hr className='divider'></hr>
                <section className={CSS.box}>
                    <h3>Διαγραφή λογαριασμού</h3>
                    <strong>ΠΡΟΣΟΧΗ! <br></br>Αυτή η ενέργεια είναι οριστική. <br></br>Δεν θα μπορέσετε να επαναφέρετε το λογαριασμό σας</strong>
                    <button className='red_btn' onClick={() => delete_account()}>Διαγραφή</button>
                </section>
            </div>

        </div >
    )
}