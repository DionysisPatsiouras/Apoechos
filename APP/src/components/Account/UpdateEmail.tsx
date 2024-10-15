import { useForm } from 'react-hook-form'
import axios from 'axios'
import { token, config } from '../../utils/Token'
import CSS from '../../css/Account/Account.module.css'
import { email_regex } from '../../utils/Regex'
import FormError from '../../utils/FormError'
import Call from '../../utils/Call'
import { Routes } from '../../utils/Routes'

export default function UpdateEmail(props: any) {

    const form = useForm()
    const { register, handleSubmit, formState } = form
    const { errors } = formState



    const updateEmail = (data: any) => {


        const finalData = {
            email: data?.email
        }

        let updateUser = new Call(Routes.user.patch, 'PATCH', finalData)


        updateUser
            .PATCH()
            .then((res) => console.log('User updated successfully', res))
            .catch((error) =>  console.warn(error) )
    }

    return (
        <form onSubmit={handleSubmit(updateEmail)} noValidate>
            <section className={CSS.box}>

                <h3>Αλλαγή email</h3>
                <input
                    type='text'
                    defaultValue={props?.defaultValue}

                    {...register('email', {
                        pattern: {
                            value: email_regex,
                            message: 'Μη έγκυρη διεύθυνση email'
                        }
                    })}
                />
                <FormError value={errors?.email} />

                <button type='submit' className='blue_btn'>Ενημέρωση</button>
            </section>
        </form>
    )
}