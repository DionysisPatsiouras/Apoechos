
import { forwardRef } from 'react'
import { useForm } from 'react-hook-form'
import CSS from '../../css/Event/NewEvent.module.css'
import FormError from '../../utils/FormError'

const NewEvent = forwardRef(function NewEvent(props: any, ref: any) {

    const form = useForm()
    const { register, handleSubmit, formState, watch } = form
    const { errors } = formState

    let required_message = 'Υποχρεωτικό πεδίο'

    const onSubmit = (data: {}) => {
        console.log(data)
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} noValidate className={CSS.new_event_form}>


            <div style={{ display: 'flex' }}>
                <img src={'asd'} className={CSS.cover_photo} width={'210'} height={'297'} />
                <div>
                    <label>Βασικές πληροφορίες</label>
                    <input type='text' placeholder='Τίτλος' {...register('title')} />
                    <div style={{ display: 'flex' }}>
                        <input type='date' placeholder='Ημ/νία' style={{ marginRight: '10px' }} {...register('date')} />
                        <input type='time' placeholder='Ώρα' {...register('time', {
                            required : required_message
                        })} />
                        {/* <FormError value={errors.time}/> */}
                    </div>

                    <input type='text' placeholder='Τοποθεσία' {...register('location' , {
                        required: required_message
                    })}/>
                    <FormError value={errors.location}/>
                </div>
            </div>



            <label>Μέλη</label>
            <input type='text' />

            <label>Περισσότερες πληροφορίες</label>
            <input type='text' style={{height : '200px'}}/>
            


            <input type='submit' value='Δημιουργία' />

        </form>
    )
})

export default NewEvent

