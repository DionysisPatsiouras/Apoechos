import React, { useContext, useState, useEffect, useRef } from 'react'
import axios from 'axios'
import style from '../../style/Pages/Profiles.module.css'

import { Link } from 'react-router-dom'

import AuthContext from '../../context/AuthContext'
import { SignatureColors } from '../../App'



import musicianDark from '../../media/icons/profiles/dark/musician.svg'
import bandDark from '../../media/icons/profiles/dark/band.svg'
import studioDark from '../../media/icons/profiles/dark/studio.svg'
import stageDark from '../../media/icons/profiles/dark/stage.svg'
import storeDark from '../../media/icons/profiles/dark/store.svg'


import musicianLight from '../../media/icons/profiles/light/musician.svg'
import bandLight from '../../media/icons/profiles/light/band.svg'
import studioLight from '../../media/icons/profiles/light/studio.svg'
import stageLight from '../../media/icons/profiles/light/stage.svg'
import storeLight from '../../media/icons/profiles/light/store.svg'





export default function Profiles() {

  const [mus, setMus] = useState(false)
  const state = useRef(false);
  const [active, setActive] = useState('')
  const [numberOfSteps, setNumberOfSteps] = useState(4)
  let { user } = useContext(AuthContext)
  const hasAllProfiles = user.hasMusicianProfile && user.hasBandProfile && user.hasStudioProfile && user.hasStageProfile && user.hasStoreProfile

  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/users/' + user.user_id)
      .then((response) => setMus(response.data.hasMusicianProfile), state.current = true)
  })




  const color = useContext(SignatureColors)



  return (
    <div className={style.wrapper}>
      <div className={style.container}>

        {/* {console.log(state)} */}


        <h5>Create personal or business profile</h5>
        <p className={style.about}>There is no limit to how many profile types you can create!</p>

        <div className={style.allSelections}>


          <div className={style.desktopTitles}>
            <p>Profile Type</p>
            <p>Benefits</p>
          </div>



          {mus && state ? null :

            <div className={style.selectionContainer} >
              <div className={style.selection} onClick={() => { setActive('Musician'); setNumberOfSteps(3); }} style={{ 'backgroundColor': active === 'Musician' ? color.musician : '#EFEEEE' }}>
                <img src={active === 'Musician' ? musicianLight : musicianDark} alt='icon' />
                <p style={{ 'color': active === 'Musician' ? '#ffffff' : '#6B6767' }}>Musician</p>
              </div>
              {active === 'Musician' ? <p className={style.description}>Discover new musicians</p> : null}
              <p className={style.desktopDescription} style={{ 'color': active === 'Musician' ? '#565656' : '#9A9A9A' }}>Discover new musicians</p>
            </div>
          }


          {user.hasBandProfile ? null :

            <div className={style.selectionContainer} >
              <div className={style.selection} onClick={() => { setActive('Band'); setNumberOfSteps(4); }} style={{ 'backgroundColor': active === 'Band' ? color.band : '#EFEEEE' }}>
                <img src={active === 'Band' ? bandLight : bandDark} alt='icon' />
                <p style={{ 'color': active === 'Band' ? '#ffffff' : '#6B6767' }}>Band</p>
              </div>
              {active === 'Band' ? <p className={style.description}>Promote your band</p> : null}
              <p className={style.desktopDescription} style={{ 'color': active === 'Band' ? '#565656' : '#9A9A9A' }}>Promote your band</p>
            </div>
          }

          {user.hasStudioProfile ? null :

            <div className={style.selectionContainer} >
              <div className={style.selection} onClick={() => { setActive('Music Studio'); setNumberOfSteps(2); }} style={{ 'backgroundColor': active === 'Music Studio' ? color.studio : '#EFEEEE' }}>
                <img src={active === 'Music Studio' ? studioLight : studioDark} alt='icon' />
                <p style={{ 'color': active === 'Music Studio' ? '#ffffff' : '#6B6767' }}>Music Studio</p>
              </div>
              {active === 'Music Studio' ? <p className={style.description}>Promote your business</p> : null}
              <p className={style.desktopDescription} style={{ 'color': active === 'Music Studio' ? '#565656' : '#9A9A9A' }}>Promote your business</p>
            </div>
          }


          {user.hasStageProfile ? null :

            <div className={style.selectionContainer} >
              <div className={style.selection} onClick={() => { setActive('Live Stage'); setNumberOfSteps(5); }} style={{ 'backgroundColor': active === 'Live Stage' ? color.stage : '#EFEEEE' }}>
                <img src={active === 'Live Stage' ? stageLight : stageDark} alt='icon' />
                <p style={{ 'color': active === 'Live Stage' ? '#ffffff' : '#6B6767' }}>Live Stage</p>
              </div>
              {active === 'Live Stage' ? <p className={style.description}>Organize Events</p> : null}
              <p className={style.desktopDescription} style={{ 'color': active === 'Live Stage' ? '#565656' : '#9A9A9A' }}>Organize Events</p>
            </div>
          }



          {user.hasStoreProfile ? null :

            <div className={style.selectionContainer} >
              <div className={style.selection} onClick={() => { setActive('Music Store'); setNumberOfSteps(3); }} style={{ 'backgroundColor': active === 'Music Store' ? color.store : '#EFEEEE' }}>
                <img src={active === 'Music Store' ? storeLight : storeDark} alt='icon' />
                <p style={{ 'color': active === 'Music Store' ? '#ffffff' : '#6B6767' }}>Live Stage</p>
              </div>
              {active === 'Music Store' ? <p className={style.description}>Increase your sales</p> : null}
              <p className={style.desktopDescription} style={{ 'color': active === 'Music Store' ? '#565656' : '#9A9A9A' }}>Increase your sales</p>
            </div>

          }
        </div>

        {/* CHECK IF USER HAS AVAILABLE PROFILE TO CREATE */}
        {hasAllProfiles ? null :
          <>
            {/* CHECK IF ANY OPTION IS SELECTED */}
            {active === '' ? <><br></br><br></br></> :
              <div className={style.buttonSection}>
                <p>Step 1 / {numberOfSteps}</p>
                <Link to={
                  active === 'Musician' ? '../create/musician' :
                    active === 'Band' ? '../create/band' :
                      active === 'Music Studio' ? '../create/studio' :
                        active === 'Live Stage' ? '../create/stage' :
                          active === 'Music Store' ? '../create/store' : null}>
                  <button>

                    Next step

                  </button>
                </Link>
              </div>
            }
          </>
        }

        {/* {console.log(active)} */}

      </div>
    </div >
  )
}
