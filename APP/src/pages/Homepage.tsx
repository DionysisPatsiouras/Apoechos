// import { MapContainer } from 'react-leaflet/MapContainer'
// import { TileLayer } from 'react-leaflet/TileLayer'
// import { useMap } from 'react-leaflet/hooks'
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'

export default function Homepage() {


    function LocationMarker() {
        const [position, setPosition] = useState(null)
        const map = useMapEvents({
          click() {
            map.locate()
          },
          locationfound(e) {
            setPosition(e.latlng)
            map.flyTo(e.latlng, map.getZoom())
          },
        })
      
        return position === null ? null : (
          <Marker position={position}>
            <Popup>You are here</Popup>
          </Marker>
        )
      }
    return (
        <div>


            {/* @ts-ignore */}
            <MapContainer center={[51.505, -0.09]} zoom={13} style={{ width: '100%', height: '400px' }} >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {/* @ts-ignore */}
                <Marker position={[51.505, -0.09]} draggable={true}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
                <LocationMarker />
            </MapContainer>
        </div>
    )
}