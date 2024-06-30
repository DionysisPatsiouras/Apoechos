import CSS from '../css/Discover/Discover.module.css'
import { useContext } from 'react'

// components
import SvgIcon from '../components/SvgIcon'
import Card from '../components/Discover/Card'

// utils
import SearchValidation from '../utils/SearchValidation'

// context
import DiscoverContext from '../context/DiscoverContext'

export default function Discover() {

    let {
        activeTab, tabs, filteredData,
        setSearch,
        handle_checkbox,
        onHover, setOnHover, filters,

    }: any = useContext(DiscoverContext)

    // console.log(activeTab)


    return (
        <div className={CSS.container}>

            <section className={CSS.filters}>



                {filters.map((item: any, index: number) => (

                    <div key={index} style={{ display: activeTab === item.id || item?.id === 'Everything' ? 'block' : 'none' }}>
                        <p className={CSS.filter_title}>{item.label}</p>
                        <div className='items-inline' style={{ padding: '0 0 0 20px' }}>
                            <SvgIcon id='search' color='#C8C8C8' />
                            <input className={CSS.filter_search}
                                type='search' placeholder='Αναζήτηση...'
                                onChange={(e) => item.setSearch(e.target.value)} />
                        </div>

                        <ul className={CSS.filters_list} >
                            {item?.data
                                .filter((i: string) => SearchValidation(i, item?.search))
                                .map((i: string) => (
                                    <li key={i}>
                                        <input
                                            id={i}
                                            type='checkbox'
                                            value={i}
                                            onChange={(event) => handle_checkbox(item?.setFilters, event.target)}
                                            checked={item?.filtered.includes(i)}
                                        />
                                        <label htmlFor={i}>{i}</label>
                                    </li>
                                ))}
                        </ul>
                    </div>
                ))}

            </section>



            <section className={CSS.cards_container}>


                <ul className={CSS.profiles_menu}>
                    {tabs.map((category: any, index: number) => (
                        <div
                            key={index}
                            className={CSS.profile_tab}
                            onClick={category?.action}
                        >
                            <li
                                onMouseEnter={() => setOnHover(category?.label)}
                                onMouseLeave={() => setOnHover('')}
                                style={{ color: category?.color }}>
                                {category?.label}
                            </li>
                            <span style={{
                                background: onHover === category?.label || activeTab === category?.label
                                    ? category?.color
                                    : '#ffffff'
                            }}></span>
                        </div>
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
                        <Card key={index} data={item} />
                    ))}

                </section>
            </section>


        </div>
    )
}