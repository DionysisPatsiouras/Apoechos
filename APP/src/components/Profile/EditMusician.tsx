import { useForm } from 'react-hook-form'
import CSS from '../../css/Profile/EditMusician.module.sass'
import FormError from '../../utils/FormError'
import Call from '../../utils/Call'
import { Routes } from '../../utils/Routes'
import { useState } from 'react'

export default function EditMusician(props: any) {


    const form = useForm()
    const { register, handleSubmit, formState, watch } = form
    const { errors } = formState


    const [tab, setTab] = useState<number>(1)


    const updateProfile = (data: any) => {
        alert('ok')

        const patchMusician = new Call(Routes.musician.patch(props?.data?.musicianId), 'PATCH', data)

        patchMusician
            .PATCH()
            .then(() => {
                props?.updateDOM();
                // props?.editMode()
            })
            .catch((err) => console.warn(err))


    }



    return (
        <section className={CSS.container}>

            <ul className={CSS.tabs}>
                <li onClick={() => setTab(1)} style={{backgroundColor : tab === 1 ? '#5F69C6' : 'white'}}>Στοιχεία</li>
                <li onClick={() => setTab(2)}>Είδη</li>
                <li onClick={() => setTab(3)}>Όργανα</li>
            </ul>

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

                {/* <button type='submit'>Αποθηκεύση</button> */}
                {/* <button type='reset' style={{ 'backgroundColor': '#9A9A9A' }} onClick={props?.editMode}>Ακύρωση</button> */}
            </form>

        </section>
    )
}