import React from 'react'

import style from '../../style/Profiles.module.css'

export default function ProfileSelection(props) {
    return (
        <div className={style.selectionContainer}>

            <div className={style.selection}
                onClick={() => { props.setActive(); props.setNumberOfSteps(); }}


                style={{ 'backgroundColor': props.active === props.id ? props.signatureColor : '#EFEEEE' }}>
                {/* <svg className={style.profileIcon} width="30" height="35" viewBox="0 0 60 55" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d={props.svg} fill={props.active === props.id ? '#ffffff' : '#000000'} />
                </svg> */}
                <img src={props.active === props.id ? props.whiteImg : props.blackImg} alt='icon'/>

                <p style={{ 'color': props.active === props.id ? '#ffffff' : '#6B6767' }}>{props.id}</p>
            </div>  

            {props.active === props.id ? <p className={style.description}>{props.description}</p> : null}
            <p className={style.desktopDescription} style={{ 'color': props.active === props.id ? '#565656' : '#9A9A9A' }}>{props.description}</p>
        </div>
    )
}
