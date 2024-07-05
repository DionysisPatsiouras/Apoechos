import { useState, useContext, useEffect } from 'react'
import { MapContainer, Marker, TileLayer, Popup } from 'react-leaflet'
import UtilsContext from '../context/UtilsContext'
import { useMap } from 'react-leaflet'
import { handle_checkbox } from '../utils/functions/handle_checkbox'
import Call from '../utils/Call'
import { Routes } from '../utils/Routes'
export default function Map() {


    let { cities, get_cities}: any = useContext(UtilsContext)

    const [coordinates, setCoordinates] = useState<any>([37.983810, 23.727539])

    const [latitude, setLatitude] = useState<any>(coordinates?.[0])
    const [longitude, setLongitude] = useState<any>(coordinates?.[1])
    const [selectedCategories, setSelectedCategories] = useState<any[]>([])
    const [profiles, setProfiles] = useState<any[]>([])


    const call_profiles = new Call(Routes.profiles.all, 'GET')

    useEffect(() => {
        get_cities()

        setLatitude(coordinates?.[0])
        setLongitude(coordinates?.[1])

        call_profiles
            .GET_NO_TOKEN()
            .then((res: any) =>
                setProfiles(res?.[1])
            )
            .catch((err: any) => console.warn(err))

    }, [coordinates])

    // console.log(profiles)
    // console.log(selectedCategories)


    function ChangeView({ center, zoom }: any) {
        const map = useMap();
        map.setView(center, zoom);
        return null;
    }



    let categories = [
        { id: 3, label: "Στούντιο" },
        { id: 4, label: "Καταστήματα" },
        { id: 5, label: "Σκηνές" }
    ]


    return (
        <div style={{ display: 'flex' }}>

            <aside>
                <select onChange={(e) => setCoordinates(e.target.value.split(','))}>
                    {cities.map((city: any) => (
                        <option
                            key={city?.id}
                            value={[city?.latitude, city?.longitude]} >
                            {city.name}
                        </option>
                    ))}
                </select>


            </aside>


            {categories
                .map((category: any, i: number) => (
                    <div key={i}>
                        <label>{category?.label}</label>
                        <input type='checkbox'
                            value={category?.id}
                            onChange={(e) => handle_checkbox(setSelectedCategories, e.target)}
                        />
                    </div>

                ))}


            <MapContainer
                // @ts-ignore
                center={[33.91907336973602, 35.51552625946782]}
                zoom={13}
                style={{ width: '100%', height: '400px' }} >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                <ChangeView center={[latitude || Number(coordinates?.[0]), longitude || Number(coordinates?.[1])]} />

                {profiles
       
                    .filter((profile: any) => 
                        selectedCategories.length === 0
                            ? !selectedCategories.includes(categories)
                            : selectedCategories.includes(profile?.category?.id.toString()))


                    .map((item: any, i:number) => (
                        <Marker key={i} position={[item?.latitude, item?.longitude]}>
                            <Popup>

                                {item?.name}
                            </Popup>
                        </Marker>

                    ))}


            </MapContainer>



        </div>
    )
}