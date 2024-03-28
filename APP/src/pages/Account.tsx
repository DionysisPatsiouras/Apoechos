import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import CSS from '../css/Account/Account.module.css'

import AuthContext from '../context/AuthContext'

export default function Account() {

    let { userData }: any = useContext(AuthContext)
    const form = useForm()
    const { register, handleSubmit, formState, watch } = form
    const { errors } = formState


    return (
        <div className='space'>

            <div className='container'>
                <h2>Ο Λογαριασμός μου</h2>
                <hr className='divider'></hr>

                <section className={CSS.box}>
                    <h3>Αλλαγή email</h3>
                    <input type='text' {...register('email')} defaultValue={userData?.email} />
                    <button className='blue_btn'>Ενημέρωση</button>
                </section>


                <hr className='divider'></hr>
                <section className={CSS.box}>
                    <h3>Αλλαγή κωδικού</h3>
                    <input type='text' {...register('password')} placeholder='Νέος κωδικός' />
                    <input type='text' {...register('pass2')} placeholder='Επανάληψη νέου κωδικού' />
                    <button className='blue_btn'>Ενημέρωση</button>
                </section>


                <hr className='divider'></hr>
                <section className={CSS.box}>
                    <h3>Διαγραφή λογαριασμού</h3>
                    <strong>ΠΡΟΣΟΧΗ! <br></br>Αυτή η ενέργεια είναι οριστική. <br></br>Δεν θα μπορέσετε να επαναφέρετε το λογαριασμό σας</strong>
                    <button className='red_btn'>Διαγραφή</button>
                </section>
            </div>

        </div>
    )
}