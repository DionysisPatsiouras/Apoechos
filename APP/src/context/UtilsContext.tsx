import { createContext, useState } from "react"
import Call from "../utils/Call"
import { Routes } from "../utils/Routes"

const UtilsContext = createContext({})

export default UtilsContext


export const UtilsProvider = ({ children }: any) => {


    let [cities, setCities] = useState<any[]>([])
    let [genres, setGenres] = useState<any[]>([])
    let [instruments, setInstruments] = useState<any[]>([])
    let [studio_services, setStudioServices] = useState<any[]>([])
    let [categories, setCategories] = useState<any[]>([])
    let [instrumentTypes, setInstrumentTypes] = useState<any[]>([])

    let [my_profiles, setMyProfiles] = useState<any>([])
    let [all_stages, setAllStages] = useState<any>([])
    let [bands_and_musicians, setBandsAndMusicians] = useState<any>([])

    let [labels, setLabels] = useState<any[]>([])

    const get_my_profiles = () => {
        const get_my_profiles = new Call(Routes.profiles.my_profiles, 'GET')
        get_my_profiles.GET().then((res) => setMyProfiles(res[1])).catch((err) => console.warn(err))
    }


    const get_categories = () => {
        const fetch_categories = new Call(Routes.profiles.categories, 'GET')
        fetch_categories.GET_NO_TOKEN().then((res) => setCategories(res)).catch((err: any) => console.warn(err))
    }

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

    const get_stages = () => {
        const fetch_stages = new Call(Routes.profiles.stages, 'GET')
        fetch_stages.GET_NO_TOKEN().then((res) => setAllStages(res?.[1])).catch((err) => console.warn(err))
    }
    const get_bands_and_musicians = () => {
        const fetch_bands_and_musicians = new Call(Routes.profiles.bandsAndMusicians, 'GET')
        fetch_bands_and_musicians.GET_NO_TOKEN().then((res) => setBandsAndMusicians(res?.[1])).catch((err) => console.warn(err))
    }



    const get_labels = (category_id: string) => {
        const get_labels = new Call(Routes.posts.titles, 'GET')
        get_labels
            .GET()
            .then((res) => {
                // console.log(res)
                setLabels(res
                    .filter((i: any) => i.categoryId?.id === category_id)
                    .map((i: any) => ({ value: i.id, label: i.title, category: i.categoryId?.id }))
                )
            })
    }



    function remove_doubles(data: any) {
        return data.filter((value: any, index: any) => data.indexOf(value) === index)
    }


    const get_instrument_categories = () => {
        const fetch_instrument_categories = new Call(Routes.profiles.instruments, 'GET')
        fetch_instrument_categories.GET_NO_TOKEN().then((res) => setInstrumentTypes(res[1].map((type: any) => type.category))).catch((err) => console.warn(err))
    }

    let instrument_categories = remove_doubles(instrumentTypes)


    let contextData = {
        cities, get_cities,
        genres, get_genres,
        studio_services, get_studio_services,
        instruments, get_instruments,
        categories, get_categories,
        instrumentTypes, get_instrument_categories,
        instrument_categories,
        my_profiles, get_my_profiles,
        all_stages, get_stages,
        bands_and_musicians, get_bands_and_musicians,
        labels, get_labels,

    }



    return (
        <UtilsContext.Provider value={contextData}>
            {children}
        </UtilsContext.Provider>
    )
}
