import { useForm } from 'react-hook-form'
import CSS from '../../css/Account/Account.module.css'
import FormError from '../../utils/FormError'
import Call from '../../utils/Call'
import { Routes } from '../../utils/Routes'


import { useSnackbarContext } from '../../context/SnackbarContext'


export default function UpdatePassword() {

    const form = useForm()
    const { register, handleSubmit, formState, watch } = form
    const { errors } = formState

    const { snackbar }: any = useSnackbarContext()

    const onSubmit = (data: any) => {

        const finalData = {
            password: data.password
        }
        const update_password = new Call(Routes.user.patch, 'PATCH', finalData)

        update_password
            .PATCH()
            .then((response) => { snackbar('Ο κωδικός πρόσβασης άλλαξε'); console.log(response); console.log('Password updated successfully') })
            .catch((error) => { console.warn(error) })


    }

    return (
        <section className={CSS.box}>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>


                <h3>Αλλαγή κωδικού</h3>
                <input type='password' id='password'
                    placeholder='Νέος κωδικός'
                    {...register('password', { required: 'Υποχρεωτικό πεδίο' })}
                />
                <FormError value={errors?.password} />

                <input className={CSS.inputs} type='password' id='confirm_password'
                    placeholder='Επανάληψη νέου κωδικού'
                    {...register('confirm_password', {
                        required: 'Υποχρεωτικό πεδίο',
                        validate: (val) => {
                            if (watch('password') !== val) {
                                return 'Οι κωδικοί δεν ταιριάζουν'
                            }
                        }
                    })} />

                <FormError value={errors?.confirm_password} />

                <button type='submit' className='blue_btn'>Ενημέρωση</button>
            </form>
        </section>
    )
}