import CSS from '../css/Discover/Discover.module.css'
import { useState, useContext } from 'react'

// components
import Tab from '../components/Discover/Tab'
import SvgIcon from '../components/SvgIcon'
import Card from '../components/Discover/Card'

// utils
import SearchValidation from '../utils/SearchValidation'
import { cities } from '../utils/MusicianUtils'

import DiscoverContext from '../context/DiscoverContext'

export default function Discover() {


    let { selected, activeTab, tabs, color}: any = useContext(DiscoverContext)

    const [search, setSearch] = useState<string>('')
    const [citySearch, setCitySearch] = useState<string>('')
    const [onHover, setOnHover] = useState('')

    const [filtered_cities, setFilteredCities] = useState<any[]>([])




    // const loop = (value: any, value2: any) => {
    //     for (let index = 0; index < 1000; index++) {
    //         // const element = array[index];
    //         return value?.instruments?.[index]?.name === value2
    //     }
    // }





    const filteredData = selected
        .filter((data: any) =>
            SearchValidation(data?.artistic_nickname, search) ||
            SearchValidation(data?.title, search) ||
            SearchValidation(data?.name, search)
        )
        .filter((location: any) => filtered_cities.length === 0 ? !filtered_cities.includes(cities) : filtered_cities.includes(location?.city))




    const handleCities = (event: any) => {
        const { value, checked } = event.target;

        setFilteredCities((prevCategories: any) =>
            checked
                ? [...prevCategories, value]
                : prevCategories.filter((allGroups: any) => allGroups !== value)
        )
    }



    return (
        <div className={CSS.container}>

            <section className={CSS.filters}>

                <p className={CSS.filter_title}>Περιοχή</p>
                <ul className={CSS.filters_list}>
                    <input type='search' placeholder='Αναζήτηση...' onChange={(e) => setCitySearch(e.target.value)} />

                    {cities
                        .filter((city: string) => SearchValidation(city, citySearch))
                        .map((city: string) => (
                            <li key={city}>
                                <input
                                    id={city}
                                    type='checkbox'
                                    value={city}
                                    onChange={handleCities}
                                    checked={filtered_cities.includes(city)}
                                />
                                <label htmlFor={city}>{city}</label>
                            </li>
                        ))}
                </ul>
            </section>



            <section className={CSS.cards_container}>

                <ul className={CSS.profiles_menu}>
                    {tabs.map((tab: any, index: number) => (
                        <Tab
                            key={index}
                            label={tab.label}
                            color={tab.color}
                            onMouseEnter={() => setOnHover(tab.label)}
                            onMouseLeave={() => setOnHover('')}
                            onClick={tab.action}
                            activeTab={activeTab}
                            onHover={onHover}
                        />
                    ))}
                </ul>

                <section className={CSS.search}>

                    <div className={CSS.left_section}>
                        <SvgIcon id='search' />
                        <input type='text' placeholder='Αναζήτηση...' onChange={(e) => setSearch(e.target.value)} />
                    </div>


                    <p>Αποτελέσματα: {filteredData?.length}</p>
                </section>

                <section className={CSS.all_cards}>
                    {filteredData?.map((item: any, index: number) => (
                        <Card
                            key={index}
                            id={item?.musicianId || item?.studioId || item?.storeId || item?.stageId || item?.bandId}
                            category={item?.category}
                            city={item?.city}
                            photo={item?.photo}
                            artistic_nickname={item?.artistic_nickname || item?.title || item?.name}
                            color={color?.[item?.category]}
                        />
                    ))}
                </section>
            </section>


        </div >
    )
}