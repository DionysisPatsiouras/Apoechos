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
import { cities, all_categories, strings, woodwind, percussion, vocals, keys, genres } from '../utils/MusicianUtils'

// css
import CSS from '../css/CreateMusician/CreateMusician.module.css'

import { patchUser } from '../utils/functions/patchUser'


export default function CreateMusician() {

    const form = useForm()
    const { register, handleSubmit, formState } = form
    const { errors } = formState

    const [profileCreated, setProfileCreated] = useState<boolean>(false)
    const [selection, setSelection] = useState<string>('strings')
    const [current, setCurrent] = useState<any>(strings)

    let { userData }: any = useContext(AuthContext)

    const [instrumentArray, setInstrumentArray] = useState<any[]>([])
    const [genreArray, setGenreArray] = useState<any[]>([])
    const [uploadedFile, setUploadedFile] = useState<any>()

    const add_instruments = (musician: string) => {

        for (let index = 0; index < instrumentArray.length; index++) {

            let finalData = {
                name: instrumentArray[index],
                musician: musician
            }

            let add_inst = new Call(Routes.instruments.add, 'POST', finalData)
            add_inst
                .POST()
                .then((res) => console.log(res))
                .catch((err) => console.warn(err))
        }

    }

    const add_genres = (musician: string) => {

        for (let index = 0; index < genreArray.length; index++) {

            let finalData = {
                name: genreArray[index],
                musician: musician
            }

            let add_genre = new Call(Routes.genres.add, 'POST', finalData)
            add_genre
                .POST()
                .then((res) => console.log(res))
                .catch((err) => console.warn(err))
        }

    }


    const onSubmit = async (data: any) => {


        let formData = new FormData()
        formData.append('file', data?.file?.[0])

        const finalData = {
            ...data,
            user: userData.id,
            photo: data?.file?.[0]
        }
        const addMusician = new Call(Routes.musician.post, 'POST', finalData)

        // console.warn('submitted', finalData)


        addMusician
            .POST_MEDIA()
            .then((res) => {
                patchUser('musicianId', res?.data?.musicianId)
                add_instruments(res?.data?.musicianId)
                add_genres(res?.data?.musicianId)
                setProfileCreated(true)
            })
            .catch((err) => { console.warn(err) })
    }
  



    const handleCheckBox = (state: any, event: any) => {

        const { value, checked } = event.target;

        state((prevCategories: any) =>
            checked
                ? [...prevCategories, value]
                : prevCategories.filter((allGroups: any) => allGroups !== value)
        );

    }




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

                        <div className={CSS.group} style={{ cursor: 'pointer' }}>
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
                                    {...register('instruments', {
                                        required: 'Επιλέξτε τουλάχιστον 1 όργανο'
                                    }
                                    )}
                                    id={string}
                                    type='checkbox'
                                    value={string}
                                    onChange={(event) => handleCheckBox(setInstrumentArray, event)}
                                    checked={instrumentArray.includes(string)}
                                />
                                <label htmlFor={string}>{string}</label>
                            </div>
                        ))}

                    </div>

                    <FormError value={errors?.instruments} />



                    <hr className='divider'></hr>
                    <h2>Είδη</h2>


                    <div className={CSS.checkboxes_section}>
                        {genres.map((genre: string) => (
                            <div className={CSS.checkbox} key={genre}>
                                <input
                                    {...register('genres', {
                                        required: 'Επιλέξτε τουλάχιστον 1 είδος'
                                    })}
                                    id={genre}
                                    type='checkbox'
                                    value={genre}
                                    // onChange={handleCheckBoxGenre}
                                    onChange={(event) => handleCheckBox(setGenreArray, event)}
                                    checked={genreArray.includes(genre)}
                                />
                                <label htmlFor={genre}>{genre}</label>
                            </div>
                        ))}

                    </div>

                    <FormError value={errors?.genres} />


                    <div className={CSS.buttonSection}>...
                        <button>Δημιουργία</button>
                    </div>
                </form>




            </div >


        </div >


    )

}