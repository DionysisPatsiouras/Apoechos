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
import { Routes } from '../utils/Routes'
import Call from '../utils/Call'
import { cities, all_categories, all_strings } from '../utils/MusicianUtils'

// css
import CSS from '../css/CreateMusician/CreateMusician.module.css'



export default function CreateMusician() {

    const form = useForm()
    const { register, handleSubmit, formState } = form
    const { errors } = formState

    const [genres, setGenres] = useState<any>([])
    const [profileCreated, setProfileCreated] = useState<boolean>(false)

    const [selection, setSelection] = useState<string>('strings')
    const [current, setCurrent] = useState<any>(all_strings)

    let { userData }: any = useContext(AuthContext)

    const [loading, setLoading] = useState<boolean>(false)
    const [array, setArray] = useState<any[]>([])


    const add = () => {
        let add_inst = new Call(Routes.instruments.add, 'POST', array)

        add_inst.POST()
        .then((res) => console.log(res))
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
        const finalData = {
            ...data,
            user: userData.id
        }
        const addMusician = new Call(Routes.musician.post, 'POST', finalData)

        console.warn('submitted', finalData)

        // must create async function here to catch the 'loading' variable

        addMusician
            .POST()
            .then((res) => {
                console.log(res)
                patchMusicianId(res?.data?.musicianId)
                setLoading(false)
                setProfileCreated(true)


            })
            .catch((err) => { console.warn(err) })

    }


    useEffect((): any => {

        axios
            .get('http://127.0.0.1:8000/genre/', config)
            .then((res) => { setGenres(res?.data) })
            .catch((err) => console.warn(err))
    }, [])


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
                                {cities.map((city: any, index: number) => (
                                    <option key={index} value={city}>{city}</option>
                                ))}
                            </select>
                        </div>


                    </div>


                    <hr className='divider'></hr>
                    <h2>Όργανα</h2>
                    <ul className={CSS.genre_list}>
                        <ul className={CSS.categories_list}>
                            {all_categories.map((category: string, index: number) => (
                                <li
                                    key={index}

                                    onClick={() => setSelection(category)}
                                    style={{ 'backgroundColor': selection === category ? '#5F69C6' : '#B4B3B2' }}>
                                    <SvgIcon id={category} color={'#ffffff'} width={30} height={30} />
                                </li>
                            ))}
                        </ul>


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
                    </ul>


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