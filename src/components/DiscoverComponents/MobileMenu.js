import React, { useState } from 'react'
import style from '../../style/Discover.module.css'

export default function MobileMenu(props) {


    const [active, setActive] = useState('')

    return (
        <div className={style.dropDownMenu}>
            <p>Looking for :</p>

            <p className={style.selection} onClick={() => setActive(!active)}>{props.activeFilter}</p>

            {active ? <ul className={style.hiddenList}>
                {<li onClick={() => { props.setLink('everything'); setActive(!active); props.setActiveFilter('Everything') }}>Everything</li>}
                {<li onClick={() => { props.setLink('musicians'); setActive(!active); props.setActiveFilter('Musicians') }}> Musicians</li>}
                {<li onClick={() => { props.setLink('bands'); setActive(!active); props.setActiveFilter('Bands') }}>Bands</li>}
                {<li onClick={() => { props.setLink('studios'); setActive(!active); props.setActiveFilter('Music Studios') }}>Music Studios</li>}
                {<li onClick={() => { props.setLink('stages'); setActive(!active); props.setActiveFilter('Live Stages') }}>Live Stages</li>}
                {<li onClick={() => { props.setLink('stores'); setActive(!active); props.setActiveFilter('Music Stores') }}>Music Stores</li>}

            </ul> : null}


        </div>
    )
}
