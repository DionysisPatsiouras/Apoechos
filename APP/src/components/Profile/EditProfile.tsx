import { useContext, useEffect, useState, forwardRef, } from 'react'

// CSS
import CSS from '../../css/Profile/EditProfile.module.sass'

// local components
// import FormError from '../../utils/FormError'
import SvgIcon from '../SvgIcon'

// utils
import EditProfileContext from '../../context/EditProfileContext'
// import { useDebounce } from 'use-debounce'
import { handle_checkbox } from '../../utils/functions/handle_checkbox'

// import { useForm, Controller } from "react-hook-form"

// import CreateNewProfileContext from '../../context/CreateNewProfileContext'
import UtilsContext from '../../context/UtilsContext'

// import Select from 'react-select'
import { MapContainer, TileLayer } from 'react-leaflet'

import { Marker } from 'react-leaflet'
// export default function EditProfile(props: any) {
const EditProfile = forwardRef(function EditProfile(props: any, ref: any) {

    let {
        tab, setTab,
        cities,
        genres,
        studio_services,
        edit_menu,

        currentProfile,
        handleSubmit,

        my_services, setMyServices,
        updateProfile,

        register,
        my_genres, setMyGenres,
        instruments,
        my_instruments, setMyInstruments,

        newFile, setNewFile,
        control, LocationMarker,
        position, ChangeView


    }: any = useContext(EditProfileContext)

    let { get_instrument_categories, instrument_categories }: any = useContext(UtilsContext)


    const [activeCategory, setActiveCategory] = useState<string>(instrument_categories?.[0])

    useEffect(() => {
        get_instrument_categories()
        setActiveCategory(instrument_categories?.[0])
    }, [props])




    const update_array = (title: string, initial_Array: any, setState: any, myArray: any, is_instruments: boolean) => {

        return (

            <div className={CSS.attributes}>
                <h2>{title}</h2>

                {is_instruments &&

                    <div className={`${CSS.categories_list} cursor-pointer`}
                        style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px', gap: '10px' }}>
                        {instrument_categories?.map((item: any) => (
                            <div
                                style={{ backgroundColor: '#5F69C6', display: 'flex', padding: '10px', color: '#fff' }}
                                key={item}
                                onClick={() => setActiveCategory(item)}>
                                {item}
                            </div>
                        ))}
                    </div>
                }


                <div className='cursor-pointer' style={{ display: 'flex', flexWrap: 'wrap', height: '200px', overflowY: 'scroll', width: '82%', margin: '0 auto' }}>
                    {initial_Array
                        .filter((i: any) => is_instruments ? i.category === activeCategory : i)
                        .map((i: any) => (
                            <div className='items-inline' key={i.id} style={{ width: '150px' }}>
                                <input type='checkbox' value={i.id} id={i.id} style={{ width: 'unset' }}
                                    onChange={(event: any) => handle_checkbox(setState, event.target)}
                                    checked={myArray?.includes(i?.id?.toString())}
                                />
                                <label htmlFor={i.id}>{i.name}</label>
                            </div>
                        ))}
                </div>
            </div>
        )

    }




    return (
        <section style={{ margin: '-30px' }}>

            <ul className={CSS.tabs}>

                {edit_menu
                    .filter((i: any) => i.category === currentProfile?.category?.name || i.category === 'All')
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

                            <img src={newFile || `http://127.0.0.1:8000/${currentProfile?.photo}`} width={200} alt='profile'
                                style={{ height: '218px', objectFit: 'cover', margin: '0 0 20px 0' }} />

                            <div className={CSS.updateImage}>


                                <label htmlFor='photo'>
                                    <SvgIcon id={'upload-image'} color='#fff' />
                                    Ανέβασμα
                                </label>

                                <input
                                    {...register('file')}
                                    id='photo' type='file' style={{ position: 'absolute', top: '-20000px' }}
                                    onChange={(file: any) => setNewFile(URL.createObjectURL(file.target.files[0]))}
                                />

                                {/* <label onClick={() => setNewFile(undefined)} style={{ background: '#C65F5F' }}>
                                    <SvgIcon id={'close'} color='#fff' width={20} />Κατάργηση
                                </label> */}
                            </div>

                        </div>



                        <input
                            type='text'
                            placeholder='Όνομα'
                            {...register('name', { required: 'Υποχρεωτικό πεδίο' })}
                        />


                        {currentProfile.address &&
                            <input
                                type='text'
                                placeholder='Διεύθυνση'
                                {...register('address', { required: 'Υποχρεωτικό πεδίο' })}
                            />

                        }

                        {currentProfile.latitude &&
                            <MapContainer
                                // @ts-ignore
                                center={[currentProfile.latitude, currentProfile.longitude]}
                                zoom={13}
                                style={{ width: '100%', height: '500px' }}
                            >
                                
                                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                                <ChangeView center={position} />
                                <LocationMarker />


                            </MapContainer>

                        }
                        {/* <Controller
                            // control={control}
                            name="ReactDatepicker"
                            render={({ field: { onChange, onBlur, value, ref } }) => (
                                <Select
                                    className="basic-single"
                                    classNamePrefix="select"
                                    // defaultValue={colourOptions[0]}
                                    // placeholder={''}
                                    name="color"
                                    options={cities.map((i: any) => ({ value: i.id, label: i.name }))}
                                />
                            )}
                        /> */}

                        {/* <Controller
                            name="city"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) =>
                                <Select
                                    {...field}
                                    options={cities.map((i: any) => ({ value: i.id, label: i.name }))}
                                 
                                    // value={{
                                    //     value: currentProfile?.city?.id,
                                    //     label: currentProfile?.city?.name
                                    // }}
                                    noOptionsMessage={() => 'Ο πόλη δεν βρέθηκε.'}
                                    // placeholder="Αναζήτηση ΦΔΛ"
                                    onChange={(e) => console.log(e)}
                                    styles={{
                                        control: (baseStyles) => ({
                                            ...baseStyles,
                                            backgroundColor: '#f1f5f9',
                                            border: 'none',
                                            textAlign: 'left',
                                            padding: '5px',
                                            overflow: 'none'
                                        }),
                                    }}
                                />
                            }
                        /> */}


                        <select
                            className={CSS.city_dropdown}
                            {...register('city')}>
                            {cities?.map((city: any) => (
                                <option key={city.id}
                                    value={city.id}>
                                    {city.name}
                                </option>
                            ))}
                        </select>




                    </div>

                }

                {tab === 2 && update_array('Είδη', genres, setMyGenres, my_genres, false)}
                {tab === 3 && update_array('Υπηρεσίες', studio_services, setMyServices, my_services, false)}
                {tab === 4 && update_array('Όργανα', instruments, setMyInstruments, my_instruments, true)}



                <div className={CSS.bottom_section}>
                    <button type='submit' className='btn blue_btn'>Αποθήκευση</button>
                    <button type='reset' className='btn discard_btn' style={{ 'backgroundColor': '#9A9A9A' }}
                        onClick={() => { setTab(1); props?.close() }}>  Ακύρωση </button>
                </div>
            </form>

        </section>
    )

})
export default EditProfile