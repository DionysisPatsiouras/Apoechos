import { useState, useContext, useEffect } from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import UtilsContext from '../context/UtilsContext'

import { useMap } from 'react-leaflet'
export default function Map() {


    let { cities, get_cities }: any = useContext(UtilsContext)

    const [coordinates, setCoordinates] = useState<any>([37.983810, 23.727539])

    const [latitude, setLatitude] = useState<any>(coordinates?.[0])
    const [longitude, setLongitude] = useState<any>(coordinates?.[1])


    useEffect(() => {
        get_cities()
        setLatitude(coordinates?.[0])
        setLongitude(coordinates?.[1])

    }, [coordinates])


    function ChangeView({ center, zoom }: any) {
        const map = useMap();
        map.setView(center, zoom);
        return null;
    }



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




            <MapContainer
                // @ts-ignore
                center={[33.91907336973602, 35.51552625946782]}
                zoom={13}
                style={{ width: '100%', height: '400px' }} >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                <ChangeView center={[latitude || Number(coordinates?.[0]), longitude || Number(coordinates?.[1])]} />

            </MapContainer>



        </div>
    )
}