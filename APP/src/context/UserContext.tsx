import { createContext, useState, useEffect } from "react"
import Call from "../utils/Call"
import { Routes } from "../utils/Routes"
import { useContext } from 'react'
import AuthContext from "./AuthContext"

const UserContext = createContext({})

export default UserContext


export const UserProvider = ({ children }: any) => {

    const [me, setMe] = useState<any[]>([])
    const [myProfiles, setMyProfiles] = useState<any[]>([])
    let [updateDOM, setUpdateDOM] = useState<boolean>(false)

    const fetch_me = new Call(Routes.user.me, 'GET')
    const fetch_my_profiles = new Call(Routes.profiles.my_profiles, 'GET')

    let { user }: any = useContext(AuthContext)

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

        if (user) {
            fetchMyProfiles()
            fetchMe()
        }
        // console.log('me', me)


    }, [user])



    let contextData = {
        me, fetchMe,
        myProfiles, fetchMyProfiles,
        updateDOM, setUpdateDOM
    }



    return (
        <UserContext.Provider value={contextData}>
            {children}
        </UserContext.Provider>
    )
}
