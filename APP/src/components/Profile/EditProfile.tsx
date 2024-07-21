import { useContext, useEffect, useState, forwardRef } from 'react'

// CSS
import CSS from '../../css/Profile/EditProfile.module.sass'

// local components
// import FormError from '../../utils/FormError'
import SvgIcon from '../SvgIcon'

// utils
import EditProfileContext from '../../context/EditProfileContext'
// import { useDebounce } from 'use-debounce'
import { handle_checkbox } from '../../utils/functions/handle_checkbox'



// export default function EditProfile(props: any) {
const EditProfile = forwardRef(function EditProfile(props: any, ref: any) {

    let {
        tab, setTab,
        cities,
        genres,
        studio_services,
        edit_menu,

        profile,
        handleSubmit,

        my_services, setMyServices,
        updateProfile,

        register,
        my_genres, setMyGenres,
        instruments,
        my_instruments, setMyInstruments,

        newFile, setNewFile,
        my_name, setMyName,
        my_city, setMyCity,
        my_bio, setMyBio,
        my_address, setMyAddress

    }: any = useContext(EditProfileContext)

    // console.log(props.profile)



    const update_array = (title: string, initial_Array: any, setState: any, myArray: any) => {

        return (

            <div className={CSS.attributes}>
                <h2>{title}</h2>

                <ul>
                    {initial_Array
                        .map((i: any) => (
                            <li className='items-inline' key={i.id}>
                                <input type='checkbox' value={i.id} id={i.id} style={{ width: 'unset' }}
                                    onChange={(event: any) => handle_checkbox(setState, event.target)}
                                    checked={myArray?.includes(i?.id?.toString())}
                                />
                                <label htmlFor={i.id}>{i.name}</label>
                            </li>
                        ))}
                </ul>
            </div>
        )

    }

    // console.warn(props.profile)


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

                            <img src={newFile || `http://127.0.0.1:8000/${profile?.photo}`} width={200} alt='profile'
                                style={{ height: '218px', objectFit: 'cover', margin: '0 0 20px 0' }} />

                            <div className={CSS.updateImage}>


                                <label htmlFor='photo'>
                                    <SvgIcon id={'upload-image'} color='#fff' />
                                    Ανέβασμα
                                </label>

                                <input
                                    {...register('photo')}
                                    id='photo' type='file' style={{ position: 'absolute', top: '-20000px' }}
                                    onChange={(file: any) => setNewFile(URL.createObjectURL(file.target.files[0]))}
                                />

                                <label onClick={() => setNewFile(undefined)} style={{ background: '#C65F5F' }}>
                                    <SvgIcon id={'close'} color='#fff' width={20} />Κατάργηση
                                </label>
                            </div>

                        </div>



                        <input
                            type='text'
                            placeholder='Όνομα'
                            value={my_name}
                            {...register('name', {
                                required: 'Υποχρεωτικό πεδίο',
                                onChange: (event: any) => setMyName(event.target.value)
                            })}
                        />
                        {/* <FormError value={errors?.name} /> */}

                        {props?.profile?.address &&
                            <input
                                type='text'
                                placeholder='Διεύθυνση'
                                value={my_address}
                                {...register('address', {
                                    required: 'Υποχρεωτικό πεδίο',
                                    onChange: (event: any) => setMyAddress(event.target.value)
                                })}
                            />

                        }



                        <select className={CSS.city_dropdown}
                            {...register('city')}
                            onChange={(e) => setMyCity(e.target.value)}>
                            {cities?.map((city: any) => (
                                <option key={city.id}
                                    value={city.id}
                                    selected={my_city === city?.id ? true : false}
                                >{city.name}</option>
                            ))}
                        </select>

                        <textarea
                            {...register('bio')}
                            onChangeCapture={(e: any) => setMyBio(e.target.value)}
                            placeholder='Λίγα λόγια για εσάς..'
                            value={my_bio}
                        >
                     
                        </textarea>

             
                    </div>

                }

                {tab === 2 && update_array('Είδη', genres, setMyGenres, my_genres)}
                {tab === 3 && update_array('Υπηρεσίες', studio_services, setMyServices, my_services)}
                {tab === 4 && update_array('Όργανα', instruments, setMyInstruments, my_instruments)}



                <div className={CSS.bottom_section}>
                    <button type='submit' className='btn blue_btn'>Αποθήκευση</button>
                    <button type='reset' className='btn discard_btn' style={{ 'backgroundColor': '#9A9A9A' }} onClick={() => { setTab(1); props?.close() }}>  Ακύρωση </button>
                </div>
            </form>

        </section>
    )
    // }
})
export default EditProfile