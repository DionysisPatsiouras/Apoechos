import { useForm } from 'react-hook-form'
import CSS from '../../css/Profile/EditMusician.module.sass'
import FormError from '../../utils/FormError'
import axios from 'axios'
import { config } from '../../utils/Token'

export default function EditMusician(props: any) {


    const form = useForm()
    const { register, handleSubmit, formState, watch } = form
    const { errors } = formState

    const updateProfile = (data: any) => {
        // console.log(data)

        axios
            .patch(`http://127.0.0.1:8000/profiles/musician/patch/${props?.data?.musicianId}/`, data, config)
            .then((res) => {
                // console.log('res', res);
                props?.updateDOM();
                props?.editMode()
            })
            .catch((err) => console.warn('err', err))

    }



    return (

        <form onSubmit={handleSubmit(updateProfile)} className={CSS.edit_form}>
            <input
                
                defaultValue={props?.data?.artistic_nickname}
                {...register('artistic_nickname', {
                    required: 'Υποχρεωτικό πεδίο'
                })}
            />
            <FormError value={errors?.artistic_nickname} />


            <textarea
               
                defaultValue={props?.data?.bio}
                {...register('bio')}
            />

            <button type='submit'>Αποθηκεύση</button>
            <button type='reset' style={{ 'backgroundColor': '#9A9A9A' }} onClick={props?.editMode}>Ακύρωση</button>
        </form>


    )
}