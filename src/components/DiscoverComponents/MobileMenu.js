import React, { useState } from 'react'
import style from '../../style/Discover.module.css'


export default function MobileMenu(props) {


    const [active, setActive] = useState('everything')

    return (
        <div className={style.dropDownMenu}>
            <small>Looking for:</small>
            {console.log(props.activeFilter)}
            <p onClick={() => setActive(!active)}>{props.activeFilter}</p>

            {active ? <ul className={style.hiddenList}>
                {props.link === 'everything' ? null : <li onClick={() => { props.setLink('everything'); setActive(!active); props.setActiveFilter('Everything') }}>Everything</li>}
                {props.link === 'musicians' ? null : <li onClick={() => { props.setLink('musicians'); setActive(!active); props.setActiveFilter('Musicians') }}>Musicians</li>}
                {props.link === 'bands' ? null : <li onClick={() => { props.setLink('bands'); setActive(!active); props.setActiveFilter('Bands') }}>Bands</li>}
                {props.link === 'studios' ? null : <li onClick={() => { props.setLink('studios'); setActive(!active); props.setActiveFilter('Music Studios') }}>Studios</li>}
                {props.link === 'stages' ? null : <li onClick={() => { props.setLink('stages'); setActive(!active); props.setActiveFilter('Live Stages') }}>Stages</li>}
                {props.link === 'stores' ? null : <li onClick={() => { props.setLink('stores'); setActive(!active); props.setActiveFilter('Music Stores') }}>Stores</li>}

            </ul> : null}


        </div>
    )
}
