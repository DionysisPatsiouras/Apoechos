import { useContext, useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import AuthContext from '../context/AuthContext'

// components
import Confirmation from '../components/Confirmation'
import SvgIcon from '../components/SvgIcon'
import FormError from '../utils/FormError'
import { Routes } from '../utils/Routes'
import Call from '../utils/Call'
import { cities } from '../utils/Lists'
import { patchUser } from '../utils/functions/patchUser'

// css
import CSS from '../css/CreateMusician/CreateMusician.module.css'



export default function CreateStore() {

    const form = useForm()
    const { register, handleSubmit, formState } = form
    const { errors } = formState


    const [profileCreated, setProfileCreated] = useState<boolean>(false)



    let { userData }: any = useContext(AuthContext)



    const [uploadedFile, setUploadedFile] = useState<any>()


    const onSubmit = async (data: any) => {
        // console.log(data)

        let formData = new FormData()
        formData.append('file', data?.file?.[0])


        const finalData = {
            ...data,
            user: userData.id,
            photo: data?.file?.[0]
        }
        const addStore = new Call(Routes.store.post, 'POST', finalData)

        // console.warn('submitted', finalData)

        // must create async function here to catch the 'loading' variable

        addStore
            .POST_MEDIA()
            .then((res) => {
                // console.log(res?.data?.storeId)
                patchUser('storeId', res?.data?.storeId)
                setProfileCreated(true)
            })
            .catch((err) => { console.warn(err) })

    }






    // console.log(array)

    return (
        <div className='space'>

            <Confirmation
                confirm={profileCreated}
                title={'Επιτυχής καταχώρηση!'}>
                ok!
            </Confirmation>

            {/* {userData?.musicianId !== null && <Navigate to='/create' />} */}


            <div className='container' style={{ 'display': profileCreated ? 'none' : 'block' }}>
                <h2>Νέο Κατάστημα</h2>
                <hr className='divider'></hr>
                <form onSubmit={handleSubmit(onSubmit)} style={{ 'display': profileCreated ? 'none' : 'flex' }}>

                    <div className={CSS.personal_info}>

                        <div className={CSS.group}>
                            <label htmlFor='picture'>
                                <img src={uploadedFile} width={20} height={20} alt=''
                                    style={{ width: '150px', height: '150px', border: '1px solid grey', borderRadius: '100px', objectFit: 'cover' }} />
                                <p style={{ display: 'flex', justifyContent: 'space-around' }}>
                                    <SvgIcon id={'upload-image'} />
                                    Μεταφόρτωση</p>
                            </label>
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
                                    required: 'Αυτό το πεδίο είναι υποχρεωτικό'
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


                    {/* <hr className='divider'></hr> */}





                    <div className={CSS.buttonSection}>...
                        <button>Δημιουργία</button>
                    </div>
                </form>




            </div >


        </div >
    )
}