import CSS from '../css/Discover/Discover.module.css'
import { useState, useContext, useEffect } from 'react'

// components
import Tab from '../components/Discover/Tab'
import SvgIcon from '../components/SvgIcon'
import Card from '../components/Discover/Card'

// utils
import SearchValidation from '../utils/SearchValidation'
import { cities, genres } from '../utils/MusicianUtils'

// context
import DiscoverContext from '../context/DiscoverContext'

export default function Discover() {

    let {
        activeTab, tabs, color, filteredData,
        citySearch, setSearch, setCitySearch,
        onHover, setOnHover, filtered_cities,
        genreSearch, setGenreSearch, filtered_genres,
        setFilteredCities, handle_checkbox, setFilteredGenres
    }: any = useContext(DiscoverContext)



    return (
        <div className={CSS.container}>

            <section className={CSS.filters}>

                <p className={CSS.filter_title}>Περιοχή</p>
                <div className='items-inline' style={{ padding: '0 0 0 20px' }}>
                    <SvgIcon id='search' color='#C8C8C8' />
                    <input className={CSS.filter_search}
                        type='search' placeholder='Αναζήτηση...'
                        onChange={(e) => setCitySearch(e.target.value)} />
                </div>
                <ul className={CSS.filters_list}>
                    {cities
                        .filter((city: string) => SearchValidation(city, citySearch))
                        .map((city: string) => (
                            <li key={city}>
                                <input
                                    id={city}
                                    type='checkbox'
                                    value={city}
                                    // onChange={handleCities}
                                    onChange={(event) => handle_checkbox(event, setFilteredCities)}
                                    checked={filtered_cities.includes(city)}
                                />
                                <label htmlFor={city}>{city}</label>
                            </li>
                        ))}
                </ul>

                <div style={{ display: activeTab === 'Musicians' ? 'block' : 'none' }}>

                    <p className={CSS.filter_title}>Είδη</p>
                    <div className='items-inline' style={{ padding: '0 0 0 20px' }}>
                        <SvgIcon id='search' color='#C8C8C8' />
                        <input className={CSS.filter_search}
                            type='search' placeholder='Αναζήτηση...'
                            onChange={(e) => setGenreSearch(e.target.value)} />
                    </div>

                    <ul className={CSS.filters_list} >
                        {genres
                            .filter((genre: string) => SearchValidation(genre, genreSearch))
                            .map((genre: string) => (
                                <li key={genre}>
                                    <input
                                        id={genre}
                                        type='checkbox'
                                        value={genre}
                                        // onChange={handleGenres}
                                        onChange={(event) => handle_checkbox(event, setFilteredGenres)}
                                        checked={filtered_genres.includes(genre)}
                                    />
                                    <label htmlFor={genre}>{genre}</label>
                                </li>
                            ))}
                    </ul>
                </div>
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
                    ))
                    }

                </section>
            </section>


        </div >
    )
}