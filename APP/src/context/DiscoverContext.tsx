import { createContext, useState, useEffect, useContext } from 'react'
import Call from '../utils/Call'
import { Routes } from '../utils/Routes'

import { Colors } from '../App'
import SearchValidation from '../utils/SearchValidation'
import { cities, genres } from '../utils/MusicianUtils'
const DiscoverContext = createContext({})


export default DiscoverContext


export const DiscoverProvider = ({ children }: any) => {

    const color = useContext<any>(Colors)


    const [search, setSearch] = useState<string>('')
    const [citySearch, setCitySearch] = useState<string>('')
    const [genreSearch, setGenreSearch] = useState<string>('')
    const [onHover, setOnHover] = useState('')
    const [filtered_cities, setFilteredCities] = useState<any[]>([])
    const [filtered_genres, setFilteredGenres] = useState<any[]>([])



    const [selected, setSelected] = useState<any>([])
    const [all, setAll] = useState<any>([])
    const [allMusicians, setAllMusicians] = useState<any>([])
    const [allStudios, setAllStudios] = useState<any>([])
    const [allStores, setAllStores] = useState<any>([])
    const [allStages, setAllStages] = useState<any>([])
    const [allBands, setAllBands] = useState<any>([])

    const [activeTab, setActiveTab] = useState('Everything')


    const call_profiles = new Call(Routes.profiles.everything, 'GET')



    useEffect(() => {

        call_profiles
            .GET()
            .then((res: any) => {
                // console.log(res)
                setSelected(res?.[0]?.everything)
                setAll(res?.[0]?.everything)
                setAllMusicians(res?.[0]?.musicians)
                setAllStudios(res?.[0]?.studios)
                setAllStores(res?.[0]?.stores)
                setAllStages(res?.[0]?.stages)
                setAllBands(res?.[0]?.bands)
            })
            .catch((err: any) => console.warn(err))
    }, [])

    // console.log(allMusicians)


    let tabs: any = [
        { label: 'Everything', color: 'black', action: () => { setSelected(all); setActiveTab('Everything'); } },
        { label: 'Musicians', color: color?.musician, action: () => { setSelected(allMusicians); setActiveTab('Musicians'); } },
        { label: 'Bands', color: color?.band, action: () => { setSelected(allBands); setActiveTab('Bands') } },
        { label: 'Music Studio', color: color?.studio, action: () => { setSelected(allStudios); setActiveTab('Music Studio') } },
        { label: 'Music Stores', color: color?.store, action: () => { setSelected(allStores); setActiveTab('Music Stores') } },
        { label: 'Live Stages', color: color?.stage, action: () => { setSelected(allStages); setActiveTab('Live Stages') } }
    ]

    const basicFiltering = selected
        .filter((profile: any) => SearchValidation(profile?.artistic_nickname, search) || SearchValidation(profile?.title, search) || SearchValidation(profile?.name, search))
        .filter((profile: any) => filtered_cities.length === 0 ? !filtered_cities.includes(cities) : filtered_cities.includes(profile?.city))

    const filteredData =
        activeTab === 'Musicians' ?
            basicFiltering
                .filter((profile: any) =>
                    profile?.genres?.some((genre: any) =>
                        filtered_genres.length === 0 ? !filtered_genres.includes(genres) : filtered_genres.includes(genre?.name)))
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

        selected: selected,
        activeTab: activeTab,
        tabs: tabs,
        color: color,
        search: search,
        citySearch: citySearch,
        onHover: onHover,
        filtered_cities: filtered_cities,
        setFilteredCities: setFilteredCities,
        setOnHover: setOnHover,
        setSearch: setSearch,
        setCitySearch: setCitySearch,
        setSelected: setSelected,
        filteredData: filteredData,


        genreSearch: genreSearch,
        setGenreSearch: setGenreSearch,
        filtered_genres: filtered_genres,
        setFilteredGenres: setFilteredGenres,


        handle_checkbox: handle_checkbox,


    }





    return (
        <DiscoverContext.Provider value={contextData}>
            {children}
        </DiscoverContext.Provider>
    )
}