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

// css
import CSS from '../css/CreateMusician/CreateMusician.module.css'



export default function CreateMusician() {

    const form = useForm()
    const { register, handleSubmit, formState } = form
    const { errors } = formState

    const [genres, setGenres] = useState<any>([])
    const [cities, setCities] = useState<string[]>([])
    const [profileCreated, setProfileCreated] = useState<boolean>(false)

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
            .catch((error) => {  console.log(error)})

    }

    const onSubmit = (data: any) => {
        console.log(data)

        const finalData = {
            ...data,
            user: userData.id
        }

        axios
            .post('http://127.0.0.1:8000/profiles/musicians/add/', finalData, {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then((response) => {
                console.log(response)
                patchMusicianId(response?.data?.musicianId)
                setProfileCreated(true)
                
            })
            .catch((error) => { console.log(error) })
        // console.warn(finalData)
    }


    useEffect((): any => {

        axios
            .get('http://localhost:8000/profiles/cities', config)
            .then((res: any) => setCities(res.data))

        axios
            .get('http://127.0.0.1:8000/genre/', config)
            .then((res) => { setGenres(res?.data) })
            .catch((err) => console.warn(err))
    }, [])



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
                            <img src='' width={20} height={20} alt=''
                                style={{ 'width': '20px', 'border': '1px solid grey', 'borderRadius': '100px', 'padding': '50px' }} />
                            <SvgIcon id={'upload-image'} />
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
                                {/* <option defaultValue='' disabled hidden>Επιλέξτε πόλη</option> */}
                                {cities.map((city: any) => (
                                    <option key={city?.id} value={city?.city}>{city?.city}</option>
                                ))}
                            </select>
                        </div>


                    </div>
                    <hr className='divider'></hr>
                    <h2>Είδη</h2>


                    <ul className={CSS.genre_list}>
                        {genres
                            .map((genre: any) => (
                                <div className={CSS.checkbox} key={genre?.id}>
                                    <input type='checkbox' id={genre?.id} />
                                    <label htmlFor={genre?.id}>{genre?.genre}</label>
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