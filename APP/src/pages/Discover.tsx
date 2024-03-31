import CSS from '../css/Discover/Discover.module.css'
import axios from 'axios'

import { useState, useContext, useEffect } from 'react'
import { Colors } from '../App'

// components
import Tab from '../components/Discover/Tab'
import SvgIcon from '../components/SvgIcon'
import Card from '../components/Discover/Card'
import { config } from '../utils/Token'

export default function Discover() {

    const [data, setData] = useState<any>([])


    useEffect(() => {
        axios
            .get(`http://localhost:8000/profiles/everything/`, config)
            .then((res) => { console.log(res.data); setData(res.data) })
            .catch((err) => console.warn(err))

    }, [])

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


    const [activeTab, setActiveTab] = useState('Everything')
    const [onHover, setOnHover] = useState('')


    const pickColor = (category: string) => {
        switch (category) {
            case 'musician':
                return color?.musician

            case 'studio':
                return color?.studio
            default:
                break;
        }
    }



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
                        onClick={() => setActiveTab(tab.label)}
                        activeTab={activeTab}
                        onHover={onHover}
                    />
                ))}
            </ul>

            <section className={CSS.search}>

                <div className={CSS.left_section}>
                    <SvgIcon id='search' />
                    <input type='text' placeholder='Αναζήτηση...' />
                </div>


                <p>Αποτελέσματα:</p>
            </section>

            <div className={CSS.all_cards}>
                {data[0]?.everything?.map((item: any, index: number) => (
                    <Card
                        key={index}
                        artistic_nickname={item?.artistic_nickname || item?.title}
                        color={pickColor(item.category)}
                    />
                ))}
            </div>



        </div>
    )
}