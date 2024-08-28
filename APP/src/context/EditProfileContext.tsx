import { createContext, useState, useEffect, useContext } from "react"
import Call from "../utils/Call"
import { Routes } from "../utils/Routes"
import { useForm } from 'react-hook-form'
import UtilsContext from "./UtilsContext"
import ProfileContext from "./ProfileContext"

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



    const { register, handleSubmit, setValue } = useForm()

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



    const updateProfile = (data: any) => {

        console.log("🚀 ~ updateProfile ~ data:", data)

        // console.warn(my_city)


        let formData: any = new FormData()

        formData.append('name', data?.name)
        formData.append('city', data?.city)
        formData.append('bio', data?.bio)

        my_address && formData.append('address', my_address)
        data?.photo?.length !== 0 && formData.append('photo', data?.file?.[0])
        // formData.append('photo', data?.file?.[0])
        // formData.append('photo', data?.file?.[0])



        for (let i = 0; i < my_services.length; i++) {
            formData.append('studio_services', my_services[i])
        }
        for (let i = 0; i < my_genres.length; i++) {
            formData.append('genres', my_genres[i])
        }
        for (let i = 0; i < my_instruments.length; i++) {
            formData.append('instruments', my_instruments[i])
        }

        


        const update_profile = new Call(Routes.profiles.update(currentProfile?.profileId), 'PATCH', formData)
        console.log("🚀 ~ updateProfile ~ formData:", formData)
        update_profile
            .PATCH_MEDIA()
            .then((res) => {
                // console.log(res);
                setTab(1);
                close_edit(true)
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

    }



    return (
        <EditProfileContext.Provider value={contextData}>
            {children}
        </EditProfileContext.Provider>
    )
}
