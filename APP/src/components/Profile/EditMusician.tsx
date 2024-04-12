import { useForm } from 'react-hook-form'
import CSS from '../../css/Profile/EditMusician.module.sass'
import FormError from '../../utils/FormError'

export default function EditMusician(props: any) {


    const form = useForm()
    const { register, handleSubmit, formState, watch } = form
    const { errors } = formState

    const updateProfile = (data: any) => {
        console.log(data)
    }

 

    return (

        <form onSubmit={handleSubmit(updateProfile)} className={CSS.edit_form}>
            <input
                style={{ 'width': '218px' }}
                defaultValue={props?.data?.artistic_nickname}
                {...register('artistic_nickname', {
                    required: 'Υποχρεωτικό πεδίο'
                })}
            />
            <FormError value={errors?.artistic_nickname} />

            
            <input
                style={{ 'width': '218px' }}
                defaultValue={props?.data?.bio}
                {...register('bio')}
            />

            <button type='submit'>Αποθηκεύση</button>
            <button type='reset' style={{'backgroundColor' : '#9A9A9A'}} onClick={props?.editMode}>Ακύρωση</button>
        </form>


    )
}