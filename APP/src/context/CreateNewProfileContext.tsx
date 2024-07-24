import { createContext, useState, useEffect, useContext } from 'react'
import Call from '../utils/Call'
import { Routes } from '../utils/Routes'

import UserContext from './UserContext'
// import { patchUser } from '../utils/functions/patchUser'
// import AuthContext from '../context/AuthContext'
import UtilsContext from './UtilsContext'
import { handle_checkbox } from '../utils/functions/handle_checkbox'
import { useMap } from 'react-leaflet'
const CreateNewProfileContext = createContext({})
export default CreateNewProfileContext


export const CreateNewProfileProvider = ({ children }: any) => {

    let { updateDOM, setUpdateDOM }: any = useContext(UserContext)
    let {
        cities,
        get_cities,
        get_genres,
        genres,
        get_studio_services,
        get_instruments,
        instruments,
        studio_services,
        instrumentTypes, get_instrument_categories,
        instrument_categories
    }: any = useContext(UtilsContext)

    // console.log(instrument_categories)

    const [category, setCategory] = useState<number>()
    const [created, setCreated] = useState<boolean>(false)
    const [profileId, setProfileId] = useState<string>('')
    const [me, setMe] = useState<any>()


    // arrays
    const [genreArray, setGenreArray] = useState<any[]>([])
    const [instrumentArray, setInstrumentArray] = useState<any[]>([])
    const [studio_services_array, setStudioServicesArray] = useState<any[]>([])


    // URL params
    const queryParameters = new URLSearchParams(window.location.search)
    const param = queryParameters.get("category")


    // utils
    let has_natural_presence = param === "Καταστήματα" || param === "Σκηνές" || param === "Στούντιο"
    let is_musician = param === "Μουσικοί" ? true : false
    let has_genres = param === "Μουσικοί" || param === "Συγκροτήματα" ? true : false
    let has_services = param === "Στούντιο" ? true : false


    const fetch_me = new Call(Routes.user.me, 'GET')

    // const [coordinates, setCoordinates] = useState<any>([37.983810, 23.727539])
    // const [latitude, setLatitude] = useState<any>(coordinates?.[0])
    // const [longitude, setLongitude] = useState<any>(coordinates?.[1])
    const [city, setCity] = useState<any>()
    const [position, setPosition] = useState([37.9744464, 23.7478837])
    const [address, setAddress] = useState('')

    const [markerPosition, setMarkerPosition] = useState<any>()

    const updatePosition = (event: any) => {
        const { lat, lng } = event.target.getLatLng();
        setMarkerPosition({ lat, lng });
    }


    function ChangeView({ center, zoom }: any) {
        const map = useMap();
        map.setView(center, zoom);
        return null;
    }




console.log(position)

    useEffect(() => {

        // setLatitude(coordinates?.[0])
        // setLongitude(coordinates?.[1])

        fetch_me
            .GET()
            .then((res) => setMe(res))
            .catch((err) => console.warn(err))

        setCreated(false)
        setProfileId('')

        get_cities()
        get_genres()
        get_studio_services()
        get_instruments()
        get_instrument_categories()


        switch (param) {
            case "Μουσικοί":
                setCategory(1)
                break;
            case "Συγκροτήματα":
                setCategory(2)
                break;
            case "Στούντιο":
                setCategory(3)
                break;
            case "Καταστήματα":
                setCategory(4)
                break;
            case "Σκηνές":
                setCategory(5)
                break;
            default:
                break;
        }

    // }, [coordinates])
    }, [position])

    const onSubmit = async (data: any) => {

        let formData: any = new FormData()
        // console.log(data)

        let correct_city = cities.filter((i:any) => i.name === city)        

        // check if photo exists
        data?.file?.[0] && formData.append('photo', data?.file?.[0])
        formData.append('name', data?.name)
        formData.append('user', me?.id)
        formData.append('category', category)

    

        if (has_natural_presence) {
            formData.append('latitude', position?.[0])
            formData.append('longitude', position?.[1])
            formData.append('address', address)
            formData.append('city', correct_city?.[0]?.id || 1)
        }


        for (let i = 0; i < genreArray.length; i++) {
            formData.append('genres', genreArray[i])
        }
        for (let i = 0; i < studio_services_array.length; i++) {
            formData.append('studio_services', studio_services_array[i])
        }
        for (let i = 0; i < instrumentArray.length; i++) {
            formData.append('instruments', instrumentArray[i])
        }

        const create_profile = new Call(Routes.profiles.new, 'POST', formData)


        create_profile
            .POST_MEDIA()
            .then((res) => {
                console.log(res);
                setProfileId(res?.data?.profileId)
                setUpdateDOM(!updateDOM)
                setCreated(true)
            })
            .catch((err) => console.warn(err))

    }




    let contextData = {

        is_musician,
        has_genres,
        has_natural_presence,
        has_services,

        cities,
        genres,
        instruments,
        studio_services,


        param,
        onSubmit,
        handle_checkbox,
        genreArray, setGenreArray,

        instrumentArray, setInstrumentArray,
        studio_services_array, setStudioServicesArray,


        created,
        profileId,

        markerPosition,
        updatePosition,
        ChangeView,
        instrument_categories,
        city, setCity,
        position, setPosition,
        address, setAddress
    }



    return (
        <CreateNewProfileContext.Provider value={contextData}>
            {children}
        </CreateNewProfileContext.Provider>
    )
}