import { useState, useContext, useEffect } from 'react'
import { MapContainer, Marker, TileLayer, Popup, useMap } from 'react-leaflet'
import UtilsContext from '../context/UtilsContext'
// import logo from '../img/logo.png'
import CSS from '../css/Map/Map.module.css'
import { Link } from 'react-router-dom'
// utils
import { handle_checkbox } from '../utils/functions/handle_checkbox'
import Call from '../utils/Call'
import { Routes } from '../utils/Routes'

// @ts-ignore
import L from 'leaflet'
import SvgIcon from '../components/SvgIcon'
import NewMessageWindow from '../components/Messages/NewMessageWindow'
import Modal from '../components/Modal'
import ProfileImage from '../components/ProfileImage'

export default function Map() {


    let { cities, get_cities }: any = useContext(UtilsContext)

    const [coordinates, setCoordinates] = useState<any>([38.083810, 23.727539])

    const [latitude, setLatitude] = useState<any>(coordinates?.[0])
    const [longitude, setLongitude] = useState<any>(coordinates?.[1])
    const [selectedCategories, setSelectedCategories] = useState<any[]>([])
    const [profiles, setProfiles] = useState<any[]>([])
    const [selectedProfile, setSelectedProfile] = useState<any>({})
    const [modal, setModal] = useState<boolean>(false)



    const studioIcon: any = new L.Icon({
        iconUrl: require("../img/studio.png"),
        iconSize: [25, 41],
        iconAnchor: [17, 46],
        popupAnchor: [0, -46],
    })
    const storeIcon: any = new L.Icon({
        iconUrl: require("../img/store.png"),
        iconSize: [25, 41],
        iconAnchor: [17, 46],
        popupAnchor: [0, -46],
    })
    const stageIcon: any = new L.Icon({
        iconUrl: require("../img/stage.png"),
        iconSize: [25, 41],
        iconAnchor: [17, 46],
        popupAnchor: [0, -46],
    })

    const call_profiles = new Call(Routes.profiles.all, 'GET')

    useEffect(() => {

        document.title = 'Apoechos - Χάρτης'
        get_cities()

        setLatitude(coordinates?.[0])
        setLongitude(coordinates?.[1])

        call_profiles
            .GET_NO_TOKEN()
            .then((res: any) =>
                setProfiles(res?.[1].filter((profile: any) => profile?.category?.id !== 1 && profile?.category?.id !== 2))
            )
            .catch((err: any) => console.warn(err))

    }, [coordinates])



    function ChangeView({ center, zoom }: any) {
        const map = useMap();
        map.setView(center, zoom);
        return null;
    }

    // console.log(selectedProfile)

    const [height, setHeight] = useState<any>(window.innerHeight)

    useEffect(() => {
        window.addEventListener("resize", () => setHeight(window.innerHeight))
    }, [])

    let categories = [
        { id: 3, label: "Στούντιο" },
        { id: 4, label: "Καταστήματα" },
        { id: 5, label: "Σκηνές" }
    ]



    return (
        <div className='items-column'>

            <Modal open={modal} close={() => setModal(!modal)} withContainer title='Νέο μήνυμα' btn>
                <NewMessageWindow receiver={selectedProfile} />

            </Modal>

            <aside className={CSS.sidebar}>
                <div className='items-inline' style={{ gap: '20px' }}>
                    <select
                        onChange={(e) => {
                            setSelectedProfile({});
                            setCoordinates(e.target.value.split(','));
                        }}
                        className={CSS.city_dropdown}>
                        {cities.map((city: any) => (
                            <option
                                key={city?.id}
                                value={[city?.latitude, city?.longitude]} >
                                {city.name}
                            </option>
                        ))}
                    </select>

                    <ul className='items-inline' style={{ gap: '20px' }}>
                        {categories.map((category: any) => (
                            <li key={category?.id} className='items-inline' style={{ gap: '5px' }}>
                                <input
                                    type='checkbox'
                                    id={category.id}
                                    value={category?.id}
                                    className='cursor-pointer'
                                    onChange={(e) => handle_checkbox(setSelectedCategories, e.target)}
                                />
                                <label htmlFor={category?.id} className='cursor-pointer'>{category?.label}</label>
                            </li>

                        ))}
                    </ul>
                </div>
            </aside>

            <section className='items-inline' style={{ alignItems: 'flex-start' }}>





                <MapContainer
                    // @ts-ignore
                    center={[33.91907336973602, 35.51552625946782]}
                    zoom={7}
                    style={{ width: '100%', height: height - 87 - 55 }} >
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                    <ChangeView center={[selectedProfile?.latitude || latitude || Number(coordinates?.[0]), selectedProfile?.longitude || longitude || Number(coordinates?.[1])]} />

                    {profiles

                        .filter((profile: any) =>
                            selectedCategories.length === 0
                                ? !selectedCategories.includes(categories)
                                : selectedCategories.includes(profile?.category?.id.toString()))


                        .map((item: any, i: number) => (

                            <Marker key={i} position={[item?.latitude, item?.longitude]}
                                eventHandlers={{ click: () => { setSelectedProfile(item) } }}
                                icon={
                                    item?.category?.id === 3 ? studioIcon
                                        : item?.category?.id === 4 ? storeIcon
                                            : item?.category?.id === 5 && stageIcon
                                }>

                            </Marker>

                        ))}


                </MapContainer>


                {selectedProfile.name &&
                    <aside className={`${CSS.selectedProfile} items-column`}>
                        <SvgIcon id='close' width={15} onClick={() => setSelectedProfile({})} />


                        <ProfileImage
                            photo={selectedProfile?.photo}
                            category={selectedProfile?.category}
                            onClick={() => setModal(!modal)}
                            size={184}
                        />
                        {/* <img
                            className='circle_img'
                            src={`http://127.0.0.1:8000/${selectedProfile?.photo}`}
                            width={184} height={184}
                            alt='Profile photo' />

                        <SvgIcon
                            className={CSS.categoryIcon}
                            id={selectedProfile?.category?.icon}
                            width={20}
                            height={20}
                            color='#fff'
                            style={{ backgroundColor: selectedProfile?.category?.color }} /> */}
                        <div className={CSS.info}>
                            <h2>{selectedProfile?.name}</h2>
                            <b>{selectedProfile?.city?.name}</b>
                            <span>{selectedProfile?.address}</span>
                            <br></br>
                            <Link to={`/profile/${selectedProfile?.profileId}`}>
                                <button type='button' className='btn blue_btn' style={{ width: '70%', margin: '0 auto' }} >Προβολή</button>
                            </Link>

                            <button type='button' onClick={() => setModal(true)} className='btn blue_btn' style={{ width: '70%', margin: '10px auto 0 auto', }} >Μήνυμα</button>


                        </div>
                    </aside>
                }


            </section>

        </div>
    )
}