import React, { useState, useEffect } from 'react'
import axios from 'axios'
import style from '../style/Discover.module.css'
// import pic from '../media/musician.png'
// import musicianIcon from '../media/icons/musicianWhite.svg'
// import bandIcon from '../media/icons/bandWhite.svg'
// import studioIcon from '../media/icons/studioWhite.svg'
// import storeIcon from '../media/icons/storewhite.svg'
// import stageIcon from '../media/icons/stageWhite.svg'
// import Everything from '../components/getProfiles.js/Everything'
// import Musicians from '../components/getProfiles.js/Musicians'
import SelectProfile from '../components/SelectProfile'



export default function Discover() {



  const [activeFilter, setActiveFilter] = useState('everything')
  const [signatureColor, setSignatureColor] = useState('everything')





  return (
    <div className={style.container}>


      {/* {console.log(activeFilter)} */}




      <div className={style.desktopMenu}>
        <ul>
          <li
            style={{
              'color': signatureColor === 'everything' || activeFilter === 'everything' ? '#000000' : '#AFAFAF',
              'borderBottom': signatureColor === 'everything' || activeFilter === 'everything' ? '3px solid #000000' : '3px solid transparent'
            }}
            onClick={() => setActiveFilter('everything')}
            onMouseOver={() => setSignatureColor('everything')}
            onMouseLeave={() => setSignatureColor('')}>
            Everything
          </li>


          <li
            style={{
              'color': signatureColor === 'musicians' || activeFilter === 'musicians' ? '#10ACDD' : '#AFAFAF',
              'borderBottom': signatureColor === 'musicians' || activeFilter === 'musicians' ? '3px solid #10ACDD' : '3px solid transparent'
            }}
            onClick={() => setActiveFilter('musicians')}
            onMouseOver={() => setSignatureColor('musicians')}
            onMouseLeave={() => setSignatureColor('')}>
            Musicians
          </li>


          <li
            style={{
              'color': signatureColor === 'Bands' || activeFilter === 'Bands' ? '#E37056' : '#AFAFAF',
              'borderBottom': signatureColor === 'Bands' || activeFilter === 'Bands' ? '3px solid #E37056' : '3px solid transparent'
            }}
            onClick={() => setActiveFilter('Bands')}
            onMouseOver={() => setSignatureColor('Bands')}
            onMouseLeave={() => setSignatureColor('')}>
            Bands
          </li>


          <li
            style={{
              'color': signatureColor === 'Studios' || activeFilter === 'Studios' ? '#FF8514' : '#AFAFAF',
              'borderBottom': signatureColor === 'Studios' || activeFilter === 'Studios' ? '3px solid #FF8514' : '3px solid transparent'
            }}
            onClick={() => setActiveFilter('Studios')}
            onMouseOver={() => setSignatureColor('Studios')}
            onMouseLeave={() => setSignatureColor('')}>
            Studios
          </li>


          <li
            style={{
              'color': signatureColor === 'Live Stages' || activeFilter === 'Live Stages' ? '#E558C6' : '#AFAFAF',
              'borderBottom': signatureColor === 'Live Stages' || activeFilter === 'Live Stages' ? '3px solid #E558C6' : '3px solid transparent'
            }}
            onClick={() => setActiveFilter('Live Stages')}
            onMouseOver={() => setSignatureColor('Live Stages')}
            onMouseLeave={() => setSignatureColor('')}>
            Live Stages
          </li>


          <li
            style={{
              'color': signatureColor === 'Music Stores' || activeFilter === 'Music Stores' ? '#12C59A' : '#AFAFAF',
              'borderBottom': signatureColor === 'Music Stores' || activeFilter === 'Music Stores' ? '3px solid #12C59A' : '3px solid transparent'
            }}
            onClick={() => setActiveFilter('Music Stores')}
            onMouseOver={() => setSignatureColor('Music Stores')}
            onMouseLeave={() => setSignatureColor('')}>
            Music Stores
          </li>
        </ul>
      </div>

{/*       
      <div className={style.searchAndResults}>
        <form>
          <input placeholder='Search...' />
        </form>
        <small>Results : { }</small>
      </div> */}

      {/* <SelectProfile data={activeFilter}/> */}

{/* 

      {(() => {
        switch (activeFilter) {
          case 'Everything':
            return <Everything />
          case 'Musicians':
            return <Musicians />

          default:
            return <Everything />
        }
      })()} */}

    </div>
  )
}
