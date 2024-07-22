import { useState, useContext, useEffect } from 'react'
import { MapContainer, Marker, TileLayer, Popup, useMap } from 'react-leaflet'
import UtilsContext from '../context/UtilsContext'
// import logo from '../img/logo.png'
import CSS from '../css/Map/Map.module.css'

// utils
import { handle_checkbox } from '../utils/functions/handle_checkbox'
import Call from '../utils/Call'
import { Routes } from '../utils/Routes'

// @ts-ignore
import L from 'leaflet'

export default function Map() {


    let { cities, get_cities }: any = useContext(UtilsContext)

    const [coordinates, setCoordinates] = useState<any>([37.983810, 23.727539])

    const [latitude, setLatitude] = useState<any>(coordinates?.[0])
    const [longitude, setLongitude] = useState<any>(coordinates?.[1])
    const [selectedCategories, setSelectedCategories] = useState<any[]>([])
    const [profiles, setProfiles] = useState<any[]>([])


    const studioIcon = new L.Icon({
        iconUrl: require("../img/studio.png"),
        iconSize: [45, 45],
        iconAnchor: [17, 46],
        popupAnchor: [0, -46],
    })
    const storeIcon = new L.Icon({
        iconUrl: require("../img/store.png"),
        iconSize: [45, 45],
        iconAnchor: [17, 46],
        popupAnchor: [0, -46],
    })
    const stageIcon = new L.Icon({
        iconUrl: require("../img/stage.png"),
        iconSize: [45, 45],
        iconAnchor: [17, 46],
        popupAnchor: [0, -46],
    })

    const call_profiles = new Call(Routes.profiles.all, 'GET')

    useEffect(() => {
        get_cities()

        setLatitude(coordinates?.[0])
        setLongitude(coordinates?.[1])

        call_profiles
            .GET_NO_TOKEN()
            .then((res: any) =>
                setProfiles(res?.[1].filter((profile: any) => profile?.category?.id !== 1 && profile?.category?.id !== 2) )
            )
            .catch((err: any) => console.warn(err))

    }, [coordinates])



    function ChangeView({ center, zoom }: any) {
        const map = useMap();
        map.setView(center, zoom);
        return null;
    }

    console.log(profiles)

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
        <div style={{ display: 'flex' }}>

            <aside className={CSS.sidebar}>
                <select onChange={(e) => setCoordinates(e.target.value.split(','))} className={CSS.city_dropdown}>
                    {cities.map((city: any) => (
                        <option
                            key={city?.id}
                            value={[city?.latitude, city?.longitude]} >
                            {city.name}
                        </option>
                    ))}
                </select>

                <ul>
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

            </aside>





            <MapContainer
                // @ts-ignore
                center={[33.91907336973602, 35.51552625946782]}
                zoom={13}
                style={{ width: '100%', height: height - 55 }} >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                <ChangeView center={[latitude || Number(coordinates?.[0]), longitude || Number(coordinates?.[1])]} />

                {profiles

                    .filter((profile: any) =>
                        selectedCategories.length === 0
                            ? !selectedCategories.includes(categories)
                            : selectedCategories.includes(profile?.category?.id.toString()))


                    .map((item: any, i: number) => (

                        <Marker key={i} position={[item?.latitude, item?.longitude]}
                            // @ts-ignore
                            icon={
                                item?.category?.id === 3 ? studioIcon
                                    : item?.category?.id === 4 ? storeIcon
                                        : item?.category?.id === 5 && stageIcon

                            }>
                            <Popup>

                                {item?.name}
                            </Popup>
                        </Marker>

                    ))}


            </MapContainer>



        </div>
    )
}