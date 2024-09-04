import { createContext, useState, useEffect, useContext } from "react"
import Call from "../utils/Call"
import { Routes } from "../utils/Routes"
import { useForm } from 'react-hook-form'
import UtilsContext from "./UtilsContext"
import ProfileContext from "./ProfileContext"
import { useSnackbarContext } from "./SnackbarContext"
import { Marker, useMapEvents, useMap } from "react-leaflet"
import axios from "axios"

const EditProfileContext = createContext({})


export default EditProfileContext


export const EditProfileProvider = ({ children }: any) => {

    let {
        cities, get_cities,
        genres, get_genres,
        instruments, get_instruments,
        studio_services, get_studio_services
    }: any = useContext(UtilsContext)

    let { currentProfile, close_edit }: any = useContext(ProfileContext)
    let { snackbar }: any = useSnackbarContext()



    const { register, handleSubmit, setValue, control } = useForm()

    const [tab, setTab] = useState<number>(1)


    const [my_services, setMyServices] = useState<any[]>([])
    const [my_genres, setMyGenres] = useState<any[]>([])
    const [my_instruments, setMyInstruments] = useState<any[]>([])
    const [my_address, setMyAddress] = useState<string>()


    const [newFile, setNewFile] = useState<any>()


    useEffect(() => {
        get_cities()
        get_genres()
        get_studio_services()
        get_instruments()
    }, [])



    useEffect(() => {

        setMyServices(currentProfile?.studio_services?.map((i: any) => i?.id?.toString()));
        setMyGenres(currentProfile?.genres?.map((i: any) => i?.id?.toString()))
        setMyInstruments(currentProfile?.instruments?.map((i: any) => i?.id?.toString()))

        setValue('name', currentProfile?.name)
        setValue('city', currentProfile?.city?.id)
        setValue('bio', currentProfile?.bio)
        setValue('address', currentProfile?.address)


    }, [currentProfile?.profileId])



    // console.log(children.props)
    let edit_menu = [
        { icon: 'account', label: 'Στοιχεία', category: 'All', id: 1 },
        { icon: 'genres', label: 'Είδη', category: 'Μουσικοί', id: 2 },
        { icon: 'studio_services', label: 'Υπηρεσίες', category: 'Στούντιο', id: 3 },
        { icon: 'keys', label: 'Όργανα', category: 'Μουσικοί', id: 4 },
    ]

    const [fetchedCity, setFetchedCity] = useState<any>()
    const [city, setCity] = useState<any>(1)
    const [position, setPosition] = useState([37.9744464, 23.7478837])
    const [address, setAddress] = useState('')


    const getAddress = async (lat: any, lng: any) => {
        try {
            const response = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`)

            const response_city = await axios.get(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=el`)

            console.log(response?.data)
            // console.log(response_city?.data)
            setValue('address', `${response?.data?.address?.road} ${response?.data?.address?.house_number !== undefined ? response?.data?.address?.house_number : ''}`)
            setAddress(`${response?.data?.address?.road} ${response?.data?.address?.house_number !== undefined ? response?.data?.address?.house_number : ''}`)
            setPosition([response?.data?.lat, response?.data?.lon])
            setFetchedCity(response_city?.data?.city)
        } catch (error) {
            console.error('Error fetching the address:', error)
        }
    }


    function ChangeView({ center, zoom }: any) {
        const map = useMap();
        map.setView(center, zoom);
        return null;
    }

    const LocationMarker = () => {
        useMapEvents({
            click(e) {
                setPosition([e?.latlng?.lat, e?.latlng.lng]);
                getAddress(e?.latlng?.lat, e?.latlng.lng);
            },

        })

        return position === null ? null : (

            <Marker
                //   @ts-ignore
                position={position}
                draggable={true}
                eventHandlers={{
                    dragend: (e: any) => {
                        setPosition([e?.target?._latlng?.lat, e?.target?._latlng?.lng]);
                        getAddress(e?.target?._latlng?.lat, e?.target?._latlng?.lng);
                    }
                }}
            >
            </Marker>
        )
    }



    const updateProfile = (data: any) => {

        // console.log("🚀 ~ updateProfile ~ data:", data)

        // console.warn(my_city)
        console.log(address)


        let formData: any = new FormData()

        formData.append('name', data?.name)
        formData.append('city', data?.city)
        formData.append('bio', data?.bio)

        currentProfile?.address && formData.append('address', address)
        // my_address && formData.append('address', my_address)
        // data?.photo?.length !== 0 && formData.append('photo', data?.file?.[0])
        // formData.append('photo', data?.file?.[0])
        // formData.append('photo', data?.file?.[0])


        for (let index in my_services) {
            formData.append('studio_services', my_services[index])
        }
        for (let index in my_genres) {
            formData.append('genres', my_genres[index])
        }
        for (let index in my_instruments) {
            formData.append('instruments', my_instruments[index])
        }


        const update_profile = new Call(Routes.profiles.update(currentProfile?.profileId), 'PATCH', formData)

        update_profile
            .PATCH_MEDIA()
            .then((res) => {
                // console.log(res);
                setTab(1);
                close_edit(true)
                snackbar('Επιτυχής ενημέρωση')
            })
            .catch((err) => console.warn(err))
    }
    let contextData = {


        tab, setTab,
        cities,
        genres,
        studio_services,
        edit_menu,

        currentProfile,
        handleSubmit,

        my_services, setMyServices,
        updateProfile,

        register,
        my_genres, setMyGenres,
        instruments,
        my_instruments, setMyInstruments,

        newFile, setNewFile,
        control, LocationMarker,
        position, ChangeView
    }



    return (
        <EditProfileContext.Provider value={contextData}>
            {children}
        </EditProfileContext.Provider>
    )
}
