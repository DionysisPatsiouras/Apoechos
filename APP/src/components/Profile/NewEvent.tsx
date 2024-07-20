
import { forwardRef, useState, useContext, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import CSS from '../../css/Event/NewEvent.module.css'
import FormError from '../../utils/FormError'
import { Routes } from '../../utils/Routes'
import Call from '../../utils/Call'
import UtilsContext from '../../context/UtilsContext'

const NewEvent = forwardRef(function NewEvent(props: any, ref: any) {

    const form = useForm()
    const { register, handleSubmit, formState, watch } = form
    const { errors } = formState

    let { get_cities, cities }: any = useContext(UtilsContext)


    const [file, setFile] = useState<any>()
    const [existingLocation, setExistingLocation] = useState<boolean>(true)
    const [stages, setStages] = useState<any[]>([])

    let required_message = 'Υποχρεωτικό πεδίο'

    let get_stages = new Call(Routes.profiles.stages, 'GET')

    useEffect(() => {

        get_cities()

        get_stages
            .GET()
            .then((res) => setStages(res?.[1]))
            .catch((err) => console.warn(err))
    }, [])
    console.warn(stages)

    const onSubmit = (data: any) => {


        let formData: any = new FormData()

        console.log(data)
        // check if photo exists
        data?.file?.[0] && formData.append('photo', data?.file?.[0])

        data?.profile_location && formData.append('profile_location', data?.profile_location)

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



    return (
        <form onSubmit={handleSubmit(onSubmit)} noValidate className={CSS.new_event_form}>


            <div style={{ display: 'flex' }}>


                {/* <label htmlFor='picture' style={{ margin: '0 15px 0 0', width: '210px' }}>
                    <img src={file} width={210} className={CSS.cover_photo} alt='cover'
                        height={297} />
                </label> */}

                {/* <input
                    {...register('file')}
                    style={{ position: 'absolute', top: '-200000px' }}
                    type="file"
                    id="picture"
                    onChange={(file: any) => setFile(URL.createObjectURL(file.target.files[0]))}
                /> */}


                <div style={{ width: '100%' }}>

                    <input type='text' placeholder='Τίτλος' {...register('title')} />

                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div style={{ width: '49%' }}>
                            <label>Ημερομηνία*</label>
                            <input type='date' placeholder='Ημ/νία' style={{ marginRight: '10px' }} {...register('date')} />
                        </div>
                        <div style={{ width: '49%' }}>
                            <label>Ώρα έναρξης*</label>
                            <input type='time' placeholder='Ώρα' {...register('time', {
                                required: required_message
                            })} />
                        </div>
                        {/* <FormError value={errors.time}/> */}
                    </div>


                    <FormError value={errors.location} />
                </div>
            </div>

           


            {existingLocation ?
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <label>Τοποθεσία</label>
                    <ul>
                        {stages.map((stage: any) => (
                            <li className={`${CSS.profile_item} cursor-pointer`}>
                                <img src={`http://127.0.0.1:8000/${stage.photo}`} className='circle_img' />
                                <div>
                                    <h3>{stage.name}</h3>
                                    <h3 style={{color: 'grey'}}>{stage.city.name}</h3>
                                </div>
                                
                            </li>
                        ))}
                    </ul>
                    {/* <select {...register('profile_location')}>
                        <option selected></option>
                        {stages.map((stage: any, index: number) => (
                            <option key={index} value={stage?.profileId}>

                                {stage?.name}
                            </option>
                        ))}
                    </select> */}

                </div>

                :
                <>

                    <select {...register('city')}>
                        <option selected></option>
                        {cities?.map((city: any) => (
                            <option key={city.id} value={city.id}>{city.name}</option>
                        ))}
                    </select>


                    <input type='text' placeholder='address' />
                    <input type='text' placeholder='onoma' />
                </>
            }

            <div className='inline'>

                <input
                    style={{ width: 'autο' }}
                    type='checkbox'
                    onChange={() => setExistingLocation(!existingLocation)}
                    checked={existingLocation}
                />

                <span>Προσαρμοσμένη τοποθεσία</span>
            </div>

            <label>Support acts</label>
            <input type='text' />

            <label>Περισσότερες πληροφορίες</label>

            <textarea {...register('description')} className={CSS.description}>

            </textarea>



            <input type='submit' value='Δημιουργία' />

        </form>
    )
})

export default NewEvent

