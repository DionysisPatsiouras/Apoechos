import {  useEffect, useState, forwardRef } from 'react'
import { MapContainer, Marker, TileLayer, useMap } from 'react-leaflet'

const Location = forwardRef(function EditProfile(props: any, ref: any) {


    const [coordinates, setCoordinates] = useState<any>({
        latitude: props?.latitude,
        longitude: props?.longitude
    })

    useEffect(() => {

        setCoordinates({
            latitude: props?.latitude,
            longitude: props?.longitude
        })

    }, [props])

    // console.log(coordinates)

    function ChangeView({ center, zoom }: any) {
        const map = useMap();
        map.setView(center, zoom);
        return null;
    }

    return (


        <MapContainer
            // @ts-ignore
            center={[coordinates.latitude, coordinates.longitude]}
            zoom={13}
            style={{ width: '100%', height: '200px' }}
        >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <ChangeView center={[coordinates.latitude, coordinates.longitude]} />

            <Marker position={[coordinates?.latitude, coordinates?.longitude]}>
            </Marker>


        </MapContainer>

    )

})
export default Location