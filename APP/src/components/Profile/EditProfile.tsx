import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

// CSS
import CSS from '../../css/Profile/EditMusician.module.sass'

// local components
import FormError from '../../utils/FormError'
import SvgIcon from '../SvgIcon'

// utils
import Call from '../../utils/Call'
import { Routes } from '../../utils/Routes'


export default function EditProfile(props: any) {

    let profile = props?.profile
    const form = useForm()
    const { register, handleSubmit, formState } = form
    const { errors } = formState

    const [tab, setTab] = useState<number>(1)
    const [cities, setCitites] = useState<any[]>([])
    const [studioServices, setStudioServices] = useState<any[]>([])

    const get_cities = new Call(Routes.profiles.cities, 'GET')
    const get_studio_services = new Call(Routes.profiles.studio_services, 'GET')

    const [my_services, setMyServices] = useState<any[]>([])


    useEffect(() => {

        setMyServices(props?.profile && props?.profile?.studio_services?.map((i: any) => i?.id?.toString()))

        get_studio_services
            .GET()
            .then((res) => setStudioServices(res[1]))
            .catch((err) => console.warn(err))

        get_cities
            .GET()
            .then((res => setCitites(res[1])))
            .catch((err) => console.warn(err))

    }, [props])


    const updateProfile = (data: any) => {
        const update_profile = new Call(Routes.profiles.update(profile?.profileId), 'PATCH', data)
        update_profile
            .PATCH()
            .then(() => { props?.close() })
            .catch((err) => console.warn(err))
    }


    let edit_menu = [
        { icon: 'account', label: 'Στοιχεία', category: 'All', id: 1 },
        { icon: 'genres', label: 'Είδη', category: 'Musician', id: 2 },
        { icon: 'studio_services', label: 'Υπηρεσίες', category: 'Studio', id: 3 },
        { icon: 'keys', label: 'Όργανα', category: 'Store', id: 4 },
    ]



    const handle_checkbox = (event: any, state: any) => {
        const { value, checked } = event.target;
        state((prevCategories: any) =>
            checked
                ? [...prevCategories, value]
                : prevCategories?.filter((all_values: any) => all_values !== value)
        )
    }




    return (
        <section style={{ margin: '-30px' }}>

            <ul className={CSS.tabs}>

                {edit_menu
                    .filter((i: any) => i.category === profile?.category?.name || i.category === 'All')
                    .map((item: any, index: number) => (
                        <li key={index}
                            style={{ width: '100%' }}
                            className={tab === item.id ? CSS.active_tab : CSS.tab}
                            onClick={() => setTab(item.id)}>

                            <SvgIcon id={item.icon} color={tab === item.id ? '#fff' : '#000'} width={20} height={20} />
                            {item.label}
                        </li>
                    ))}

            </ul>

            <form onSubmit={handleSubmit(updateProfile)} className={CSS.edit_form}>

                {tab === 1 &&
                    <div className={CSS.info_stats}>
                        <div className='items-inline' style={{ gap: '25px', alignItems: 'flex-start' }}>

                            <img src={`http://127.0.0.1:8000/${profile?.photo}`} width={200} alt='profile'
                                style={{ height: '218px', objectFit: 'cover', margin: '0 0 20px 0' }} />

                            <div className={CSS.updateImage}>
                                <button ><SvgIcon id={'upload-image'} color='#fff' />Ανέβασμα</button>
                                <button style={{ background: '#C65F5F' }}><SvgIcon id={'close'} color='#fff' width={20} />Κατάργηση</button>
                            </div>

                        </div>

                        <input
                            placeholder='Όνομα'
                            defaultValue={profile?.name}
                            {...register('name', {
                                required: 'Υποχρεωτικό πεδίο'
                            })}
                        />
                        <FormError value={errors?.name} />

                        <select className={CSS.city_dropdown} {...register('city')}>
                            {cities.map((city: any) => (
                                <option key={city.id} value={city.id}>{city.name}</option>
                            ))}
                        </select>
                        <textarea
                            placeholder='Λίγα λόγια για εσάς..'
                            defaultValue={profile?.bio}
                            {...register('bio')}
                        />
                    </div>

                }

                {tab === 2 &&
                    <div>genres</div>}

                {tab === 3 &&
                    <ul>
                        {studioServices
                            .map((i: any) => (
                                <li className='items-inline' key={i.id}>
                                    <input type='checkbox' value={i.id} id={i.id} style={{ width: 'unset' }}
                                        onChange={(event: any) => handle_checkbox(event, setMyServices)}
                                        checked={my_services?.includes(i?.id?.toString())}
                                    />
                                    <label htmlFor={i.id}>{i.name}</label>
                                </li>
                            ))}
                    </ul>

                }



                <div className={CSS.bottom_section}>


                    <button type='submit'>Αποθηκεύση</button>
                    <button type='reset' style={{ 'backgroundColor': '#9A9A9A' }}
                        onClick={() => { setTab(1); props?.close() }}>
                        Ακύρωση
                    </button>
                </div>
            </form>

        </section>
    )
}