import { useContext, useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { token, config } from '../utils/Token'
import AuthContext from '../context/AuthContext'

// components
import Confirmation from '../components/Confirmation'
import SvgIcon from '../components/SvgIcon'
import FormError from '../utils/FormError'

import { cities, all_categories, all_strings } from '../utils/MusicianUtils'
import { Routes } from '../utils/Routes'
import Call from '../utils/Call'
// css
import CSS from '../css/CreateMusician/CreateMusician.module.css'



export default function CreateStudio() {

    const form = useForm()
    const { register, handleSubmit, formState } = form
    const { errors } = formState

    const [genres, setGenres] = useState<any>([])
    const [profileCreated, setProfileCreated] = useState<boolean>(false)
    const [selection, setSelection] = useState<string>('strings')
    const [current, setCurrent] = useState<any>(all_strings)

    let { userData }: any = useContext(AuthContext)



    const patchMusicianId = (id: string) => {

        let data = {
            musicianId: id
        }

        axios
            .patch('http://127.0.0.1:8000/user/patch/', data, {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then((response) => { console.log(response) })
            .catch((error) => { console.log(error) })

    }

    const onSubmit = (data: any) => {
        console.log(data)
        const finalData = {
            ...data,
            user: userData.id
        }
        const addStudio = new Call(Routes.studio.post, 'POST', finalData)

        addStudio
            .POST()
            .then((res) => {
                // console.log(res)
                // patchMusicianId(res?.data?.musicianId)
                // setLoading(false)
                setProfileCreated(true)


            })
            .catch((err) => {
                console.log(err)

            })

    }


    useEffect((): any => {

        axios
            .get('http://127.0.0.1:8000/genre/', config)
            .then((res) => { setGenres(res?.data) })
            .catch((err) => console.warn(err))
    }, [])


    let services = ['Πρόβες', 'Ηχογράφηση', 'Mix', 'Mastering', 'Με πλήρες εξοπλισμό', 'Live ηχογράφηση']



    return (
        <div className='space'>

            <Confirmation
                confirm={profileCreated}
                title={'Επιτυχής καταχώρηση!'}>
                ok!
            </Confirmation>

            {/* {userData?.musicianId !== null && <Navigate to='/create' />} */}


            <div className='container' style={{ 'display': profileCreated ? 'none' : 'block' }}>
                <h2>Νέο Στούντιο</h2>
                <hr className='divider'></hr>
                <form onSubmit={handleSubmit(onSubmit)} style={{ 'display': profileCreated ? 'none' : 'flex' }}>

                    <div className={CSS.personal_info}>

                        <div className={CSS.group}>
                            <img src='' width={20} height={20} alt=''
                                style={{ 'width': '20px', 'border': '1px solid grey', 'borderRadius': '100px', 'padding': '50px' }} />
                            <SvgIcon id={'upload-image'} />
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


                            <label>Πόλη</label>
                            <select className={CSS.city_dropdown} {...register('city')}>
                                {cities.map((city: any, index: number) => (
                                    <option key={index} value={city}>{city}</option>
                                ))}
                            </select>


                            <label>Διεύθυνση</label>
                            <input
                                type='text'
                                {...register('address', {
                                    required: 'Αυτό το πεδίο είναι υποχρεωτικό'
                                })}
                            />
                            <FormError value={errors?.address} />
                        </div>


                    </div>






                    <hr className='divider'></hr>
                    <h2>Υπηρεσίες</h2>
                    <ul className={CSS.genre_list}>
                        {services
                            .map((service: any) => (
                                <div className={CSS.checkbox} key={service}>
                                    <input type='checkbox' id={service} />
                                    <label htmlFor={service}>{service}</label>
                                </div>
                            ))}


                    </ul>



                    <div className={CSS.buttonSection}>Text here...
                        <button>Επόμενο</button>
                    </div>
                </form>




            </div>


        </div>
    )
}