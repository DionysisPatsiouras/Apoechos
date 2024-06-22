import { createContext, useState, useEffect } from "react"
import Call from "../utils/Call"
import { Routes } from "../utils/Routes"

const UserContext = createContext({})

export default UserContext


export const UserProvider = ({ children }: any) => {

    const [me, setMe] = useState<any[]>([])
    const [myProfiles, setMyProfiles] = useState<any[]>([])
    // const [loading, setLoading] = useState<boolean>(false)

    const fetch_me = new Call(Routes.user.me, 'GET')
    const fetch_my_profiles = new Call(Routes.profiles.my_profiles, 'GET')

    const fetchMyProfiles = () => {
        fetch_my_profiles
            .GET()
            .then((res) => {
                setMyProfiles(res)
            })
            .catch((err) => console.warn(err))
    }

    const fetchMe = () => {
        fetch_me
            .GET()
            .then((res) => {
                setMe(res)
            })
            .catch((err) => console.warn(err))
    }



    useEffect(() => {

        
        fetchMyProfiles()
        fetchMe()

    }, [])



    let contextData = {
        me: me,
        myProfiles: myProfiles,
        fetchMyProfiles: fetchMyProfiles,
        fetchMe: fetchMe
    }



    return (
        <UserContext.Provider value={contextData}>
            {children}
        </UserContext.Provider>
    )
}
