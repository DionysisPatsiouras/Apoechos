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
import { all_categories, strings, woodwind, percussion, vocals, keys, genres } from '../utils/MusicianUtils'
import { cities } from '../utils/Lists'
import CreateNewProfileContext from '../context/CreateNewProfileContext'

// css
import CSS from '../css/CreateMusician/CreateMusician.module.css'

import { patchUser } from '../utils/functions/patchUser'


export default function CreateNewProfile() {

    const form = useForm()
    const { register, handleSubmit, formState } = form
    const { errors } = formState

    const [profileCreated, setProfileCreated] = useState<boolean>(false)
    const [selection, setSelection] = useState<string>('strings')
    const [current, setCurrent] = useState<any>(strings)

    let { userData }: any = useContext(AuthContext)

    const [instrumentArray, setInstrumentArray] = useState<any[]>([])

    const [uploadedFile, setUploadedFile] = useState<any>()

    let {
        map, cities, genres, onSubmit, is_musician, handleCheckBox, setGenreArray, genreArray
    }: any = useContext(CreateNewProfileContext)

    console.warn(genreArray)

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
                <h2>Νέο προφίλ</h2>
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
                            <label>Όνομα</label>
                            <input
                                type='text'
                                {...register('name', {
                                    required: 'Αυτό το πεδίο είναι υποχρεωτικό'
                                })}
                            />

                            <select className={CSS.city_dropdown}{...register('city')}>
                                {cities.map((city: any) => (
                                    <option key={city.id} value={city.id}>{city.name}</option>
                                ))}
                            </select>
                        </div>

                    </div>

                    {is_musician &&

                        <>
                            <hr className='divider'></hr>
                            <h2>Είδη</h2>

                            <div className={CSS.checkboxes_section}>
                                {genres.map((genre: any) => (
                                    <div className={CSS.checkbox} key={genre.id}>
                                        <input
                                            {...register('genres', {
                                                required: 'Επιλέξτε τουλάχιστον 1 είδος'
                                            })}
                                            id={genre.id}
                                            type='checkbox'
                                            value={genre.id}
                                            onChange={(event) => handleCheckBox(setGenreArray, event)}
                                            checked={genreArray.includes(genre.id.toString())}
                                        />
                                        <label htmlFor={genre.id}>{genre.name}</label>
                                    </div>
                                ))}
                            </div>
                        </>
                    }



                    {map &&
                        <>
                            <hr className='divider'></hr>
                            <h2>Διεύθυνση</h2>
                        </>
                    }










                    <div className={CSS.buttonSection}>...
                        <button>Δημιουργία</button>
                    </div>
                </form>




            </div>
        </div>
    )
}