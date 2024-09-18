import { useContext, useEffect, useState, forwardRef, } from 'react'

// CSS
import CSS from '../../css/Profile/EditProfile.module.sass'

// local components
// import FormError from '../../utils/FormError'
import SvgIcon from '../SvgIcon'

// utils
import EditProfileContext from '../../context/EditProfileContext'
import { handle_checkbox } from '../../utils/functions/handle_checkbox'
import UtilsContext from '../../context/UtilsContext'
import { ChangeView } from '../../utils/functions/ChangeView'

import { MapContainer, TileLayer } from 'react-leaflet'



interface EditProfileProps{
    close: () => void;
    profile: any;
    ref: any;
}
// export default function EditProfile(props: any) {
// const EditProfile = forwardRef(function EditProfile(props: any, ref: any) {
const EditProfile = forwardRef(function EditProfile({close, profile} : EditProfileProps , ref) {

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
        // instruments,
        my_instruments, setMyInstruments,

        newFile, setNewFile,
        LocationMarker,
        position, setPosition,

        new_address, deleteProfile


    }: any = useContext(EditProfileContext)


    let { get_instrument_categories, instrument_categories, get_instruments, instruments }: any = useContext(UtilsContext)


    const [activeCategory, setActiveCategory] = useState<string>(instrument_categories?.[0])
    const has_natural_presence = currentProfile?.category?.id === 3 || currentProfile?.category?.id === 4 || currentProfile?.category?.id === 5

    useEffect(() => {
        get_instrument_categories()
        setActiveCategory(instrument_categories?.[0])
        get_instruments()
    }, [profile?.profileId])
    // console.log("🚀 ~ EditProfile ~ props:", props)





    const update_array = (initial_Array: any, setState: any, myArray: any, is_instruments: boolean) => {

        return (

            <div className={CSS.attributes}>

                {is_instruments &&

                    <div className={`${CSS.listContainer} cursor-pointer`}
                        style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px', gap: '10px', borderRadius: '20px' }} >
                        {instrument_categories?.map((item: any) => (
                            <div className={CSS.instCategoriesItem}
                                key={item}
                                onClick={() => setActiveCategory(item)}>
                                {item}
                            </div>
                        ))}
                    </div>
                }


                <div className={`${CSS.listContainer} cursor-pointer`}>
                    {initial_Array
                        .filter((i: any) => is_instruments ? i.category === activeCategory : i)
                        .map((i: any) => (
                            <div className={`${CSS.listItem} items-inline`} key={i.id}>
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


    const [deleteModal, setDeleteModal] = useState<boolean>(false)


    return (
        <section>



            <ul className={CSS.tabs}>

                {edit_menu
                    .filter((i: any) => i.category.includes(currentProfile?.category?.id))
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
                        <div className='items-inline' style={{ gap: '25px', alignItems: 'flex-start', justifyContent: 'center' }}>

                            <img src={newFile || `http://127.0.0.1:8000/${currentProfile?.photo}`} width={200} alt='profile'
                                style={{ height: '218px', objectFit: 'cover' }} />
                            {/* <label htmlFor='photo'>
                                <SvgIcon id={'upload-image'} color='#fff' />
                                Ανέβασμα
                            </label>

                            <input
                                {...register('file')}
                                id='photo' type='file' style={{ position: 'absolute', top: '-20000px' }}
                                onChange={(file: any) => setNewFile(URL.createObjectURL(file.target.files[0]))}
                            /> */}

                            <div style={{ display: 'flex', gap: '20px', flexDirection: 'column', width: '100%' }}>


                                <div className='items-inline' style={{ gap: '20px' }}>
                                    <input
                                        type='text'
                                        placeholder='Όνομα'
                                        {...register('name', { required: 'Υποχρεωτικό πεδίο' })}
                                    />



                                    {!has_natural_presence &&
                                        <select
                                            className={CSS.city_dropdown}
                                            {...register('city')}>
                                            {cities?.map((city: any) => (
                                                <option key={city.id} value={[city?.latitude, city?.longitude, city?.id]} >
                                                    {city.name}
                                                </option>
                                            ))}
                                        </select>
                                    }

                                </div>

                                <textarea {...register('bio')}/> 
                                <br></br>
                                <br></br>
                                <br></br>


                            </div>

                        </div>

                    </div>

                }

                {tab === 2 && update_array(genres, setMyGenres, my_genres, false)}
                {tab === 3 && update_array(studio_services, setMyServices, my_services, false)}
                {tab === 4 && update_array(instruments, setMyInstruments, my_instruments, true)}

                {tab === 5 &&

                    <div style={{ width: '70%' }}>

                        <MapContainer
                            // @ts-ignore
                            center={[currentProfile.latitude, currentProfile.longitude]}
                            zoom={13}
                            style={{ width: '100%', height: '500px', margin: '20px 0' }}
                        >

                            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                            <ChangeView center={position} />
                            <LocationMarker />


                        </MapContainer>

                        <div className='items-inline' style={{ gap: '20px', paddingBottom: '20px' }}>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                                <label>Διεύθυνση</label>
                                <input type='text' value={new_address || currentProfile?.address} />
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                                <label>Πόλη</label>
                                <select
                                    className={CSS.city_dropdown}
                                    {...register('city')}
                                    onChange={(e) => {
                                        setPosition([e?.target?.value.split(",")[0], e?.target?.value.split(",")[1]])
                                    }}
                                >
                                    {cities?.map((city: any) => (
                                        <option key={city.id} value={[city?.latitude, city?.longitude, city?.id]}>
                                            {city.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                }

                {tab === 6 &&

                    <div className={CSS.info_stats} style={{gap: '20px'}}>
                        <h4 className={CSS.statsHeading}>Διαγραφή λογαριασμού</h4>
                        <p className={CSS.statsParagraph}>Αυτή η ενέργεια είναι μη αναστρέψιμη. Δε θα μπορέσετε να επαναφέρετε το προφίλ σας</p>
                        {deleteModal && <button type='button' onClick={() => setDeleteModal(false)}>Ακύρωση</button>}
                        <button type='button'
                            onClick={() => deleteModal ? deleteProfile() : setDeleteModal(true)}>
                            {deleteModal ? 'Ναι, μόνιμη διαγραφή' : 'Διαγραφή Προφίλ'}
                        </button>



                    </div>


                }

                <div className={CSS.bottom_section}>
                    <button type='submit' className='btn blue_btn'>Ενημέρωση</button>
                    <button type='reset' className='btn discard_btn' style={{ backgroundColor: '#9A9A9A' }}
                        onClick={() => { setTab(1); close() }}>  Ακύρωση </button>
                </div>
            </form>

        </section>
    )

})
export default EditProfile