import React from 'react'
import style from '../../style/Discover.module.css'

export default function DesktopMenu(props) {
    return (
        <div className={style.desktopMenu}>
            <ul>
                <li
                    style={{
                        'color': props.signatureColor === 'everything' || props.activeFilter === 'everything' ? '#000000' : '#AFAFAF',
                        'borderBottom': props.signatureColor === 'everything' || props.activeFilter === 'everything' ? '3px solid #000000' : '3px solid transparent'
                    }}
                    onClick={() => props.setActiveFilter('everything')}
                    onMouseOver={() => props.setSignatureColor('everything')}
                    onMouseLeave={() => props.setSignatureColor('')}>
                    Everything
                </li>
                


                <li
                    style={{
                        'color': props.signatureColor === 'musicians' || props.activeFilter === 'musicians' ? '#10ACDD' : '#AFAFAF',
                        'borderBottom': props.signatureColor === 'musicians' || props.activeFilter === 'musicians' ? '3px solid #10ACDD' : '3px solid transparent'
                    }}
                    onClick={() => props.setActiveFilter('musicians')}
                    onMouseOver={() => props.setSignatureColor('musicians')}
                    onMouseLeave={() => props.setSignatureColor('')}>
                    Musicians
                </li>


                <li
                    style={{
                        'color': props.signatureColor === 'bands' || props.activeFilter === 'bands' ? '#E37056' : '#AFAFAF',
                        'borderBottom': props.signatureColor === 'bands' || props.activeFilter === 'bands' ? '3px solid #E37056' : '3px solid transparent'
                    }}
                    onClick={() => props.setActiveFilter('bands')}
                    onMouseOver={() => props.setSignatureColor('bands')}
                    onMouseLeave={() => props.setSignatureColor('')}>
                    Bands
                </li>


                <li
                    style={{
                        'color': props.signatureColor === 'studios' || props.activeFilter === 'studios' ? '#FF8514' : '#AFAFAF',
                        'borderBottom': props.signatureColor === 'studios' || props.activeFilter === 'studios' ? '3px solid #FF8514' : '3px solid transparent'
                    }}
                    onClick={() => props.setActiveFilter('studios')}
                    onMouseOver={() => props.setSignatureColor('studios')}
                    onMouseLeave={() => props.setSignatureColor('')}>
                    Studios
                </li>


                <li
                    style={{
                        'color': props.signatureColor === 'stages' || props.activeFilter === 'stages' ? '#E558C6' : '#AFAFAF',
                        'borderBottom': props.signatureColor === 'stages' || props.activeFilter === 'stages' ? '3px solid #E558C6' : '3px solid transparent'
                    }}
                    onClick={() => props.setActiveFilter('stages')}
                    onMouseOver={() => props.setSignatureColor('stages')}
                    onMouseLeave={() => props.setSignatureColor('')}>
                    Live Stages
                </li>


                <li
                    style={{
                        'color': props.signatureColor === 'stores' || props.activeFilter === 'stores' ? '#12C59A' : '#AFAFAF',
                        'borderBottom': props.signatureColor === 'stores' || props.activeFilter === 'stores' ? '3px solid #12C59A' : '3px solid transparent'
                    }}
                    onClick={() => props.setActiveFilter('stores')}
                    onMouseOver={() => props.setSignatureColor('stores')}
                    onMouseLeave={() => props.setSignatureColor('')}>
                    Music Stores
                </li>
            </ul>
        </div>
    )
}
