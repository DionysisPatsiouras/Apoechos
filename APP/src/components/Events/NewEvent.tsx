import { useContext, forwardRef } from 'react'


// CSS
import CSS from '../../css/Events/NewEvent.module.css'

// utils
import FormError from '../../utils/FormError'
import TextField from '../TextField'

// components
import SvgIcon from '../../components/SvgIcon'

import Modal from '../Modal'
// context
// import { useSnackbarContext } from '../../context/SnackbarContext'
// import UtilsContext from '../../context/UtilsContext'
// import ProfileImage from '../ProfileImage'

import NewEventContext from '../../context/NewEventContext'
import SelectedProfile from '../Profile/SelectedProfile'
import PickProfile from './PickProfile'


interface EventViewProps {
    closeModal: () => void
    profileId: string
    data: any
}




// export default function NewEvent({ closeModal, profileId, data }: any) {
const NewEvent = forwardRef(function NewEvent({ closeModal, profileId, data }: any, ref) {


    let svg_color = '#C0C0C0'


    const {
        cities,
        modal, setModal,

        all_stages, setSelectedBands,
        selectedBands,
        selectedStage, setSelectedStage,
        handleSubmit,

        height, register, errors,
        customLocation, setCostumLocation,
        stageModal, setStageModal,
        check_img_type, uploadedFile,
        a4Ratio,
        wastedMargin,

        supportModal, setSupportModal,
        supportActs, setSupportActs,
        bands_and_musicians,
        Post_event, Update_event,

    }: any = useContext(NewEventContext)


    // console.log(uploadedFile)
    // console.log(data)


    return (
        <div className={`${CSS.container} items-inline`} >

            <Modal open={modal} close={() => setModal(false)} withContainer btn title='Επιλογή συγκροτήματος'>
                <PickProfile
                    bands={bands_and_musicians.filter((profile: any) => !selectedBands.includes(profile) && !supportActs.includes(profile))}
                    onClick={(e: any) => {
                        setModal(false)
                        setSelectedBands([...selectedBands, e])
                    }} />
            </Modal>

            <Modal open={stageModal} close={() => setStageModal(false)} withContainer btn title='Επιλογή Σκηνής'>
                <PickProfile
                    bands={all_stages}
                    onClick={(e: any) => {
                        setStageModal(false)
                        setSelectedStage(e)
                    }} />
            </Modal>

            <Modal open={supportModal} close={() => setSupportModal(false)} withContainer btn title='Επιλογή support act'>
                <PickProfile
                    bands={bands_and_musicians.filter((profile: any) => !selectedBands.includes(profile) && !supportActs.includes(profile))}
                    onClick={(e: any) => {
                        setSupportModal(false)
                        setSupportActs([...supportActs, e])
                    }} />
            </Modal>

            <form onSubmit={handleSubmit(!data ? Post_event : Update_event)} noValidate className={CSS.formContainer}>


                
                <section className={`${CSS.leftSector} column`}>
                    <label htmlFor='picture' className='column'>
                        <img
                            style={{
                                height: `${height - wastedMargin}px`,
                                width: `${(height - wastedMargin) / a4Ratio}px`
                            }}
                            className={CSS.cover_photo}
                            src={data ? `http://127.0.0.1:8000/${data?.photo}` : uploadedFile}
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
                        <div className='items-inline' style={{ justifyContent: 'center', marginTop: '10px' }}>
                            <SvgIcon id='upload-image' />
                            <b>Μεταφόρτωση</b>
                        </div>

                    </label>

                    <FormError value={errors?.file} />

                </section>

                <section className={CSS.rightSector}>

                    <div className={CSS.eventTitle}>

                        <TextField
                            label='Τίτλος(προεραιτικό)'
                            register={register}
                            name='title'
                            errors={errors}
                        />

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
                    <h2 className={CSS.description_title}>Support acts</h2>
                    <div className='items-inline' style={{ gap: '20px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
                        <div className={CSS.addNewBand}>
                            <SvgIcon id='add' width={40} color='#c1c1c1' onClick={() => setSupportModal(!supportModal)} />
                        </div>
                        {supportActs.map((band: any, index: number) => (
                            <SelectedProfile
                                key={index}
                                profile={band}
                                onClick={() => setSupportActs((prev: any) => prev.filter((profile: any) =>
                                    profile?.profileId !== band?.profileId))}
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
                                    onChange={() => setCostumLocation(!customLocation)} />
                                <label htmlFor='customLocation'>Προσαρμοσμένη τοποθεσία</label>
                            </div>
                            {customLocation ?
                                <div className={CSS.customLocationFields}>

                                    <TextField
                                        label='Όνομα χώρου'
                                        register={register}
                                        required
                                        name='location_name'
                                        errors={errors}
                                    />


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


                                    <TextField
                                        label='Διεύθυνση'
                                        register={register}
                                        required
                                        name='address'
                                        errors={errors}
                                    />


                                </div>

                                :
                                <>

                                    {selectedStage ?

                                        <SelectedProfile profile={selectedStage} onClick={() => setSelectedStage()} />
                                        :
                                        <div className={CSS.addNewBand}>
                                            <SvgIcon id='add' width={40} color='#c1c1c1' onClick={() => setStageModal(!stageModal)} />
                                        </div>
                                    }


                                </>
                            }

                        </div>
                    </div>



                    <hr className={CSS.divider}></hr>

                    <div className={`${CSS.buttonsSection} items-inline`}>
                        <button type='submit'>Δημοσίευση</button>
                        <button type='button' onClick={closeModal}>Ακύρωση</button>
                    </div>



                </section>


            </form>
        </div>
    )
// }
})
export default NewEvent