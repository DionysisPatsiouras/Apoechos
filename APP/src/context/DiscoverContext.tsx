import { createContext, useState, useEffect, useContext } from 'react'
import Call from '../utils/Call'
import { Routes } from '../utils/Routes'

import { Colors } from '../App'
const DiscoverContext = createContext({})

export default DiscoverContext


export const DiscoverProvider = ({ children }: any) => {

    const color = useContext<any>(Colors)


    // const [search, setSearch] = useState<string>('')
    // const [citySearch, setCitySearch] = useState<string>('')


    const [selected, setSelected] = useState<any>([])
    const [all, setAll] = useState<any>([])
    const [allMusicians, setAllMusicians] = useState<any>([])
    const [allStudios, setAllStudios] = useState<any>([])
    const [allStores, setAllStores] = useState<any>([])
    const [allStages, setAllStages] = useState<any>([])
    const [allBands, setAllBands] = useState<any>([])

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


    const [activeTab, setActiveTab] = useState('Everything')

    let tabs: any = [
        { label: 'Everything', color: 'black', action: () => { setSelected(all); setActiveTab('Everything') } },
        { label: 'Musicians', color: color?.musician, action: () => { setSelected(allMusicians); setActiveTab('Musicians') } },
        { label: 'Bands', color: color?.band, action: () => { setSelected(allBands); setActiveTab('Bands') } },
        { label: 'Music Studio', color: color?.studio, action: () => { setSelected(allStudios); setActiveTab('Music Studio') } },
        { label: 'Music Stores', color: color?.store, action: () => { setSelected(allStores); setActiveTab('Music Stores') } },
        { label: 'Live Stages', color: color?.stage, action: () => { setSelected(allStages); setActiveTab('Live Stages') } }
    ]

    let contextData = {
        setSelected: setSelected,
        selected: selected,
        activeTab: activeTab,
        tabs: tabs,
        color: color
        

    }





    return (
        <DiscoverContext.Provider value={contextData}>
            {children}
        </DiscoverContext.Provider>
    )
}