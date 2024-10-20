import CSS from '../css/Discover/Discover.module.css'
import { useContext } from 'react'

// components
import SvgIcon from '../components/SvgIcon'
import Card from '../components/Discover/Card'

// utils
import SearchValidation from '../utils/SearchValidation'

// context
import DiscoverContext from '../context/DiscoverContext'

import FixedButton from '../components/FixedButton'

import FullModal from '../components/FullModal'



export default function Discover() {

    let {
        activeTab, tabs, filteredData,
        setSearch, handle_checkbox,
        onHover, setOnHover, filters,
        toggleModal, modal

    }: any = useContext(DiscoverContext)

    // console.log(activeTab)




    return (
        <div className={CSS.container}>

            <FullModal open={modal} title='Φίλτρα' close={toggleModal}>
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
                                    .map((i: string, index: number) => (
                                        <li key={index}>
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
            </FullModal>




            <section className={CSS.cards_container}>

                <FixedButton icon='filter' onClick={toggleModal} />


                <div className={CSS.head}>


                    <ul className={CSS.profiles_menu}>
                        {tabs.map((category: any, index: number) => (
                            <div
                                key={index}
                                className={CSS.profile_tab}
                                onClick={category?.action}
                            >

                                <SvgIcon
                                    id={category?.icon}
                                    width={20} height={20}
                                    color={activeTab === category?.label ? '#fff' : category?.color}
                                    className={CSS.categoryIcon}
                                    style={{
                                        backgroundColor: activeTab === category?.label ? category?.color : '#fff',
                                        border: `2px solid ${category?.color}`
                                    }}
                                />

                                <div className={CSS.categoryLabel}>


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
                            </div>
                        ))}
                    </ul>


                    <section className={CSS.search}>
                        <div className={CSS.left_section}>
                            <SvgIcon id='search' />
                            <input type='text' placeholder='Αναζήτηση...' onChange={(e) => setSearch(e.target.value)} />
                        </div>
                        <p className={CSS.results}>Αποτελέσματα: {filteredData?.length}</p>
                    </section>

                </div>

                <section className={CSS.all_cards}>

                    {filteredData?.map((item: any, index: number) => (
                        <Card key={index} data={item} />
                    ))}

                </section>
            </section>


        </div>
    )
}