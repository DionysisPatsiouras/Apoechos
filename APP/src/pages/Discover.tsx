import CSS from '../css/Discover/Discover.module.css'

import { useState, useContext } from 'react'
import { Colors } from '../App'

// components
import Tab from '../components/Discover/Tab'
import SvgIcon from '../components/SvgIcon'

export default function Discover() {


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

        </div>
    )
}