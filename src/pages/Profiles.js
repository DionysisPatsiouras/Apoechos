import React, { useState, useContext } from 'react'

import style from '../style/Profiles.module.css'
import img from '../media/musician.png'
import img2 from '../media/band.png'
import AuthContext from '../context/AuthContext'
import CreateNewProfile from '../components/ProfileComponents/CreateNewProfile'

export default function Profiles() {

    let { user } = useContext(AuthContext)


    const hasAllProfiles = user.hasMusicianProfile && user.hasBandProfile && user.hasStudioProfile && user.hasStageProfile && user.hasStoreProfile
    const hasNoProfile = !user.hasMusicianProfile && !user.hasBandProfile && !user.hasStudioProfile && !user.hasStageProfile && !user.hasStoreProfile
    const [newProfileWindow, setNewProfileWindow] = useState(false)


    return (
        <div>
            <div className={style.existingProfiles}>
                {user.hasMusicianProfile ? <div className={style.object}> <img className={style.profileImage} src={img} alt='img' /></div> : null}
                {user.hasBandProfile ? <div className={style.object}><img className={style.profileImage} src={img2} alt='img' /></div> : null}
                {user.hasStudioProfile ? <div className={style.object}><img className={style.profileImage} src={img} alt='img' /></div> : null}
                {user.hasStageProfile ? <div className={style.object}><img className={style.profileImage} src={img2} alt='img' /></div> : null}
                {user.hasStoreProfile ? <div className={style.object}><img className={style.profileImage} src={img} alt='img' /></div> : null}




                {hasAllProfiles ? null :
                    hasNoProfile ?
                        <CreateNewProfile /> :
                        <div className={style.special}
                            style={{ 'backgroundColor': newProfileWindow ? '#5F69C6' : '#ffffff', 'border': newProfileWindow ? '3px solid #5F69C6' : '3px dashed #CECECE' }}
                            onClick={() => setNewProfileWindow(!newProfileWindow)}>
                            <p style={{ 'color': newProfileWindow ? '#ffffff' : '#565656' }} className={style.plus}>+</p>
                            <p style={{ 'color': newProfileWindow ? '#ffffff' : '#565656' }} className={style.text}>Create new</p></div>}




            </div>
            {newProfileWindow ? <CreateNewProfile /> : null}
        </div>

    )
}
