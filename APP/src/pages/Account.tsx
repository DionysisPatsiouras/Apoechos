import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import CSS from '../css/Account/Account.module.css'
import axios from 'axios'

import AuthContext from '../context/AuthContext'
import FormError from '../utils/FormError'
import UpdateEmail from '../components/Account/UpdateEmail'
import { token, config } from '../utils/Token'

export default function Account() {

    let { userData }: any = useContext(AuthContext)
    const form = useForm()
    const { register, handleSubmit, formState, watch } = form
    const { errors } = formState

    const updateUser = (data: any) => {

        axios
            .patch('http://127.0.0.1:8000/user/patch/', data, {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then((response) => { console.log(response) })
            .catch((error) => { console.warn(error) })

    }

    const updateEmail = (data:any) => {
        updateUser(data)
    }

    const updatePassword = (data: any) => {
        console.warn(data)

        const finalData = {
            password: data?.password
        }

        updateUser(finalData)

    }

    return (
        <div className='space'>

            <div className='container'>
                <h2>Ο Λογαριασμός μου</h2>
                <hr className='divider'></hr>
         
                {/* not updating */}
                <UpdateEmail defaultValue={userData?.email}/>

                <hr className='divider'></hr>
                <section className={CSS.box}>
                    <form onSubmit={handleSubmit(updatePassword)} noValidate>


                        <h3>Αλλαγή κωδικού</h3>
                        <input type='password' id='password'
                            placeholder='Νέος κωδικός'
                            {...register('password', {
                                required: 'Υποχρεωτικό πεδίο'
                            })}
                        />
                        <FormError value={errors?.password} />

                        <input className={CSS.inputs} type='password' id='confirm_password'
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
                    <button className='red_btn'>Διαγραφή</button>
                </section>
            </div>

        </div >
    )
}