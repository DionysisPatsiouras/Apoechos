import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'

// CSS
import CSS from '../../css/Events/NewEvent.module.css'

// utils
import Call from '../../utils/Call'
import { Routes } from '../../utils/Routes'
import FormError from '../../utils/FormError'

// components
import SvgIcon from '../../components/SvgIcon'
// import ProfileImage from '../../components/ProfileImage'

// context
import { useSnackbarContext } from '../../context/SnackbarContext'




interface EventViewProps {
    profileId: string;
    closeModal: () => void
}

export default function EventView({ profileId, closeModal }: EventViewProps) {


    const form = useForm()
    const { register, handleSubmit, formState, resetField } = form
    const { errors } = formState

    const { snackbar }: any = useSnackbarContext()


    let get_profiles = new Call(Routes.profiles.all, 'GET')

    let svg_color = '#C0C0C0'
    // let a4Ratio = 1.414
    let wastedMargin = 150
    let fields = ['file', 'title', 'description', 'date', 'time', 'location_name', 'address', 'profileId']


    const [height, setHeight] = useState<any>(undefined)
    const [selectedStage, setSelectedStage] = useState<any[]>([])
    const [selectedBands, setSelectedBands] = useState<any[]>([])
    const [customLocation, setCostumLocation] = useState<boolean>(false)


    const Post_event = (data: any) => {

        // console.log(data)
        let formData: any = new FormData()

        formData.append('photo', data?.file?.[0])
        data.title && formData.append('title', data?.title)
        formData.append('description', data?.description)
        formData.append('date', `${data.date} ${data.time}`)
        formData.append('created_by', profileId)




        let post_event = new Call(Routes.events.new, 'POST', formData)

        post_event
            .POST_MEDIA()
            .then((res) => {
                // console.log(res)
                console.log('Event uploaded successfully')
                snackbar('Η εκδήλωση δημοσιεύτηκε')

                closeModal()

                for (let index in fields) {
                    resetField(fields[index])
                }
            })
            .catch((err) => console.warn(err))

        // uploadedFile === undefined && alert('Ανεβάστε εικόνα')

    }

    useEffect(() => {
        document.title = 'Apoechos - Νέα εκδήλωση'
    }, [])


    return (
        <div className={`${CSS.container} items-inline`}>
            <form onSubmit={handleSubmit(Post_event)} noValidate className={CSS.formContainer}>
                <section className={CSS.leftSector}
                    style={{
                        height: `${height - wastedMargin}px`,
                        // width: `${(height - wastedMargin) / a4Ratio}px`
                    }}>
                    <img
                        // style={{
                        //     height: `${height - wastedMargin}px`,
                        //     width: `${(height - wastedMargin) / a4Ratio}px`
                        // }}
                        className={CSS.cover_photo}
                        // src={`http://127.0.0.1:8000/${event?.photo}`}
                        alt='profile_photo' />
                </section>

                <section className={CSS.rightSector}>

                    <div className={CSS.eventTitle}>
                        <label>Τίτλος <small>(προεραιτικό)</small></label>
                        <input type='text' placeholder='Προσθέστε τίτλο' {...register('title',
                            {
                                minLength: {
                                    value: 3,
                                    message: 'Πολύ μικρός τίτλος'
                                },
                                maxLength: {
                                    value: 250,
                                    message: 'Πολύ μεγάλος τίτλος'
                                }
                            }
                        )} />
                        <FormError value={errors?.title} />
                    </div>

                    <hr className={CSS.divider}></hr>

                    <h2 className={CSS.description_title}>Συγκροτήματα</h2>
                    <div className='items-inline' style={{ gap: '25px', flexWrap: 'wrap' }}>


                        <div className={CSS.addNewBand}>
                            <SvgIcon id='add' width={40} color='#c1c1c1' />
                        </div>
                        {/* {event?.main_bands.map((band: any, index: number) => (

                        <Link to={`/profile/${band?.profileId}`} key={index}>
                            <div className='items-inline' style={{ gap: '10px' }}>


                                <ProfileImage
                                    photo={band?.photo}
                                    size={60}
                                    style={{ margin: '0' }}
                                    key={index}
                                />
                                <div>
                                    <h2>{band?.name}</h2>
                                    <small>{band?.city?.name}</small>
                                </div>

                            </div>
                        </Link>
                    ))} */}

                    </div>

                    <hr className={CSS.divider}></hr>

                    <h2 className={CSS.description_title}>Περιγραφή</h2>
                    <textarea className={CSS.description_text} placeholder='Γράψτε μια περιγραφή'
                        {...register('description', {
                            required: 'Υποχρεωτικό πεδίο',
                            minLength: {
                                value: 3,
                                message: 'Πολύ μικρή περιγραφή'
                            },
                            maxLength: {
                                value: 250,
                                message: 'Πολύ μεγάλη περιγραφή'
                            }
                        })} />
                    <FormError value={errors?.description} />




                    <div className={`${CSS.iconsSection} items-inline`} style={{ gap: '30px', }}>


                        <div className='items-inline' style={{ gap: '10px' }}>
                            <SvgIcon id='calendar' color={svg_color} />
                            <input type='date' {...register('date', { required: 'Υποχρεωτικό πεδίο' })} />
                            {/* <FormError value={errors?.date} /> */}
                        </div>




                        <div className='items-inline' style={{ gap: '10px' }}>
                            <SvgIcon id='clock' color={svg_color} />
                            <input type='time' {...register('time', { required: 'Υποχρεωτικό πεδίο' })} />
                            {/* <FormError value={errors?.time} /> */}
                        </div>

                    </div>


                    <hr className={CSS.divider}></hr>

                    <div className={`${CSS.footer} items-inline`} style={{ gap: '100px' }}>

                        <div>
                            <p className={CSS.description_title}>Τοποθεσία</p>

                            <input type='checkbox' id='customLocation'
                                checked={customLocation}
                                onClick={() => setCostumLocation(!customLocation)} />
                            <label htmlFor='customLocation'>Προσαρμοσμένη τοποθεσία</label>
                            <div className={CSS.addNewBand}>
                                <SvgIcon id='add' width={40} color='#c1c1c1' />
                            </div>
                        </div>



                    </div>

                    <hr className={CSS.divider}></hr>

                    <div className={`${CSS.buttonsSection} items-inline`}>
                        <button type='submit'>Δημοσίευση</button>
                        <button type='button'>Ακύρωση</button>
                    </div>



                </section>


            </form>
        </div>
    )
}