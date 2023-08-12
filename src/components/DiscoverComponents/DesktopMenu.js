import React from 'react'
import style from '../../style/Pages/Discover.module.css'

export default function DesktopMenu(props) {
    return (
        <div className={style.desktopMenu}>
            <ul>
                <li
                    style={{
                        'color': props.link === 'everything' || props.activeFilter === 'Everything' ? '#000000' : '#AFAFAF',
                        'borderBottom': props.link === 'everything' || props.activeFilter === 'Everything' ? '3px solid #000000' : '3px solid transparent'
                    }}
                    onClick={() => props.setActiveFilter('Everything')}
                    onTouchStart={() => props.setLink('everything')}
                    onMouseOver={() => props.setLink('everything')}
                    onMouseLeave={() => props.setLink('')}>
                    Everything
                </li>
                


                <li
                    style={{
                        'color': props.link === 'musicians' || props.activeFilter === 'Musicians' ? '#10ACDD' : '#AFAFAF',
                        'borderBottom': props.link === 'musicians' || props.activeFilter === 'Musicians' ? '3px solid #10ACDD' : '3px solid transparent'
                    }}
                    onClick={() => props.setActiveFilter('Musicians')}
                    onTouchStart={() => props.setLink('musicians')}
                    onMouseOver={() => props.setLink('musicians')}
                    onMouseLeave={() => props.setLink('')}>
                    Musicians
                </li>


                <li
                    style={{
                        'color': props.link === 'bands' || props.activeFilter === 'Bands' ? '#E37056' : '#AFAFAF',
                        'borderBottom': props.link === 'bands' || props.activeFilter === 'Bands' ? '3px solid #E37056' : '3px solid transparent'
                    }}
                    onClick={() => props.setActiveFilter('Bands')}
                    onTouchStart={() => props.setLink('bands')}
                    onMouseOver={() => props.setLink('bands')}
                    onMouseLeave={() => props.setLink('')}>
                    Bands
                </li>


                <li
                    style={{
                        'color': props.link === 'studios' || props.activeFilter === 'Music Studios' ? '#FF8514' : '#AFAFAF',
                        'borderBottom': props.link === 'studios' || props.activeFilter === 'Music Studios' ? '3px solid #FF8514' : '3px solid transparent'
                    }}
                    onClick={() => props.setActiveFilter('Music Studios')}
                    onTouchStart={() => props.setLink('studios')}
                    onMouseOver={() => props.setLink('studios')}
                    onMouseLeave={() => props.setLink('')}>
                    Studios
                </li>


                <li
                    style={{
                        'color': props.link === 'stages' || props.activeFilter === 'Live Stages' ? '#E558C6' : '#AFAFAF',
                        'borderBottom': props.link === 'stages' || props.activeFilter === 'Live Stages' ? '3px solid #E558C6' : '3px solid transparent'
                    }}
                    onClick={() => props.setActiveFilter('Live Stages')}
                    onTouchStart={() => props.setLink('stages')}
                    onMouseOver={() => props.setLink('stages')}
                    onMouseLeave={() => props.setLink('')}>
                    Live Stages
                </li>


                <li
                    style={{
                        'color': props.link === 'stores' || props.activeFilter === 'Music Stores' ? '#12C59A' : '#AFAFAF',
                        'borderBottom': props.link === 'stores' || props.activeFilter === 'Music Stores' ? '3px solid #12C59A' : '3px solid transparent'
                    }}
                    onClick={() => props.setActiveFilter('Music Stores')}
                    onTouchStart={() => props.setLink('stores')}
                    onMouseOver={() => props.setLink('stores')}
                    onMouseLeave={() => props.setLink('')}>
                    Music Stores
                </li>
            </ul>
        </div>
    )
}
