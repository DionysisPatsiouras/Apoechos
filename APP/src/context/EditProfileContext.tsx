import { createContext, useState, useEffect, useContext } from "react"
import Call from "../utils/Call"
import { Routes } from "../utils/Routes"
import { useForm } from 'react-hook-form'
import { handle_checkbox } from "../utils/functions/handle_checkbox"
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
    const [newName, setNewName] = useState<any>(children?.props?.profile?.name)


    const [my_services, setMyServices] = useState<any[]>([])
    const [my_genres, setMyGenres] = useState<any[]>([])
    const [my_instruments, setMyInstruments] = useState<any[]>([])

    const [newFile, setNewFile] = useState<any>()
    // console.warn(profile)


    useEffect(() => {

        setMyServices(profile?.studio_services?.map((i: any) => i?.id?.toString()));
        setMyGenres(profile?.genres?.map((i: any) => i?.id?.toString()))
        setMyInstruments(profile?.instruments?.map((i: any) => i?.id?.toString()))
        get_cities()
        get_genres()
        get_studio_services()
        get_instruments()

    }, [children])




    let edit_menu = [
        { icon: 'account', label: 'Στοιχεία', category: 'All', id: 1 },
        { icon: 'genres', label: 'Είδη', category: 'Μουσικοί', id: 2 },
        { icon: 'studio_services', label: 'Υπηρεσίες', category: 'Στούντιο', id: 3 },
        { icon: 'keys', label: 'Όργανα', category: 'Μουσικοί', id: 4 },
    ]


    const updateProfile = (data: any) => {
        
        console.log(children.props?.profile?.name)
        console.warn(data)

        let formData: any = new FormData()

        data?.name !== "" && formData.append('name', data?.name)
        data?.city !== "" && formData.append('city', data?.city)
        data?.bio !== "" && formData.append('bio', data?.bio)
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
        formData = new FormData()

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
        edit_menu,
        handle_checkbox,
        setTab,
        profile,
        handleSubmit,
        tab,
        studio_services,
        setMyServices,
        my_services,
        updateProfile,
        genres,
        setMyGenres,
        register,
        my_genres,
        instruments,
        setMyInstruments,
        my_instruments,
        cities,
        setNewFile,
        newFile,
        setNewName,
        newName

    }



    return (
        <EditProfileContext.Provider value={contextData}>
            {children}
        </EditProfileContext.Provider>
    )
}
