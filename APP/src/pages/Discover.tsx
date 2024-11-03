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
import Search from '../components/Search'



export default function Discover() {

    let {
        activeTab, tabs, filteredData,
        setSearch, handle_checkbox, filters,
        toggleModal, modal

    }: any = useContext(DiscoverContext)



    return (
        <main className={CSS.container}>

            <FullModal open={modal} title='Φίλτρα' close={toggleModal}>
                <section className={CSS.filters}>

                    {filters.map((item: any, index: number) => (

                        <div key={index} style={{ display: activeTab === item.id || item?.id === 'Όλα' ? 'block' : 'none' }}>
                            <p className={CSS.filter_title}>{item.label}</p>

                            <div className='items-inline' style={{ padding: '0 0 0 20px' }}>
                                <Search onChange={(e: any) => item.setSearch(e.target.value)} />
                            </div>

                            <ul className={`${CSS.filters_list} m-0`} >
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


                    <ul className={`${CSS.profiles_menu} m-0`}>
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
                                        backgroundColor: activeTab === category?.label ? category?.color : '#f9f9f9',
                                        border: `2px solid ${category?.color}`,
                                        width: '40px',
                                        height: '40px'
                                    }}
                                />

                                <div className={CSS.categoryLabel}>

                                    <li
                                        style={{
                                            color: category?.color,
                                            borderBottom: activeTab === category?.label ? `2px solid ${category?.color}` : 'unset',
                                            paddingBottom: '7px'
                                        }}>
                                        {category?.label}
                                    </li>

                                </div>
                            </div>
                        ))}
                    </ul>


                    <section className={CSS.search}>
                        <div className={CSS.left_section}>
                            <Search onChange={(e: any) => setSearch(e.target.value)} />
                        </div>
                        <p className={CSS.results}>Αποτελέσματα: {filteredData?.length}</p>
                    </section>

                </div>

                {filteredData.length !== 0 &&

                    <section className={CSS.cards_section}>

                        <div className={CSS.cards_list}>
                            {filteredData?.map((item: any, index: number) => (
                                <Card key={index} data={item} />
                            ))}

                        </div>
                    </section>
                }


            </section>


        </main>
    )
}