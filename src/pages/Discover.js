import React, { useState, useEffect } from 'react'
import axios from 'axios'
import style from '../style/Discover.module.css'
import pic from '../media/musician.png'
import musicianIcon from '../media/icons/musicianWhite.svg'
import bandIcon from '../media/icons/bandWhite.svg'
import studioIcon from '../media/icons/studioWhite.svg'
import storeIcon from '../media/icons/storewhite.svg'
import stageIcon from '../media/icons/stageWhite.svg'
import Everything from '../components/getProfiles.js/Everything'
import Musicians from '../components/getProfiles.js/Musicians'






export default function Discover() {



  const [activeFilter, setActiveFilter] = useState('Everything')



  return (
    <div className={style.container}>


      {console.log(activeFilter)}


      <div className={style.menu}>
        <ul>
          <li style={{ 'color': activeFilter === 'Everything' ? 'black' : '#AFAFAF', 'borderBottom': activeFilter === 'Everything' ? '3px solid black' : 'transparent' }} onClick={() => setActiveFilter('Everything')}>Everything</li>
          <li style={{ 'color': activeFilter === 'Musicians' ? '#10ACDD' : '#AFAFAF', 'borderBottom': activeFilter === 'Musicians' ? '3px solid #10ACDD' : 'transparent' }} onClick={() => setActiveFilter('Musicians')}>Musicians</li>
          <li style={{ 'color': activeFilter === 'Bands' ? '#E37056' : '#AFAFAF', 'borderBottom': activeFilter === 'Bands' ? '3px solid #E37056' : 'transparent' }} onClick={() => setActiveFilter('Bands')}>Bands</li>
          <li style={{ 'color': activeFilter === 'Studios' ? '#FF8514' : '#AFAFAF', 'borderBottom': activeFilter === 'Studios' ? '3px solid #FF8514' : 'transparent' }} onClick={() => setActiveFilter('Studios')}>Studios</li>
          <li style={{ 'color': activeFilter === 'Live Stages' ? '#E558C6' : '#AFAFAF', 'borderBottom': activeFilter === 'Live Stages' ? '3px solid #E558C6' : 'transparent' }} onClick={() => setActiveFilter('Live Stages')}>Live Stages</li>
          <li style={{ 'color': activeFilter === 'Music Stores' ? '#12C59A' : '#AFAFAF', 'borderBottom': activeFilter === 'Music Stores' ? '3px solid #12C59A' : 'transparent' }} onClick={() => setActiveFilter('Music Stores')}>Music Stores</li>
        </ul>

        

      </div>




      {(() => {
        switch (activeFilter) {
          case 'Everything':
            return <Everything /> 
          case 'Musicians':
            return <Musicians />

          default:
            return <Everything /> 
        }
      })()}

    </div>
  )
}
