import { createContext, useState, useEffect, useContext } from "react"
import Call from "../utils/Call"
import { Routes } from "../utils/Routes"
import { useForm } from 'react-hook-form'
import UtilsContext from "./UtilsContext"

const ProfileContext = createContext({})


export default ProfileContext


export const ProfileProvider = ({ children }: any) => {


    // let {
    //     cities,
    //     get_cities,
    //     get_genres,
    //     genres,
    //     get_studio_services,
    //     get_instruments,
    //     instruments,
    //     studio_services
    // }: any = useContext(UtilsContext)

    let profile_id = window.location.pathname.replace('/profile/', '')

    const [my_profiles, setMyProfiles] = useState<any>([])
    const [currentProfile, setCurrentProfile] = useState<any>([])
    const [posts, setPosts] = useState<any[]>([])
    const [DOM, setDOM] = useState<boolean>(false)
    const [editMode, setEditMode] = useState<boolean>(false)



    const get_profile = new Call(Routes.profiles.id(profile_id), 'GET')
    const get_my_profiles = new Call(Routes.profiles.my_profiles, 'GET')
    const posts_by_id = new Call(Routes.posts.profile_id(profile_id), 'GET')

    const close_edit = (update_dom:boolean) => {
        setEditMode(false)
        update_dom && updateDOM()
    }


    const fetch_current_profile = () => {
        get_profile
            .GET_NO_TOKEN()
            .then((res: any) => setCurrentProfile(res))
            .catch((err) => console.warn(err))
    }

    const fetch_my_profiles = () => {
        get_my_profiles
            .GET()
            .then((res) => setMyProfiles(res[1]))
            .catch((err) => console.warn(err))
    }

    const fetch_posts = () => {
        posts_by_id.GET().then((res) => setPosts(res?.[1])).catch((err) => console.warn(err))
    }



    const updateDOM = () => {
        setDOM(!DOM)
    }




    useEffect(() => {
        fetch_my_profiles()

    }, [])

    useEffect(() => {
        fetch_current_profile()
        fetch_posts()
        // fetch_labels()

    }, [DOM])

    // console.warn(currentProfile?.category)

    let contextData = {
        my_profiles, fetch_my_profiles,
        profile_id,
        currentProfile, fetch_current_profile,
        posts,
        updateDOM,
        editMode, setEditMode,
        close_edit

    }



    return (
        <ProfileContext.Provider value={contextData}>
            {children}
        </ProfileContext.Provider>
    )
}
