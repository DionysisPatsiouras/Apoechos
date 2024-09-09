import { useContext, useState } from 'react'


// CSS
import CSS from '../../css/Events/NewEvent.module.css'

// utils
import Call from '../../utils/Call'
import { Routes } from '../../utils/Routes'
import FormError from '../../utils/FormError'

// components
import SvgIcon from '../../components/SvgIcon'

import Modal from '../Modal'
// context
// import { useSnackbarContext } from '../../context/SnackbarContext'
// import UtilsContext from '../../context/UtilsContext'
// import ProfileImage from '../ProfileImage'

import NewEventContext from '../../context/NewEventContext'
import SelectedProfile from '../Profile/SelectedProfile'
import PickBand from './PickBand'


interface EventViewProps {
    profileId: string;
    closeModal: () => void
}

export default function EventView({ profileId, closeModal }: EventViewProps) {


    let svg_color = '#C0C0C0'
    let wastedMargin = 250
    const {
        cities,
        modal, setModal,

        stages, setSelectedBands,
        selectedBands,
        selectedStage, setSelectedStage,
        handleSubmit,
        // Post_event,
        height, register, errors,
        customLocation, setCostumLocation,
        stageModal, setStageModal,
        check_img_type, uploadedFile

    }: any = useContext(NewEventContext)




    let a4Ratio = 1.414

    const Post_event = (data: any) => {

        // console.log(data)
        let formData: any = new FormData()

        formData.append('photo', data?.file?.[0])
        data.title && formData.append('title', data?.title)
        formData.append('description', data?.description)
        formData.append('date', `${data.date} ${data.time}`)
        formData.append('profile_location', selectedStage?.profileId)
        formData.append('created_by', profileId)

        for (let index in selectedBands) {
            formData.append('main_bands', selectedBands[index]?.profileId)
        }


        let post_event = new Call(Routes.events.new, 'POST', formData)

        post_event
            .POST_MEDIA()
            .then((res) => {
                // console.log(res)
                console.log('Event uploaded successfully')
                // snackbar('Η εκδήλωση δημοσιεύτηκε')

                closeModal()

                // for (let index in fields) {
                //     resetField(fields[index])
                // }
            })
            .catch((err) => console.warn(err))

        // uploadedFile === undefined && alert('Ανεβάστε εικόνα')

    }

    return (
        <div className={`${CSS.container} items-inline`}>

            <Modal open={modal} close={() => setModal(false)} withContainer btn title='Επιλογή συγκροτήματος'>
                <PickBand
                    bands={stages}
                    onClick={(e: any) => {
                        setModal(false)
                        setSelectedBands([...selectedBands, e])
                    }} />
            </Modal>

            <Modal open={stageModal} close={() => setStageModal(false)} withContainer btn title='Επιλογή Σκηνής'>
                <PickBand
                    bands={stages}
                    onClick={(e: any) => {
                        setStageModal(false)
                        setSelectedStage(e)
                    }} />
            </Modal>

            <form onSubmit={handleSubmit(Post_event)} noValidate className={CSS.formContainer}>
                <section className={CSS.leftSector}
                    style={{
                        // height: `${height - wastedMargin}px`,
                        // width: `${(height - wastedMargin) / a4Ratio}px`
                    }}>
                    <img
                        style={{
                            height: `${height - wastedMargin}px`,
                            width: `${(height - wastedMargin) / a4Ratio}px`
                        }}
                        className={CSS.cover_photo}
                        // src={`http://127.0.0.1:8000/${event?.photo}`}
                        src={uploadedFile}
                    // alt='profile_photo' 
                    />

                    <input
                        {...register('file')}
                        type="file"
                        id="picture"
                        accept="image/png, image/jpeg"
                        onChange={(file: any) => check_img_type(file)}
                        style={{ position: 'absolute', top: '-20000px' }}
                    />
                    <label htmlFor='picture'>test</label>
                    <FormError value={errors?.file} />
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
                    <div className='items-inline' style={{ gap: '20px', flexWrap: 'wrap', alignItems: 'flex-start' }}>


                        <div className={CSS.addNewBand}>
                            <SvgIcon id='add' width={40} color='#c1c1c1' onClick={() => setModal(!modal)} />
                        </div>
                        {selectedBands.map((band: any, index: number) => (

                            <SelectedProfile
                                key={index}
                                profile={band}
                                onClick={() => setSelectedBands((prev: any) => prev.filter((selectedBands: any) =>
                                    selectedBands?.profileId !== band?.profileId))}
                            />

                        ))}


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

                            <div className='items-inline' style={{ marginBottom: '20px', gap: '5px' }}>

                                <input type='checkbox' id='customLocation' style={{ margin: 0 }}
                                    checked={customLocation}
                                    onClick={() => setCostumLocation(!customLocation)} />
                                <label htmlFor='customLocation'>Προσαρμοσμένη τοποθεσία</label>
                            </div>
                            {customLocation ?
                                <div className={CSS.customLocationFields}>
                                    <div className="column">
                                        <label>Όνομα</label>
                                        <input type='text'{...register('location_name', {
                                            required: 'Υποχρεωτικό πεδίο',
                                            minLength: {
                                                value: 3,
                                                message: 'Πολύ μικρό κείμενο'
                                            }
                                        })} />
                                        <FormError value={errors?.location_name} />
                                    </div>
                                    <div className="column">
                                        <label>Πόλη</label>
                                        <select {...register('city', { required: 'Υποχρεωτικό πεδίο' })}>
                                            <option selected></option>
                                            {cities?.map((city: any) => (
                                                <option key={city.id} value={city.id}>{city.name}</option>
                                            ))}
                                        </select>
                                        <FormError value={errors?.city} />
                                    </div>
                                    <div className="column">
                                        <label>Διεύθυνση</label>
                                        <input type='text'
                                            {...register('address', {
                                                required: 'Υποχρεωτικό πεδίο',
                                                minLength: {
                                                    value: 3,
                                                    message: 'Πολύ μικρό κείμενο'
                                                }
                                            })} />
                                        <FormError value={errors?.address} />
                                    </div>
                                </div>

                                :
                                <div>

                                    {selectedStage ?

                                        <SelectedProfile profile={selectedStage} onClick={() => setSelectedStage()} />
                                        :
                                        <div className={CSS.addNewBand}>
                                            <SvgIcon id='add' width={40} color='#c1c1c1' onClick={() => setStageModal(!stageModal)} />
                                        </div>
                                    }


                                </div>
                            }

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