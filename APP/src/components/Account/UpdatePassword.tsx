import { useForm } from 'react-hook-form'
import axios from 'axios'
import { token, config } from '../../utils/Token'
import CSS from '../../css/Account/Account.module.css'
import FormError from '../../utils/FormError'

export default function UpdatePassword() {

    const form = useForm()
    const { register, handleSubmit, formState, watch } = form
    const { errors } = formState

    const updatePassword = (data: any) => {

        const finalData = {
            password: data?.password
        }

        axios
            .patch('http://127.0.0.1:8000/user/patch/', data, {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then((response) => { console.log(response) })
            .catch((error) => { console.warn(error) })
    }

    return (
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
    )
}