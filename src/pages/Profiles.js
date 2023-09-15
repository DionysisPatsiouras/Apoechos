import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios'

import style from '../style/Pages/Profiles.module.css'
import img from '../media/musician.png'
import img2 from '../media/band.png'
import AuthContext from '../context/AuthContext'
import CreateNewProfile from '../components/ProfileComponents/CreateNewProfile'

export default function Profiles() {




    let { user } = useContext(AuthContext)
    const [IsMusician, setMusician] = useState(false)
    const [hasBand, setBand] = useState(false)
    const [hasStudio, setStudio] = useState(false)
    const [hasStage, setStage] = useState(false)
    const [hasStore, setStore] = useState(false)



    useEffect(() => {
        axios
            .get('http://127.0.0.1:8000/users/' + user.user_id)
            .then((response) =>
                [
                    setMusician(response.data.hasMusicianProfile),
                    setBand(response.data.hasBandProfile),
                    setStudio(response.data.hasStudioProfile),
                    setStage(response.data.hasStageProfile),
                    setStore(response.data.hasStoreProfile),
                ]
            )
    }, [])






    const hasAllProfiles = IsMusician && hasBand && hasStudio && hasStage && hasStore
    const hasNoProfile = !IsMusician && !hasBand && !hasStudio && !hasStage && !hasStore
    const [newProfileWindow, setNewProfileWindow] = useState(false)


    return (
        <div>
            {/* {console.log(state.current)} */}
            <div className={style.existingProfiles} >
                {IsMusician ? <div className={style.object} > <img className={style.profileImage} src={img} alt='img' /></div> : null}
                {hasBand ? <div className={style.object}><img className={style.profileImage} src={img2} alt='img' /></div> : null}
                {hasStudio ? <div className={style.object}><img className={style.profileImage} src={img} alt='img' /></div> : null}
                {hasStage ? <div className={style.object}><img className={style.profileImage} src={img2} alt='img' /></div> : null}
                {hasStore ? <div className={style.object}><img className={style.profileImage} src={img} alt='img' /></div> : null}




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
