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

    const [uploadedFile, setUploadedFile] = useState<any>()

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


    const [fetchedCity, setFetchedCity] = useState<any>()
    const [city, setCity] = useState<any>(1)
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


    const check_img_type = (file: any) => {
        setUploadedFile(
            file?.target?.files?.[0]?.type === "image/jpeg" ||
                file?.target?.files?.[0]?.type === "image/jpg" ||
                file?.target?.files?.[0]?.type === "image/png"
                ? URL.createObjectURL(file?.target?.files?.[0])
                : alert('Μη επιτρεπόμενη μορφή αρχείου\nΕπιτρεπόμενες μορφές: .png, .jpg, .jpeg'))
    }



    // console.log(position)

    useEffect(() => {



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

        // console.warn(data)
        let correct_city = cities.filter((i: any) => i.name === fetchedCity)


        formData.append('photo', data?.file?.[0])
        formData.append('name', data?.name)
        formData.append('user', me?.id)
        formData.append('category', category)


        if (has_natural_presence) {
            formData.append('latitude', position?.[0])
            formData.append('longitude', position?.[1])
            formData.append('address', address)
            formData.append('city', correct_city?.[0]?.id || 1)
        } else {
            formData.append('city', city)
        }

        for (let index in genreArray) {
            formData.append('genres', genreArray[index])
        }
        for (let index in studio_services_array) {
            formData.append('studio_services', studio_services_array[index])
        }
        for (let index in instrumentArray) {
            formData.append('instruments', instrumentArray[index])
        }


        const create_profile = new Call(Routes.profiles.new, 'POST', formData)

        uploadedFile === undefined ?
            alert('Παρακαλώ ανεβάστε εικόνα')
            :
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
        address, setAddress,
        fetchedCity, setFetchedCity,
        uploadedFile, setUploadedFile,
        check_img_type
    }



    return (
        <CreateNewProfileContext.Provider value={contextData}>
            {children}
        </CreateNewProfileContext.Provider>
    )
}