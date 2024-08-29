import { useEffect, useState, useContext } from "react"
import { useForm } from 'react-hook-form'
import CSS from '../css/Event/NewEvent.module.css'
import SvgIcon from "../components/SvgIcon"
import FormError from "../utils/FormError"
import Call from "../utils/Call"
import { Routes } from "../utils/Routes"
import UtilsContext from "../context/UtilsContext"
import SearchValidation from "../utils/SearchValidation"
import ProfileListItem from "../components/ProfileListItem"
import UserContext from "../context/UserContext"
import { useSnackbarContext } from '../context/SnackbarContext'
// import { Img } from "react-optimized-image"
// import { useDebounce } from "use-debounce"


export default function NewEvent(props: any) {

    const [step, setStep] = useState<number>(1)

    const form = useForm()
    const { register, handleSubmit, formState } = form
    const { errors }: any = formState


    const { snackbar }: any = useSnackbarContext()


    const [uploadedFile, setUploadedFile] = useState<any>()
    const [costumLocation, setCostumLocation] = useState<boolean>(false)
    const [search, setSearch] = useState<string>('')

    const [stages, setStages] = useState<any[]>([])
    const [selectedStage, setSelectedStage] = useState<any[]>([])
    const [selectedBands, setSelectedBands] = useState<any[]>([])
    // const [selectedSupportActs, setSelectedSupportActs] = useState<any[]>([])



    let stepInfo = [
        { id: 1, title: 'Βασικές πληροφορίες', info: 'Προσθέστε τις βασικές πληροφορίες της εκδήλωσης. Τα κελιά με την ένδειξη: "*" είναι υποχρεωτικά' },
        {
            id: 2, title: 'Επιλογή Σκηνής',
            info: 'Επιλέξτε τη σκηνή στην οποία θα πάρει μέρος η εκδήλωση. Στην περίπτωση που η σκηνή δεν είναι μέλος του apoechos.gr επιλέξτε "Προσαρμοσμένη τοποθεσία" ',
        },
        { id: 3, title: 'Συμμετέχοντες', info: 'Διαλέξτε της βασικούς συμμετέχοντες της εκδήλωσης' }
    ]


    let get_stages = new Call(Routes.profiles.all, 'GET')


    let { get_cities, cities, }: any = useContext(UtilsContext)

    useEffect(() => {
        get_stages
            .GET()
            .then((res) => setStages(res?.[1]))
            .catch((err) => console.warn(err))

        get_cities()
        // get_my_profiles()
        document.title = 'Apoechos - Νέα εκδήλωση'

    }, [])

    // console.log(me)
    // console.log(my_profiles)

    const check_img_type = (file: any) => {
        setUploadedFile(
            file?.target?.files?.[0]?.type === "image/jpeg" ||
                file?.target?.files?.[0]?.type === "image/jpg" ||
                file?.target?.files?.[0]?.type === "image/png"
                ? URL.createObjectURL(file?.target?.files?.[0])
                : alert('Μη επιτρεπόμενη μορφή αρχείου\nΕπιτρεπόμενες μορφές: .png, .jpg, .jpeg'))
    }

    const Post_event = (formdata: any) => {


        let formData: any = new FormData()

        uploadedFile === undefined && alert('Ανεβάστε εικόνα')

        if (step !== 3 && uploadedFile !== undefined) {
            setStep(step + 1)
        } else {


            formData.append('photo', formdata?.file?.[0])
            formdata.title && formData.append('title', formdata?.title)
            formData.append('description', formdata?.description)
            formData.append('date', `${formdata.date} ${formdata.time}`)

            if (!costumLocation) {
                // @ts-ignore
                formData.append('profile_location', selectedStage?.profileId)
            } else {
                formData.append('location_name', formdata.location_name)
                formData.append('city', formdata.city)
                formData.append('address', formdata.address)
            }
            for (let index in selectedBands) {
                formData.append('main_bands', selectedBands[index]?.profileId)

            }
            formData.append('created_by', props?.profileId)

            let post_event = new Call(Routes.events.new, 'POST', formData)

            post_event
                .POST_MEDIA()
                .then((res) => {
                    // console.log(res)
                    console.log('Event uploaded successfully')
                    snackbar('Η εκδήλωση δημοσιεύτηκε')
                    props?.closeModal()
                })
                .catch((err) => console.warn(err))


        }
    }
    // console.log(selectedBands)

    return (
        <div>
            {/* <section className={`${CSS.head} items-inline`}>
                <div>
                    <h1 className={CSS.stepTitle}> {stepInfo[step - 1]?.title}</h1>
                    <br></br>
                    <p className={CSS.information}>{stepInfo?.[step - 1]?.info}</p>
                </div>

                <h2>Βήμα {step} / 3</h2>
            </section> */}


            <form onSubmit={handleSubmit(Post_event)} noValidate >


                {step === 1 &&
                    <section className={`${CSS.step1Container} items-inline`} >
                        <div className={CSS.uploadPhoto} >
                            <label htmlFor='picture' className='cursor-pointer'>
                                <div className={CSS.bg}>
                                    <img className={CSS.image_preview} src={uploadedFile} width={20} height={20} alt='uploaded file' />
                                </div>
                            </label>
                            {uploadedFile ?
                                <p
                                    className={`${CSS.space_around} cursor-pointer`}
                                    onClick={() => setUploadedFile(undefined)}>
                                    <SvgIcon id='delete' />
                                    Διαγραφή
                                </p>
                                :
                                <label
                                    className={`${CSS.uploadLabel} cursor-pointer`}
                                    htmlFor='picture'><SvgIcon id={'upload-image'} /> Μεταφόρτωση</label>
                            }

                            <input
                                {...register('file')}
                                type="file"
                                id="picture"
                                accept="image/png, image/jpeg"
                                onChange={(file: any) => check_img_type(file)}
                                style={{ position: 'absolute', top: '-20000px' }}
                            />
                            <FormError value={errors?.file} />


                        </div>

                        <div className={CSS.step1Fields}>


                            <label>Τίτλος (προεραιτικό)</label>
                            <input type='text' {...register('title')} />
                            <label>Περιγραφή (Υποχρεωτικό)</label>
                            <textarea

                                className={CSS.description}
                                {...register('description', {
                                    required: 'Υποχρεωτικό πεδίο',
                                    minLength: {
                                        value: 3,
                                        message: 'Πολύ μικρή περιγραφή'
                                    },
                                    maxLength: {
                                        value: 10,
                                        message: 'Πολύ μεγάλη περιγραφή'
                                    }
                                })} />
                            <FormError value={errors?.description} />

                            <div className='items-inline' style={{ gap: '15px' }}>


                                <div className={`${CSS.date_and_time} column`}>
                                    <label>Ημερομηνία*</label>
                                    <input type='date' placeholder='Ημ/νία'
                                        {...register('date', {
                                            required: 'Υποχρεωτικό πεδίο'
                                        })} />
                                    <FormError value={errors?.date} />
                                </div>
                                <div className={`${CSS.date_and_time} column`}>
                                    <label>Ώρα έναρξης*</label>
                                    <input type='time' placeholder='Ώρα' {...register('time', {
                                        required: 'Υποχρεωτικό πεδίο'
                                    })} />
                                    <FormError value={errors?.time} />
                                </div>
                            </div>
                        </div>


                    </section>
                }



                {step === 2 &&

                    <section className={`${CSS.step2Container} items-inline`} >

                        <section className={`${CSS.step2Head} items-inline`}>

                            <div className='items-inline' style={{ gap: '10px' }}>

                                <input type='checkbox' id='custom_location'
                                    onChange={() => setCostumLocation(!costumLocation)}
                                    checked={costumLocation}
                                />
                                <label htmlFor='custom_location'>Προσαρμοσμένη τοποθεσία</label>

                            </div>

                            {!costumLocation && selectedStage.length === 0 &&
                                <input type='search' placeholder='Αναζήτηση σκηνής..'
                                    onChange={(e: any) => setSearch(e.target.value)}
                                />
                            }

                        </section>


                        {costumLocation
                            ?
                            <div className={CSS.costumFields} >
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
                            <div style={{ margin: '0 auto' }}>
                                {selectedStage.length !== 0 ?
                                    <div className={CSS.stageSelection}>
                                        <div className='items-inline' style={{ justifyContent: 'space-between' }}>
                                            <label>Επιλέχθηκε:</label>
                                            <SvgIcon id='close' width={15} onClick={() => setSelectedStage([])} color='#fff' />

                                        </div>

                                        <ProfileListItem profile={selectedStage} />
                                    </div>
                                    :
                                    <>
                                        <div className={CSS.stagesList} >
                                            {stages
                                                .filter((stage: any) => SearchValidation(stage?.name, search))
                                                .map((stage: any) => (
                                                    <ProfileListItem
                                                        key={stage.profileId}
                                                        profile={stage}
                                                        onClick={() => { setSelectedStage(stage); setSearch('') }}
                                                    />
                                                ))}
                                        </div>
                                        <div style={{ textAlign: 'center' }}>

                                            {/* @ts-ignore */}
                                            <input type='hidden' value={selectedStage.profileId} {...register('profileId', { required: 'Επιλέξτε σκηνή' })} />
                                            <FormError value={errors?.profileId} />
                                        </div>
                                    </>
                                }


                            </div>
                        }

                    </section>
                }


                {step === 3 &&

                    <section className={`${CSS.step3Container} items-inline`}
                        style={{ alignItems: 'flex-start' }}>

                        <section className={CSS.sector} style={{ gap: '20px' }}>
                            Επιλογές
                            <div className={`${CSS.listOfSelectedBands} column`}>


                                {selectedBands
                                    .map((band: any, index: number) => (
                                        <div className={CSS.stageSelection} key={band?.profileId}>

                                            <SvgIcon id='close' width={15}
                                                color='#fff'
                                                onClick={() => setSelectedBands((prev: any) => prev.filter((selectedBands: any) =>
                                                    selectedBands?.profileId !== band?.profileId))}
                                                style={{ float: 'right' }} />
                                            <ProfileListItem key={band.profileId} profile={band} />
                                            <div className='items-inline' style={{ gap: '15px' }}>

                                                <div className='items-inline white' style={{ gap: '5px' }}>
                                                    <input type='radio' id={`${index}`} value={'basic'} name={band?.profileId} checked />
                                                    <label htmlFor={`${index}`} >Βασικό act</label>
                                                </div>
                                                <div className='items-inline white' style={{ gap: '5px' }}>

                                                    <input type='radio' id={band?.profileId} value={'support'} name={band?.profileId} />
                                                    <label htmlFor={band?.profileId}>Support act</label>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                            </div>

                        </section>
                        <section style={{ width: '50vw' }}>

                            <input type='search' placeholder='Αναζήτηση..' onChange={(e: any) => setSearch(e.target.value)} />
                            <div className={CSS.stagesList} style={{ marginLeft: '-119px' }} >
                                {stages
                                    .filter((stage: any) => SearchValidation(stage?.name, search))
                                    .map((stage: any) => (
                                        <ProfileListItem
                                            key={stage.profileId}
                                            profile={stage}
                                            onClick={() => setSelectedBands([...selectedBands, stage])}
                                        />
                                    ))}
                            </div>
                        </section>

                    </section>

                }


                <section className={CSS.buttonsSection}>

                    {step !== 1 &&
                        <button type='button' className='btn' onClick={() => setStep(step - 1)}> Προηγούμενο</button>
                    }
                    <button type='submit' className='btn' > Επόμενο</button>



                </section>
            </form>
        </div>
    )
}