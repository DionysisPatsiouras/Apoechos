import { createContext, useState, useEffect, useContext } from 'react'
import Call from '../utils/Call'
import { Routes } from '../utils/Routes'
import SearchValidation from '../utils/SearchValidation'
import { handle_checkbox } from '../utils/functions/handle_checkbox'
import UtilsContext from './UtilsContext'

const DiscoverContext = createContext({})

export default DiscoverContext


export const DiscoverProvider = ({ children }: any) => {

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


    const [activeTab, setActiveTab] = useState('Όλα')

    const [categories, setCategories] = useState<any[]>(
        [{ id: 0, name: 'Όλα', color: 'black', action: () => changeSelected(all, 'Everything') }]
    )


    const call_profiles = new Call(Routes.profiles.all, 'GET')
    const call_categories = new Call(Routes.profiles.categories, 'GET')


    const changeSelected = (value: any, value2: any) => {
        setSelected(value)
        setActiveTab(value2)
    }



    useEffect(() => {

        get_cities()
        get_studio_services()
        get_instruments()
        get_genres()


        call_categories
            .GET_NO_TOKEN()
            .then((res) => { setCategories([...categories, ...res]) })
            .catch((err: any) => console.warn(err))

        call_profiles
            .GET_NO_TOKEN()
            .then((res: any) => {
                // console.log(res?.[1])
                setSelected(res?.[1])
                setAll(res?.[1])
                setAllMusicians(res?.[1].filter((profile: any) => profile?.category?.id === 1))
                setAllBands(res?.[1].filter((profile: any) => profile?.category?.id === 2))
                setAllStudios(res?.[1].filter((profile: any) => profile?.category?.id === 3))
                setAllStores(res?.[1].filter((profile: any) => profile?.category?.id === 4))
                setAllStages(res?.[1].filter((profile: any) => profile?.category?.id === 5))


            })
            .catch((err: any) => console.warn(err))

        document.title = 'Apoechos - Ανακάλυψε'


    }, [])




    const filters = [
        {
            id: 'Όλα', label: 'Περιοχή', data: cities.map((i: any) => i.name),
            setSearch: setCitySearch, search: citySearch,
            filtered: filtered_cities, setFilters: setFilteredCities,
        },
        {
            id: categories?.[1]?.name, label: 'Είδη', data: genres.map((i: any) => i.name),
            setSearch: setGenreSearch, search: genreSearch,
            filtered: filtered_genres, setFilters: setFilteredGenres,
        },
        {
            id: categories?.[1]?.name, label: 'Όργανα', data: instruments.map((i: any) => i.name),
            setSearch: setInstrumentSearch, search: instrument_search,
            filtered: filtered_instruments, setFilters: setFilteredInstruments,
        },
        {
            id: categories?.[3]?.name, label: 'Υπηρεσίες', data: studio_services.map((i: any) => i.name),
            setSearch: setStudioServicesSearch, search: studio_services_search,
            filtered: filtered_studio_services, setFilters: setFilteredStudioServices
        },

    ]




    let tabs: any = [

        { label: 'Όλα', color: 'black', icon: 'expand', action: () => changeSelected(all, 'Όλα') },
        { label: categories?.[1]?.name, color: categories?.[1]?.color, icon: categories?.[1]?.icon, action: () => changeSelected(allMusicians, categories?.[1]?.name) },
        { label: categories?.[2]?.name, color: categories?.[2]?.color, icon: categories?.[2]?.icon, action: () => changeSelected(allBands, categories?.[2]?.name) },
        { label: categories?.[3]?.name, color: categories?.[3]?.color, icon: categories?.[3]?.icon, action: () => changeSelected(allStudios, categories?.[3]?.name) },
        { label: categories?.[4]?.name, color: categories?.[4]?.color, icon: categories?.[4]?.icon, action: () => changeSelected(allStores, categories?.[4]?.name) },
        { label: categories?.[5]?.name, color: categories?.[5]?.color, icon: categories?.[5]?.icon, action: () => changeSelected(allStages, categories?.[5]?.name) }

    ]



    const basicFiltering =
        selected
            .filter((profile: any) => SearchValidation(profile?.name, search))
            .filter((profile: any) =>
                filtered_cities.length === 0 ? !filtered_cities.includes(cities) : filtered_cities.includes(profile?.city?.name))


    const filteredData =

        activeTab === categories?.[1]?.name ?
            basicFiltering
                .filter((profile: any) =>
                    profile?.genres?.some((genre: any) =>
                        filtered_genres.length === 0 ? !filtered_genres.includes(genres) : filtered_genres.includes(genre?.name)))
                .filter((profile: any) =>
                    profile?.instruments?.some((instrument: any) =>
                        filtered_instruments.length === 0 ? !filtered_instruments.includes(genres) : filtered_instruments.includes(instrument?.name)))

            : activeTab === categories?.[3]?.name ?
                basicFiltering
                    .filter((profile: any) =>
                        profile?.studio_services?.some((service: any) =>
                            filtered_studio_services.length === 0 ? !filtered_studio_services.includes(studio_services) : filtered_studio_services.includes(service?.name)))
                : basicFiltering





    let contextData = {
        activeTab,
        tabs,
        filteredData,
        setSearch,
        handle_checkbox,
        onHover,
        setOnHover,
        filters,
    }



    return (
        <DiscoverContext.Provider value={contextData}>
            {children}
        </DiscoverContext.Provider>
    )
}