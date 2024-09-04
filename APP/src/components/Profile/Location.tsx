import { useEffect, useState, forwardRef } from 'react'
import { MapContainer, Marker, TileLayer, useMap, Popup } from 'react-leaflet'

const Location = forwardRef(function EditProfile(props: any, ref: any) {


    const [coordinates, setCoordinates] = useState<any>({
        latitude: props?.latitude,
        longitude: props?.longitude
    })

    const [height, setHeight] = useState<any>(window.innerHeight)
    const [width, setWidth] = useState<any>(window.innerWidth)

    useEffect(() => {
        window.addEventListener("resize", () => setHeight(window.innerHeight))
        window.addEventListener("resize", () => setWidth(window.innerWidth))
    }, [window.innerHeight])

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
            zoom={14}
            style={{ width: width - 800, height: height - 200 }}
        >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <ChangeView center={[coordinates.latitude, coordinates.longitude]} />

            <Marker position={[coordinates?.latitude, coordinates?.longitude]}>
                {props?.description &&
                    <Popup>
                        {props?.description}
                    </Popup>
                }

            </Marker>


        </MapContainer>

    )

})
export default Location