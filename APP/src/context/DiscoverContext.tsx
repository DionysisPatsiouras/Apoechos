import { createContext, useState, useEffect, useContext } from 'react'
import Call from '../utils/Call'
import { Routes } from '../utils/Routes'

import { Colors } from '../App'
import SearchValidation from '../utils/SearchValidation'
// import { genres } from '../utils/MusicianUtils'
// import { studio_services } from '../utils/Lists'


const DiscoverContext = createContext({})

export default DiscoverContext


export const DiscoverProvider = ({ children }: any) => {

    const color = useContext<any>(Colors)


    const [selected, setSelected] = useState<any>([])
    const [all, setAll] = useState<any>([])
    const [allMusicians, setAllMusicians] = useState<any>([])
    const [allStudios, setAllStudios] = useState<any>([])
    const [allStores, setAllStores] = useState<any>([])
    const [allStages, setAllStages] = useState<any>([])
    const [allBands, setAllBands] = useState<any>([])

    const [search, setSearch] = useState<string>('')
    const [citySearch, setCitySearch] = useState<string>('')
    const [genreSearch, setGenreSearch] = useState<string>('')
    const [studio_services_search, setStudioServicesSearch] = useState<string>('')
    const [instrument_search, setInstrumentSearch] = useState<string>('')


    const [onHover, setOnHover] = useState('')
    const [filtered_cities, setFilteredCities] = useState<any[]>([])
    const [filtered_genres, setFilteredGenres] = useState<any[]>([])
    const [filtered_studio_services, setFilteredStudioServices] = useState<any[]>([])
    const [filtered_instruments, setFilteredInstruments] = useState<any[]>([])


    const [activeTab, setActiveTab] = useState('Everything')



    const [cities, setCities] = useState<any[]>([])
    const [studio_services, setStudioServices] = useState<any[]>([])
    const [genres, setGenres] = useState<any[]>([])
    const [instruments, setInstruments] = useState<any[]>([])


    const call_profiles = new Call(Routes.profiles.all, 'GET')
    const call_cities = new Call(Routes.profiles.cities, 'GET')
    const call_studio_services = new Call(Routes.profiles.studio_services, 'GET')
    const call_genres = new Call(Routes.profiles.genres, 'GET')
    const call_instruments = new Call(Routes.profiles.instruments, 'GET')



    useEffect(() => {

        call_studio_services
            .GET()
            .then((res) => setStudioServices(res?.[1].map((i: any) => i.name)))
            .catch((err: any) => console.warn(err))
        call_cities
            .GET()
            .then((res) => setCities(res?.[1].map((i: any) => i.name)))
            .catch((err: any) => console.warn(err))
        call_genres
            .GET()
            .then((res) => setGenres(res?.[1].map((i: any) => i.name)))
            .catch((err: any) => console.warn(err))
        call_instruments
            .GET()
            .then((res) => setInstruments(res?.[1].map((i: any) => i.name)))
            .catch((err: any) => console.warn(err))


        call_profiles
            .GET()
            .then((res: any) => {
                // console.log(res?.[1])
                setSelected(res?.[1])
                setAll(res?.[1])
                setAllMusicians(res?.[1].filter((profile: any) => profile?.category?.name === "Musician"))
                setAllStudios(res?.[1].filter((profile: any) => profile?.category?.name === "Studio"))
                setAllStores(res?.[1].filter((profile: any) => profile?.category?.name === "Store"))
                setAllStages(res?.[1].filter((profile: any) => profile?.category?.name === "Stage"))
                setAllBands(res?.[1].filter((profile: any) => profile?.category?.name === "Band"))

            })
            .catch((err: any) => console.warn(err))


    }, [])

    // console.warn(genres)


    const filters = [
        {
            id: 'Everything', label: 'Περιοχή', data: cities,
            setSearch: setCitySearch, search: citySearch,
            filtered: filtered_cities, setFilters: setFilteredCities,
        },
        {
            id: 'Musicians', label: 'Είδη', data: genres,
            setSearch: setGenreSearch, search: genreSearch,
            filtered: filtered_genres, setFilters: setFilteredGenres,
        },
        {
            id: 'Musicians', label: 'Όργανα', data: instruments,
            setSearch: setInstrumentSearch, search: instrument_search,
            filtered: filtered_instruments, setFilters: setFilteredInstruments,
        },
        {
            id: 'Music Studio', label: 'Υπηρεσίες', data: studio_services,
            setSearch: setStudioServicesSearch, search: studio_services_search,
            filtered: filtered_studio_services, setFilters: setFilteredStudioServices
        },
        // {
        //     id: 'Bands', label: 'Συγκροτήματα', data: genres,
        //     setSearch: setGenreSearch, search: genreSearch,
        //     filtered: filtered_genres, setFilters: setFilteredGenres
        // }
    ]


    let tabs: any = [
        { label: 'Όλα', color: 'black', action: () => { setSelected(all); setActiveTab('Everything'); } },
        { label: 'Μουσικοί', color: color?.musician, action: () => { setSelected(allMusicians); setActiveTab('Musicians'); } },
        { label: 'Συγκροτήματα', color: color?.band, action: () => { setSelected(allBands); setActiveTab('Bands') } },
        { label: 'Στούντιο', color: color?.studio, action: () => { setSelected(allStudios); setActiveTab('Music Studio') } },
        { label: 'Καταστήματα', color: color?.store, action: () => { setSelected(allStores); setActiveTab('Music Stores') } },
        { label: 'Σκηνές', color: color?.stage, action: () => { setSelected(allStages); setActiveTab('Live Stages') } }
    ]

    const basicFiltering =
        selected
            .filter((profile: any) => SearchValidation(profile?.name, search))
            .filter((profile: any) =>
                filtered_cities.length === 0 ? !filtered_cities.includes(cities) : filtered_cities.includes(profile?.city?.name))


    const filteredData =
        activeTab === 'Musicians' ?
            basicFiltering
                .filter((profile: any) =>
                    profile?.genres?.some((genre: any) =>
                        filtered_genres.length === 0 ? !filtered_genres.includes(genres) : filtered_genres.includes(genre?.name)))
                .filter((profile: any) =>
                    profile?.instruments?.some((instrument: any) =>
                        filtered_instruments.length === 0 ? !filtered_instruments.includes(genres) : filtered_instruments.includes(instrument?.name)))

            : activeTab === 'Music Studio' ?
                basicFiltering
                    .filter((profile: any) =>
                        profile?.studio_services?.some((service: any) =>
                            filtered_studio_services.length === 0 ? !filtered_studio_services.includes(studio_services) : filtered_studio_services.includes(service?.name)))
                : basicFiltering





    const handle_checkbox = (event: any, state: any) => {
        const { value, checked } = event.target;
        state((prevCategories: any) =>
            checked
                ? [...prevCategories, value]
                : prevCategories.filter((all_values: any) => all_values !== value)
        )
    }



    let contextData = {
        activeTab: activeTab,
        tabs: tabs,
        filteredData: filteredData,
        setSearch: setSearch,
        onHover: onHover,
        setOnHover: setOnHover,
        handle_checkbox: handle_checkbox,
        filters: filters
    }



    return (
        <DiscoverContext.Provider value={contextData}>
            {children}
        </DiscoverContext.Provider>
    )
}