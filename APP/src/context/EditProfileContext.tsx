import { createContext, useState, useEffect, useContext } from "react"
import Call from "../utils/Call"
import { Routes } from "../utils/Routes"
import { useForm } from 'react-hook-form'
import UtilsContext from "./UtilsContext"

const EditProfileContext = createContext({})


export default EditProfileContext


export const EditProfileProvider = ({ children }: any) => {

    let {
        cities,
        get_cities,
        get_genres,
        genres,
        get_studio_services,
        get_instruments,
        instruments,
        studio_services
    }: any = useContext(UtilsContext)

    // console.log(children.props)
    let profile = children?.props?.profile

    // const form = useForm()
    const { register, handleSubmit, formState, resetField } = useForm({
        defaultValues: {
            name: children?.props?.profile

        }
    })
    // const { errors } = formState

    const [tab, setTab] = useState<number>(1)
    // const [newName, setNewName] = useState<any>(children?.props?.profile?.name)


    const [my_services, setMyServices] = useState<any[]>([])
    const [my_genres, setMyGenres] = useState<any[]>([])
    const [my_instruments, setMyInstruments] = useState<any[]>([])
    const [my_name, setMyName] = useState<string>()
    const [my_city, setMyCity] = useState<string>()
    const [my_address, setMyAddress] = useState<string>()
    const [my_bio, setMyBio] = useState<any>()

    const [newFile, setNewFile] = useState<any>()



    useEffect(() => {

        setMyServices(profile?.studio_services?.map((i: any) => i?.id?.toString()));
        setMyGenres(profile?.genres?.map((i: any) => i?.id?.toString()))
        setMyInstruments(profile?.instruments?.map((i: any) => i?.id?.toString()))

        get_cities()
        get_genres()
        get_studio_services()
        get_instruments()

        setMyName(profile?.name)
        setMyCity(profile?.city?.id)
        setMyBio(profile?.bio)
        setMyAddress(profile?.address)

    }, [children?.props])


    // console.log(children.props)
    let edit_menu = [
        { icon: 'account', label: 'Στοιχεία', category: 'All', id: 1 },
        { icon: 'genres', label: 'Είδη', category: 'Μουσικοί', id: 2 },
        { icon: 'studio_services', label: 'Υπηρεσίες', category: 'Στούντιο', id: 3 },
        { icon: 'keys', label: 'Όργανα', category: 'Μουσικοί', id: 4 },
    ]


    const updateProfile = (data: any) => {


        // console.warn(data)
        // console.warn(my_city)

        let formData: any = new FormData()

        formData.append('name', my_name)
        formData.append('city', my_city)
        formData.append('bio', my_bio)

        my_address && formData.append('address', my_address)
        data?.photo?.length !== 0 && formData.append('photo', data?.photo?.[0])




        for (let i = 0; i < my_services.length; i++) {
            formData.append('studio_services', my_services[i])
        }
        for (let i = 0; i < my_genres.length; i++) {
            formData.append('genres', my_genres[i])
        }
        for (let i = 0; i < my_instruments.length; i++) {
            formData.append('instruments', my_instruments[i])
        }
        // formData = new FormData()

        // resetField("name")

        const update_profile = new Call(Routes.profiles.update(profile?.profileId), 'PATCH', formData)
        update_profile
            .PATCH_MEDIA()
            .then((res) => {
                console.log(res);
                setTab(1);
                children?.props?.close();
                //    kinda works
                // resetField("name")

            })
            .catch((err) => console.warn(err))
    }
    let contextData = {
        tab, setTab,
        cities,
        genres,
        studio_services,
        edit_menu,

        profile,
        handleSubmit,

        my_services, setMyServices,
        updateProfile,

        register,
        my_genres, setMyGenres,
        instruments,
        my_instruments, setMyInstruments,

        newFile, setNewFile,
        my_name, setMyName,
        my_city, setMyCity,
        my_bio, setMyBio,
        my_address, setMyAddress

    }



    return (
        <EditProfileContext.Provider value={contextData}>
            {children}
        </EditProfileContext.Provider>
    )
}
