import { createContext, useState, useEffect } from "react"
import Call from "../utils/Call"
import { Routes } from "../utils/Routes"
import { useForm } from 'react-hook-form'

const EditProfileContext = createContext({})


export default EditProfileContext


export const EditProfileProvider = ({ children }: any) => {

    console.log(children.props)
    let profile = children?.props?.profile

    // const form = useForm()
    const { register, handleSubmit, formState } = useForm({
        defaultValues: {
            name: children?.props?.profile && children?.props?.profile?.name

        }
    })
    const { errors } = formState

    const [tab, setTab] = useState<number>(1)
    const [myname, setMyName] = useState<any>(children?.props?.profile && children?.props?.profile?.name)

    const [cities, setCitites] = useState<any[]>([])
    const [studioServices, setStudioServices] = useState<any[]>([])

    const get_cities = new Call(Routes.profiles.cities, 'GET')
    const get_studio_services = new Call(Routes.profiles.studio_services, 'GET')

    const [my_services, setMyServices] = useState<any[]>([])



    useEffect(() => {

        setMyServices(children?.props?.profile && children?.props?.profile?.studio_services?.map((i: any) => i?.id?.toString()))

        get_studio_services
            .GET()
            .then((res) => setStudioServices(res[1]))
            .catch((err) => console.warn(err))

        get_cities
            .GET()
            .then((res => setCitites(res[1])))
            .catch((err) => console.warn(err))

    }, [children.props])


    const handle_checkbox = (event: any, state: any) => {
        const { value, checked } = event.target;
        state((prevCategories: any) =>
            checked
                ? [...prevCategories, value]
                : prevCategories?.filter((all_values: any) => all_values !== value)
        )
    }


    let edit_menu = [
        { icon: 'account', label: 'Στοιχεία', category: 'All', id: 1 },
        { icon: 'genres', label: 'Είδη', category: 'Musician', id: 2 },
        { icon: 'studio_services', label: 'Υπηρεσίες', category: 'Studio', id: 3 },
        { icon: 'keys', label: 'Όργανα', category: 'Store', id: 4 },
    ]


    const updateProfile = (data: any) => {


        let formData: any = new FormData()
        // data?.file?.[0] && formData.append('photo', data?.file?.[0])
        data?.name !== "" && formData.append('name', data?.name)
        // data?.city !== "" && formData.append('city', data?.city)


        for (let i = 0; i < my_services.length; i++) {
            formData.append('studio_services', my_services[i])
        }

        // console.log(formData)
        const update_profile = new Call(Routes.profiles.update(profile?.profileId), 'PATCH', formData)
        update_profile
            .PATCH_MEDIA()
            .then((res) => { console.log(res); setTab(1); children?.props?.close() })
            .catch((err) => console.warn(err))
    }
    let contextData = {
        edit_menu,
        handle_checkbox,
        setTab,
        profile,
        handleSubmit,
        tab,
        studioServices,
        setMyServices,
        my_services,
        updateProfile
    }



    return (
        <EditProfileContext.Provider value={contextData}>
            {children}
        </EditProfileContext.Provider>
    )
}
