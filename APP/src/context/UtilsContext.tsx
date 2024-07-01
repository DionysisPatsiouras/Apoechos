import { createContext, useState, useEffect } from "react"
import Call from "../utils/Call"
import { Routes } from "../utils/Routes"

// const UserContext = createContext({})
const UtilsContext = createContext({})

export default UtilsContext


export const UtilsProvider = ({ children }: any) => {


    // let [updateDOM, setUpdateDOM] = useState<boolean>(false)


    let [cities, setCities] = useState<any[]>([])
    let [genres, setGenres] = useState<any[]>([])
    let [instruments, setInstruments] = useState<any[]>([])
    let [studio_services, setStudioServices] = useState<any[]>([])
    // let [categories, setCategories] = useState<any[]>([])



    // const get_categories = () => {
    //     const fetch_categories = new Call(Routes.profiles.categories, 'GET')
    //     fetch_categories .GET_NO_TOKEN().then((res) => setCategories([...categories, ...res])) .catch((err: any) => console.warn(err))
    // }

    const get_studio_services = () => {
        const fetch_studio_services = new Call(Routes.profiles.studio_services, 'GET')
        fetch_studio_services.GET_NO_TOKEN().then((res) => setStudioServices(res?.[1])).catch((err) => console.warn(err))
    }

    const get_instruments = () => {
        const fetch_instruments = new Call(Routes.profiles.instruments, 'GET')
        fetch_instruments.GET_NO_TOKEN().then((res) => setInstruments(res?.[1])).catch((err) => console.warn(err))
    }

    const get_cities = () => {
        const fetch_cities = new Call(Routes.profiles.cities, 'GET')
        fetch_cities.GET_NO_TOKEN().then((res) => setCities(res?.[1])).catch((err) => console.warn(err))
    }

    const get_genres = () => {
        const fetch_genres = new Call(Routes.profiles.genres, 'GET')
        fetch_genres.GET_NO_TOKEN().then((res) => setGenres(res?.[1])).catch((err) => console.warn(err))
    }


    let contextData = {
        cities,
        get_cities,
        get_genres,
        genres,
        get_studio_services,
        get_instruments,
        instruments,
        studio_services,
        // get_categories,
        // categories
    }



    return (
        <UtilsContext.Provider value={contextData}>
            {children}
        </UtilsContext.Provider>
    )
}
