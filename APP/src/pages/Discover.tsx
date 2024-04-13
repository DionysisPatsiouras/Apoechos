import CSS from '../css/Discover/Discover.module.css'
import axios from 'axios'

import { useState, useContext, useEffect } from 'react'
import { Colors } from '../App'
import SearchValidation from '../utils/SearchValidation'

// components
import Tab from '../components/Discover/Tab'
import SvgIcon from '../components/SvgIcon'
import Card from '../components/Discover/Card'
import { config } from '../utils/Token'

export default function Discover() {

    const [data, setData] = useState<any>([])
    const [search, setSearch] = useState<string>('')

    const [selected, setSelected] = useState<any>([])

    const [activeTab, setActiveTab] = useState('Everything')
    const [onHover, setOnHover] = useState('')

    useEffect(() => {
        axios
            .get(`http://localhost:8000/profiles/everything/`, config)
            .then((res) => {
                console.log(res.data[0]);
                setData(res.data);
                setSelected(
                    activeTab === 'Musicians' ? res.data[0]?.musicians :
                        activeTab === 'Music Studio' ? res.data[0]?.studios :
                            res.data[0].everything
                )
            })
            .catch((err) => console.warn(err))

    }, [activeTab])

    const color = useContext<any>(Colors)
    // console.warn(color)

    let tabs: any = [
        { label: 'Everything', color: 'black' },
        { label: 'Musicians', color: color?.musician },
        { label: 'Bands', color: color?.band },
        { label: 'Music Studio', color: color?.studio },
        { label: 'Music Stores', color: color?.store },
        { label: 'Live Stages', color: color?.stage },
    ]


    const pickColor = (category: string) => {
        switch (category) {
            case 'musician':
                return color?.musician
            case 'studio':
                return color?.studio
            case 'store':
                return color?.store
            default:
                break;
        }
    }

    // console.log(selected)
    const filteredData = selected

        // const filteredData = data
        //     // .filter(())

        .filter((data: any) =>
            SearchValidation(data?.artistic_nickname, search) || SearchValidation(data?.title, search)
        )

    // console.warn('filteredData', filteredData)

    return (
        <div style={{ 'margin': '20px 0 0 20px' }}>
            <ul className={CSS.profiles_menu}>

                {tabs.map((tab: any, index: number) => (
                    <Tab
                        key={index}
                        label={tab.label}
                        color={tab.color}
                        onMouseEnter={() => setOnHover(tab.label)}
                        onMouseLeave={() => setOnHover('')}
                        onClick={() => { setActiveTab(tab.label); setSelected(data[0].musicians) }}

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


                <p>Αποτελέσματα: {filteredData.length}</p>
            </section>

            <section className={CSS.all_cards}>
                {filteredData?.map((item: any, index: number) => (

                    <Card
                        key={index}
                        id={item?.musicianId || item?.studioId}
                        category={item?.category}
                        city={item?.city}
                        photo={item?.photo}
                        artistic_nickname={item?.artistic_nickname || item?.title}
                        color={pickColor(item?.category)}
                    />
                ))}
            </section>



        </div>
    )
}