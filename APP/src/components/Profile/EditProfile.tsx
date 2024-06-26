import { useContext, useState } from 'react'

// CSS
import CSS from '../../css/Profile/EditMusician.module.sass'

// local components
// import FormError from '../../utils/FormError'
import SvgIcon from '../SvgIcon'

// utils
import EditProfileContext from '../../context/EditProfileContext'
// import { useDebounce } from 'use-debounce'



export default function EditProfile(props: any) {

    let {
        edit_menu,
        handle_checkbox,
        setTab,
        profile,
        handleSubmit,
        tab,
        studioServices,
        setMyServices,
        my_services,
        updateProfile,
        genres,
        setMyGenres,
        register,
        my_genres,
        instruments,
        setMyInstruments,
        my_instruments
    }: any = useContext(EditProfileContext)


   


    const update_array = (initial_Array: any, setState: any, myArray: any) => {

        return (
            <ul>
                {initial_Array
                    .map((i: any) => (
                        <li className='items-inline' key={i.id}>
                            <input type='checkbox' value={i.id} id={i.id} style={{ width: 'unset' }}
                                onChange={(event: any) => handle_checkbox(event, setState)}
                                checked={myArray?.includes(i?.id?.toString())}
                            />
                            <label htmlFor={i.id}>{i.name}</label>
                        </li>
                    ))}
            </ul>
        )

    }

    // const [name, setName] = useState(props.profile.name);
    // const [value] = useDebounce(name, 1000);


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

            <form onSubmit={handleSubmit(updateProfile)} noValidate className={CSS.edit_form}>


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

                        {props?.profile?.name &&
                            <>
                                <input
                                    type='text'
                                    placeholder='Όνομα'
                                    // defaultValue={profile?.name}
                                    // defaultValue={value}
                                    // onChange={() => setName(e:any) => e.target.value}
                                    // onChange={() => setName((e:any) => e.target.value)}
                                    {...register('name', {
                                        required: 'Υποχρεωτικό πεδίο',
                                    })}
                                />
                                {/* <FormError value={errors?.name} /> */}
                            </>

                        }
                        {/* <select className={CSS.city_dropdown} {...register('city')}>
                            {cities.map((city: any) => (
                                <option key={city.id} value={city.id}>{city.name}</option>
                            ))}
                        </select>
                        <textarea
                            placeholder='Λίγα λόγια για εσάς..'
                            defaultValue={profile?.bio}
                            {...register('bio')}
                        /> */}
                    </div>

                }

                {tab === 2 && update_array(genres, setMyGenres, my_genres)}
                {tab === 3 && update_array(studioServices, setMyServices, my_services)}
                {tab === 4 && update_array(instruments, setMyInstruments, my_instruments)}



                <div className={CSS.bottom_section}>


                    <button type='submit'>Αποθηκεύση</button>
                    <button type='reset' style={{ 'backgroundColor': '#9A9A9A' }} onClick={() => { setTab(1); props?.close() }}>  Ακύρωση </button>
                </div>
            </form>

        </section>
    )
}