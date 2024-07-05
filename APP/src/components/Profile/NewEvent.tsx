
import { forwardRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import CSS from '../../css/Event/NewEvent.module.css'
import FormError from '../../utils/FormError'
import { Routes } from '../../utils/Routes'
import Call from '../../utils/Call'

const NewEvent = forwardRef(function NewEvent(props: any, ref: any) {

    const form = useForm()
    const { register, handleSubmit, formState, watch } = form
    const { errors } = formState

    const [file, setFile] = useState<any>()

    let required_message = 'Υποχρεωτικό πεδίο'

    const onSubmit = (data: any) => {


        let formData: any = new FormData()

        console.log(data)
        // check if photo exists
        data?.file?.[0] && formData.append('photo', data?.file?.[0])

        formData.append('title', data?.title)
        formData.append('description', data?.description)
        formData.append('created_by', props?.created_by)
        // date not right
        formData.append('date', `${data?.date}-${data?.time}`)
        formData.append('main_bands', [props?.created_by])
        const new_event = new Call(Routes.events.new, 'POST', formData)

        new_event
            .POST_MEDIA()
            .then((res) => {
                console.log(res)
            })
            .catch((err) => console.warn(err))

    }
    // console.log(props)

    return (
        <form onSubmit={handleSubmit(onSubmit)} noValidate className={CSS.new_event_form}>


            <div style={{ display: 'flex' }}>


                <label htmlFor='picture' style={{ margin: '0 15px 0 0', width: '210px' }}>
                    <img src={file} width={210} className={CSS.cover_photo} alt='cover'
                        height={297} />
                </label>

                <input
                    {...register('file')}
                    style={{ position: 'absolute', top: '-200000px' }}
                    type="file"
                    id="picture"
                    onChange={(file: any) => setFile(URL.createObjectURL(file.target.files[0]))}
                />


                <div style={{ width: '100%' }}>
                    <label>Βασικές πληροφορίες</label>
                    <input type='text' placeholder='Τίτλος' {...register('title')} />
                    <div style={{ display: 'flex' }}>
                        <input type='date' placeholder='Ημ/νία' style={{ marginRight: '10px' }} {...register('date')} />
                        <input type='time' placeholder='Ώρα' {...register('time', {
                            required: required_message
                        })} />
                        {/* <FormError value={errors.time}/> */}
                    </div>

                    <input type='text' placeholder='Τοποθεσία' {...register('location', {
                        required: required_message
                    })} />
                    <FormError value={errors.location} />
                </div>
            </div>



            <label>Μέλη</label>
            <input type='text' />

            <label>Περισσότερες πληροφορίες</label>

            <textarea {...register('description')} className={CSS.description}>

            </textarea>



            <input type='submit' value='Δημιουργία' />

        </form>
    )
})

export default NewEvent

