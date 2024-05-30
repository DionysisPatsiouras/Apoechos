import { useContext, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'

import AuthContext from '../context/AuthContext'

// components
import Confirmation from '../components/Confirmation'
import SvgIcon from '../components/SvgIcon'
import FormError from '../utils/FormError'
import { Routes } from '../utils/Routes'
import Call from '../utils/Call'
// import { cities } from '../utils/MusicianUtils'
import { cities } from '../utils/Lists'

// css
import CSS from '../css/CreateMusician/CreateMusician.module.css'
import { patchUser } from '../utils/functions/patchUser'
import { studio_services } from '../utils/Lists'




export default function CreateStudio() {

    let { userData }: any = useContext(AuthContext)

    const form = useForm()
    const { register, handleSubmit, formState } = form
    const { errors } = formState

    const [profileCreated, setProfileCreated] = useState<boolean>(false)


    const [array, setArray] = useState<any[]>([])
    const [uploadedFile, setUploadedFile] = useState<any>()

    const [array_is_empty, set_array_is_empty] = useState<boolean>()

    // let services = ['Πρόβες', 'Ηχογραφήσεις', 'Mix', 'Mastering', 'Ηχογράφηση Πρόβας', 'Με πλήρες εξοπλισμό', 'Live Ηχογράφηση']



    const add_services = (studio: string) => {

        for (let index = 0; index < array.length; index++) {

            let finalData = {
                name: array[index],
                studio: studio
            }

            let add_inst = new Call(Routes.services.add, 'POST', finalData)
            add_inst
                .POST()
                .then((res: any) => console.log(res))
                .catch((err: any) => console.warn(err))
        }
    }



    const onSubmit = async (data: any) => {

        if (array.length === 0 || !array) {

            set_array_is_empty(true)
        } else {
            set_array_is_empty(false)

            let formData = new FormData()
            formData.append('file', data?.file?.[0])

            const finalData = {
                ...data,
                user: userData.id,
                photo: data?.file?.[0]
            }

            const addStudio = new Call(Routes.studio.post, 'POST', finalData)
            addStudio
                .POST_MEDIA()
                .then((res) => {
                    // console.log(res)
                    patchUser('studioId', res?.data?.studioId)
                    add_services(res?.data?.studioId)
                    setProfileCreated(true)
                })
                .catch((err) => { console.warn(err) })

        }

    }




    const handleCheckBox = (event: any) => {

        const { value, checked } = event.target;

        setArray((prevCategories: any) =>
            checked
                ? [...prevCategories, value]
                : prevCategories.filter((allGroups: any) => allGroups !== value)
        );

    };



    // console.log(array)

    return (
        <div className='space'>

            <Confirmation
                confirm={profileCreated}
                title={'Επιτυχής καταχώρηση!'}>
                ok!
            </Confirmation>

            {/* {userData?.studioId !== null && <Navigate to='/create' />} */}


            <div className='container' style={{ 'display': profileCreated ? 'none' : 'block' }}>
                <h2>Νέο Στούντιο</h2>
                <hr className='divider'></hr>
                <form onSubmit={handleSubmit(onSubmit)} style={{ 'display': profileCreated ? 'none' : 'flex' }}>

                    <div className={CSS.personal_info}>

                        <div className={CSS.group}>
                            <img src={uploadedFile} width={20} height={20} alt=''
                                style={{ width: '150px', height: '150px', border: '1px solid grey', borderRadius: '100px', objectFit: 'cover' }} />
                            <label htmlFor='picture'>  <SvgIcon id={'upload-image'} /></label>


                            <input
                                {...register('file')}
                                type="file"
                                id="picture"
                                onChange={(file: any) => setUploadedFile(URL.createObjectURL(file.target.files[0]))}
                                style={{ position: 'absolute', top: '-20000px' }}
                            />

                        </div>


                        <div className={CSS.group}>
                            <label>Τίτλος</label>
                            <input
                                type='text'
                                {...register('title', {
                                    required: 'Αυτό το πεδίο είναι υποχρεωτικό',
                                    minLength: {
                                        value: 3,
                                        message: 'Απαιτούνται τουλάχιστον 3 χαρακτήρες'
                                    }
                                })}
                            />
                            <FormError value={errors?.title} />


                            <label>Περιοχή</label>

                            <select className={CSS.city_dropdown} {...register('city')}>
                                {cities.map((city: any, index: number) => (
                                    <option key={index} value={city}>{city}</option>
                                ))}
                            </select>
                            <label>Διεύθυνση</label>
                            <input
                                type='text'
                                {...register('address', {
                                    required: 'Αυτό το πεδίο είναι υποχρεωτικό',
                                    minLength: {
                                        value: 3,
                                        message: 'Απαιτούνται τουλάχιστον 3 χαρακτήρες'
                                    }
                                })}
                            />
                            <FormError value={errors?.address} />

                        </div>


                    </div>


                    <hr className='divider'></hr>
                    <h2>Υπηρεσίες</h2>
                    <div className={CSS.checkboxes_section}>
                        {studio_services.map((string: string) => (
                            <div className={CSS.checkbox} key={string}>
                                <input
                                    {...register('services')}
                                    id={string}
                                    type='checkbox'
                                    value={string}
                                    onChange={handleCheckBox}
                                    checked={array.includes(string)}

                                />
                                <label htmlFor={string}>{string}</label>
                            </div>
                        ))}

                    </div>

                    {array_is_empty && <p>Συμπληρώστε τουλάχιστον 1 υπηρεσία</p>}



                    <div className={CSS.buttonSection}>...
                        <button>Δημιουργία</button>
                    </div>
                </form>




            </div>


        </div>
    )
}