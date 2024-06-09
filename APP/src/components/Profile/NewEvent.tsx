
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

        let formData = new FormData()
        formData.append('file', data?.file?.[0])



        const finalData = {
            title: data?.title,
            date: `${data?.date} ${data?.time}`,
            description: data?.description,
            photo: data?.file?.[0],
            location: data?.location,
            created_by: "dasdad"
        }


        const new_event = new Call(Routes.events.new, 'POST', finalData)

        new_event.POST_MEDIA().then((res) => console.log(res))

        console.log(data)
        console.warn(finalData)
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} noValidate className={CSS.new_event_form}>


            <div style={{ display: 'flex' }}>


                <label htmlFor='picture' style={{ margin: '0 15px 0 0', width: '210px' }}>
                    <img src={file} width={210} className={CSS.cover_photo}
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

