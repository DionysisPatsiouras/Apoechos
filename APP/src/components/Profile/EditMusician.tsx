import { useForm } from 'react-hook-form'

export default function EditMusician(props: any) {


    const form = useForm()
    const { register, handleSubmit, formState, watch } = form
    const { errors } = formState

    const updateProfile = (data: any) => {
        console.log(data)
    }

    console.log(props)

    return (
        <div>
            <form onSubmit={handleSubmit(updateProfile)} >
                <input
                    style={{ 'width': '218px' }}
                    defaultValue={props?.data?.artistic_nickname}
                    {...register('artistic_nickname')}
                />
                <input
                    style={{ 'width': '218px' }}
                    defaultValue={props?.data?.bio}
                    {...register('bio')}
                />

                <button type='submit'>Αποθηκεύση</button>
                <button type='reset' onClick={props?.editMode}>Ακύρωση</button>
            </form>

        </div>
    )
}