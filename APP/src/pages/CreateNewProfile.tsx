import { useContext, useEffect, useState, useRef } from 'react'
// import { Navigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'

// components
// import Confirmation from '../components/Confirmation'
import SvgIcon from '../components/SvgIcon'
import FormError from '../utils/FormError'

import CreateNewProfileContext from '../context/CreateNewProfileContext'
import CSS from '../css/CreateNewProfile/CreateNewProfile.module.sass'
import { Link } from 'react-router-dom'
import { MapContainer, Marker, TileLayer, Popup, useMapEvents } from 'react-leaflet'
import axios from 'axios'



export default function CreateNewProfile() {

    const form = useForm()
    const { register, handleSubmit, formState } = form
    const { errors } = formState


    const [uploadedFile, setUploadedFile] = useState<any>()


    let {
        is_musician,
        has_genres,
        has_services,
        has_natural_presence,
        cities,
        genres,
        instruments,
        studio_services,
        onSubmit,
        handle_checkbox,
        setGenreArray,
        genreArray,
        instrumentArray,
        setInstrumentArray,
        setStudioServicesArray,
        studio_services_array,
        created,
        profileId,

        // updatePosition,
        ChangeView,
        instrument_categories,
        city, setCity,
        position, setPosition,
        address, setAddress
    }: any = useContext(CreateNewProfileContext)



    const [activeCategory, setActiveCategory] = useState<string>(instrument_categories[0])
  

    useEffect(() => {
        setActiveCategory(instrument_categories[0])
    }, [instrument_categories])


    const getAddress = async (lat: any, lng: any) => {
        try {
            const response = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`)

            const response_city = await axios.get(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=el`)

            // console.log(response_city?.data?.city)
            setAddress(`${response?.data?.address?.road} ${response?.data?.address?.house_number !== undefined ? response?.data?.address?.house_number : ''}`)
            setPosition([response?.data?.lat, response?.data?.lon])
            setCity(response_city?.data?.city)
        } catch (error) {
            console.error('Error fetching the address:', error);
        }
    };

    const LocationMarker = () => {
        useMapEvents({
            click(e) {
                setPosition([e?.latlng?.lat, e?.latlng.lng]);
                getAddress(e?.latlng?.lat, e?.latlng.lng);
            },

        })

        return position === null ? null : (

            <Marker
                //   @ts-ignore
                position={position}
                draggable={true}
                eventHandlers={{
                    dragend: (e: any) => {
                        setPosition([e?.target?._latlng?.lat, e?.target?._latlng?.lng]);
                        getAddress(e?.target?._latlng?.lat, e?.target?._latlng?.lng);
                    }
                }}
            >
            </Marker>
        )
    }
    // console.log('-------------------------')
    // console.log(city)
    // console.log(address)
    // console.log(position)

    return (
        <div className='space'>

            {/* {userData?.musicianId !== null && <Navigate to='/create' />} */}



            <div className='container'>

                {created &&
                    <div className={CSS.created}>
                        <SvgIcon id='check' color='#12ab37' width='80' height='80' />
                        <h2>Επιτυχής δημιουργία!</h2>
                        <p>Μπορείτε να αλλάξετε τις πληροφορίες του νέου σας προφίλ, ανα πάσα στιγμή!</p>
                        <br></br>
                        <Link to={`/profile/${profileId}`}>
                            <button className='blue_btn cursor-pointer'>  Προβολή </button>
                        </Link>
                    </div>}

                {!created &&
                    <div>
                        <h2>Νέο προφίλ</h2>
                        <hr className='divider'></hr>

                        <form onSubmit={handleSubmit(onSubmit)} noValidate>

                            <div className={CSS.personal_info}>
                                <div className={CSS.group} style={{ cursor: 'pointer' }}>


                                    <label htmlFor='picture'>
                                        <img className={CSS.image_preview} src={uploadedFile} width={20} height={20} alt='' />

                                    </label>

                                    {uploadedFile ?
                                        <p className={CSS.space_around} onClick={() => setUploadedFile(undefined)}><SvgIcon id={'delete'} /> Διαγραφή</p>
                                        :
                                        <p className={CSS.space_around}><SvgIcon id={'upload-image'} /> Μεταφόρτωση</p>
                                    }


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
                                    <FormError value={errors?.name} />

                                    <label>Πόλη</label>

                                    <select className={CSS.city_dropdown}
                                        {...register('city')}
                                        
                                        onChange={(e) =>
                                            setPosition([e?.target?.value.split(",")[0], e?.target?.value.split(",")[1]])
                                        }>
                                        <option selected></option>
                                        {cities
                                            .map((city: any) => (
                                                <option
                                            
                                                    key={city.id}
                                                    value={[city?.latitude, city?.longitude, city?.id]}
                                                >
                                                    {city.name}</option>
                                            ))}

                                    </select>
                                    <FormError value={errors?.city} />

                                    {errors?.city?.message}

                                    {has_natural_presence &&
                                        <>
                                            <label>Διεύθυνση</label>
                                            <input
                                                value={address}

                                                type='text'
                                                {...register('address', {

                                                    // required: 'Αυτό το πεδίο είναι υποχρεωτικό',
                                                    onChange: (e: any) => setAddress(e.target.value)
                                                })}
                                            />
                                            <FormError value={errors?.address} />

                                        </>
                                    }



                                </div>

                            </div>


                            {has_services &&
                                <>
                                    <hr className='divider'></hr>
                                    <h2>Υπηρεσίες</h2>
                                    <div className={CSS.checkboxes_section}>
                                        {studio_services.map((service: any) => (
                                            <div className={CSS.checkbox} key={service.id}>
                                                <input
                                                    {...register('studio_services', {
                                                        required: 'Επιλέξτε τουλάχιστον 1 υπηρεσία'
                                                    })}
                                                    id={service.id}
                                                    type='checkbox'
                                                    value={service.id}
                                                    onChange={(event) => handle_checkbox(setStudioServicesArray, event.target)}
                                                    checked={studio_services_array.includes(service.id.toString())}
                                                />
                                                <label htmlFor={service.id}>{service.name}</label>
                                            </div>
                                        ))}
                                    </div>
                                    <FormError value={errors?.genres} />
                                </>

                            }

                            {has_genres === true &&
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
                                                    onChange={(event) => handle_checkbox(setGenreArray, event.target)}
                                                    checked={genreArray.includes(genre.id.toString())}
                                                />
                                                <label htmlFor={genre.id}>{genre.name}</label>
                                            </div>
                                        ))}
                                    </div>
                                    <FormError value={errors?.genres} />
                                </>
                            }


                            {is_musician === true &&
                                <>
                                    <hr className='divider'></hr>
                                    <h2>Όργανα</h2>

                                    <ul className={CSS.categories_list}>
                                        {instrument_categories
                                            .map((item: any) => (
                                                <li
                                                    key={item}
                                                    onClick={() => setActiveCategory(item)}>
                                                    {item}
                                                </li>
                                            ))}
                                    </ul>

                                    <div className={CSS.checkboxes_section}>
                                        {instruments
                                            .filter((instr: any) => instr.category === activeCategory)
                                            .map((instr: any) => (
                                                <div className={CSS.checkbox} key={instr.id}>
                                                    <input
                                                        {...register('instruments', {
                                                            required: 'Επιλέξτε τουλάχιστον 1 όργανο',
                                                            maxLength: 2
                                                        })}
                                                        id={instr.id + instr.category}
                                                        type='checkbox'
                                                        value={instr.id}

                                                        onChange={(event) => handle_checkbox(setInstrumentArray, event.target)}
                                                        checked={instrumentArray.includes(instr.id.toString())}
                                                    />
                                                    <label htmlFor={instr.id + instr.category}>{instr.name}</label>
                                                </div>
                                            ))}
                                    </div>
                                    <FormError value={errors?.instruments} />
                                </>

                            }

                            {has_natural_presence &&
                                <>
                                    <hr className='divider'></hr>
                                    <h2>Τοποθεσία</h2>



                                    <MapContainer
                                        center={[position?.[0], position?.[1]]}
                                        zoom={13} style={{ height: "50vh", width: "100%" }}>

                                        <TileLayer
                                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                            attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
                                        />

                                        <ChangeView center={[position?.[0], position?.[1]]} />
                                        <LocationMarker />

                                    </MapContainer>
                                </>
                            }




                            <div className={CSS.buttonSection}>...
                                <button type='submit' className='btn'>Δημιουργία</button>
                            </div>
                        </form>




                    </div>
                }
            </div>
        </div >
    )
}