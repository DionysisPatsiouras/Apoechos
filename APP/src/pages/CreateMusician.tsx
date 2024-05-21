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
import { cities, all_categories, strings, woodwind, percussion, vocals, keys } from '../utils/MusicianUtils'

// css
import CSS from '../css/CreateMusician/CreateMusician.module.css'



export default function CreateMusician() {

    const form = useForm()
    const { register, handleSubmit, formState } = form
    const { errors } = formState


    const [profileCreated, setProfileCreated] = useState<boolean>(false)

    const [selection, setSelection] = useState<string>('strings')
    const [current, setCurrent] = useState<any>(strings)

    let { userData }: any = useContext(AuthContext)

    const [loading, setLoading] = useState<boolean>(false)
    const [array, setArray] = useState<any[]>([])

    const [uploadedFile, setUploadedFile] = useState<any>()

    const add_instruments = (musician: string) => {


        for (let index = 0; index < array.length; index++) {

            let finalData = {
                name: array[index],
                musician: musician
            }

            let add_inst = new Call(Routes.instruments.add, 'POST', finalData)
            add_inst
                .POST()
                .then((res) => console.log(res))
                .catch((err) => console.warn(err))
        }

    }
    const patchMusicianId = (id: string) => {

        let data = {
            musicianId: id
        }

        let updateUser = new Call(Routes.user.patch, 'PATCH', data)

        updateUser
            .PATCH()
            .then((res) => console.log(res))
            .catch((error) => { console.log(error) })

    }

    const onSubmit = async (data: any) => {
        // console.log(data)

        let formData = new FormData()
        formData.append('file', data?.file?.[0])


        const finalData = {
            ...data,
            user: userData.id,
            photo: data?.file?.[0]
        }
        const addMusician = new Call(Routes.musician.post, 'POST', finalData)

        // console.warn('submitted', finalData)

        // must create async function here to catch the 'loading' variable

        addMusician
            .POST_MEDIA()
            .then((res) => {
                // console.log(res)
                patchMusicianId(res?.data?.musicianId)
                add_instruments(res?.data?.musicianId)
                setLoading(false)
                setProfileCreated(true)


            })
            .catch((err) => { console.warn(err) })

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

            {userData?.musicianId !== null && <Navigate to='/create' />}


            <div className='container' style={{ 'display': profileCreated ? 'none' : 'block' }}>
                <h2>Νέος Μουσικός</h2>
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
                            <label>Ον/μο ή καλλιτεχνικό ψευδώνυμο</label>
                            <input
                                type='text'
                                {...register('artistic_nickname', {
                                    required: 'Αυτό το πεδίο είναι υποχρεωτικό'
                                })}
                            />
                            <FormError value={errors?.artistic_nickname} />


                            <label>Περιοχή</label>

                            <select className={CSS.city_dropdown} {...register('city')}>
                                {cities.map((city: any, index: number) => (
                                    <option key={index} value={city}>{city}</option>
                                ))}
                            </select>
                        </div>


                    </div>


                    <hr className='divider'></hr>
                    <h2>Όργανα</h2>

                    <ul className={CSS.categories_list}>
                        {all_categories.map((category: string, index: number) => (
                            <li
                                key={index}
                                onClick={
                                    () => {
                                        setSelection(category)
                                        setCurrent(category === 'strings' ? strings
                                            : category === 'woodwind' ? woodwind
                                                : category === 'percussion' ? percussion
                                                    : category === 'vocals' ? vocals
                                                        : category === 'keys' ? keys
                                                            : strings)
                                    }
                                }
                                style={{ 'backgroundColor': selection === category ? '#5F69C6' : '#B4B3B2' }}>
                                <SvgIcon id={category} color={'#ffffff'} width={30} height={30} />
                            </li>
                        ))}
                    </ul>

                    <div className={CSS.checkboxes_section}>
                        {current.map((string: string) => (
                            <div className={CSS.checkbox} key={string}>
                                <input
                                    {...register('instruments')}
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


                    {/* <hr className='divider'></hr>
                    <h2>Είδη</h2>
                    <ul className={CSS.genre_list}>
                        {genres
                            .map((genre: any) => (
                                <div className={CSS.checkbox} key={genre?.id}>
                                    <input type='checkbox' id={genre?.id} />
                                    <label htmlFor={genre?.id}>{genre?.genre}</label>
                                </div>
                            ))}

                    </ul> */}



                    <div className={CSS.buttonSection}>...
                        <button>Δημιουργία</button>
                    </div>
                </form>




            </div >


        </div >
    )
}