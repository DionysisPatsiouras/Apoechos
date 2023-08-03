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
                {props.activeFilter === 'everything' ? null : <li onClick={() => { props.setActiveFilter('everything'); setActive(!active) }}>Everything</li>}
                {props.activeFilter === 'musicians' ? null : <li onClick={() => { props.setActiveFilter('musicians'); setActive(!active) }}>Musicians</li>}
                {props.activeFilter === 'bands' ? null : <li onClick={() => { props.setActiveFilter('bands'); setActive(!active) }}>Bands</li>}
                {props.activeFilter === 'studios' ? null : <li onClick={() => { props.setActiveFilter('studios'); setActive(!active) }}>Studios</li>}
                {props.activeFilter === 'stages' ? null : <li onClick={() => { props.setActiveFilter('stages'); setActive(!active) }}>Stages</li>}
                {props.activeFilter === 'stores' ? null : <li onClick={() => { props.setActiveFilter('stores'); setActive(!active) }}>Stores</li>}

            </ul> : null}


        </div>
    )
}
