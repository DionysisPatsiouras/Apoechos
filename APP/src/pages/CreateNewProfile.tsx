import { useContext, useEffect, useState } from 'react'
// import { Navigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'

// components
// import Confirmation from '../components/Confirmation'
import SvgIcon from '../components/SvgIcon'
import FormError from '../utils/FormError'

import CreateNewProfileContext from '../context/CreateNewProfileContext'
import CSS from '../css/CreateNewProfile/CreateNewProfile.module.sass'
import { Link } from 'react-router-dom'
import { MapContainer, Marker, TileLayer, Popup } from 'react-leaflet'



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
        latitude,
        longitude,
        setCoordinates,
        coordinates,
        markerPosition,
        updatePosition,
        ChangeView
    }: any = useContext(CreateNewProfileContext)





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

                        <form onSubmit={handleSubmit(onSubmit)}>

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
                                        onChange={(e) => setCoordinates(e.target.value.split(','))}>

                                        {cities.map((city: any) => (
                                            <option key={city.id}
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
                                                type='text'
                                                {...register('address', {
                                                    required: 'Αυτό το πεδίο είναι υποχρεωτικό'
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
                                    <div className={CSS.checkboxes_section}>
                                        {instruments.map((instr: any) => (
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
                                        // @ts-ignore
                                        center={[33.91907336973602, 35.51552625946782]}
                                        zoom={13}
                                        style={{ width: '100%', height: '400px' }} >
                                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                                        <ChangeView center={[
                                            markerPosition?.lat || Number(coordinates?.[0]) || latitude,
                                            markerPosition?.lng || Number(coordinates?.[1]) || longitude]} />

                                        <Marker
                                            position={[
                                                markerPosition?.lat || Number(coordinates?.[0]) || latitude,
                                                markerPosition?.lng || Number(coordinates?.[1]) || longitude]}
                                            // @ts-ignore
                                            draggable={true}
                                            eventHandlers={{
                                                dragend: (event: any) => updatePosition(event),
                                            }}
                                        >


                                        </Marker>



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