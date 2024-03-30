import { useForm } from 'react-hook-form'
import axios from 'axios'
import { token, config } from '../../utils/Token'
import CSS from '../../css/Account/Account.module.css'
import { email_regex } from '../../utils/Regex'
import FormError from '../../utils/FormError'


export default function UpdateEmail(props: any) {

    const form = useForm()
    const { register, handleSubmit, formState } = form
    const { errors } = formState




    const updateEmail = (data: any) => {


        const finalData = {
            email: data?.email
        }
        // console.log(data?.email)
        axios
            .patch('http://127.0.0.1:8000/user/patch/', finalData, {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then((response) => { console.log(response) })
            .catch((error) => { console.warn(error) })
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