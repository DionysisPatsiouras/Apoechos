import React, { useState, useEffect, useContext } from 'react'

import { SignatureColors, WindowSize } from '../App'
import style from '../style/Pages/Discover.module.css'
import MobileMenu from '../components/DiscoverComponents/MobileMenu'
import DesktopMenu from '../components/DiscoverComponents/DesktopMenu'

import arrow from '../media/icons/expand.svg'
import filters_icon from '../media/icons/filters.svg'

import SvgIcon from '../components/SvgIcon'
import axios from 'axios'

import Card from '../components/Card'



export default function Discover() {

  const [activeFilter, setActiveFilter] = useState('Everything')
  const [link, setLink] = useState('everything')
  const [data, setData] = useState([])
  const [showFilters, setShowFilters] = useState(false)


  const [search, setSearch] = useState('')
  const [location, setLocation] = useState('')
  const color = useContext(SignatureColors)
  const windowIsResponsive = useContext(WindowSize)


  const [genre, setGenre] = useState({
    rock: false,
    country: false,
    jazz: false

  })

  const [instrument, setInstrument] = useState({
    double_bass: false,
    classic_guitar: false
  })


  const allGenres = [genre.rock, genre.country, genre.jazz]
  const allInstruments = [instrument.double_bass, instrument.classic_guitar]


  useEffect(() => {

    axios
      .get(`http://127.0.0.1:8000/profiles/${link}`)
      .then((res) =>
      (
        console.log('res', res?.data),
        setData(res?.data)
      ))
      .catch((err) => console.log(err))

  }, [activeFilter]);


  const filtering = (data) => {
    return data?.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().includes(search) ||
      data?.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase().includes(search) ||
      data?.toLowerCase().includes(search) ||
      data?.toUpperCase().includes(search)
  }

  const filteredData = data
    //filters data when you type on search
    .filter((item) => item.city.toLowerCase().includes(location))
    .filter((profile) => filtering(profile.artistic_nickname || profile.title || profile.name))
    .filter((i) => genre.rock ? i.rock : allGenres)
    .filter((i) => genre.jazz ? i.jazz : allGenres)
    .filter((i) => genre.country ? i.country : allGenres)
    .filter((i2) => instrument.classic_guitar ? i2.classic_guitar : allInstruments)
    .filter((i2) => instrument.double_bass ? i2.double_bass : allInstruments)


  // console.warn(Object.keys(genre))
  // console.log(genre)

  return (
    <div className={style.mainBody}>


      <div className={style.filterBar} style={{ 'left': showFilters ? '-20%' : '0', 'transition': '1s' }}>
        {/* <input placeholder={'Find '} onChange={(event) => setLocation(event.target.value)} /> */}

        {/* <select name="cars" id="cars">
          <option value="Larisa" onChange={() => setLocation('larisa')}>Larisa</option>
          <option value="Athens">Athens</option>
          <option value="mercedes">Mercedes</option>
          <option value="audi">Audi</option>
        </select> */}

        {/* change content */}
        {activeFilter === 'Musicians' ?
          <div>
            <h2>Genre</h2>
            <ul className={style.filterList}>
              <li><input type="checkbox" id="rock" onClick={() => setGenre({ ...genre, rock: !genre.rock })} /> <label htmlFor='rock'>Rock</label></li>
              <li><input type="checkbox" id="jazz" onClick={() => setGenre({ ...genre, jazz: !genre.jazz })} /> <label htmlFor='jazz'>Jazz</label></li>
              <li><input type="checkbox" id="country" onClick={() => setGenre({ ...genre, country: !genre.country })} /> <label htmlFor='country'>Country</label></li>
            </ul>



            <h2>Instrument</h2>
            <ul className={style.filterList}>
              <li><input type="checkbox" id="double_bass" onClick={() => setInstrument({ ...instrument, double_bass: !instrument.double_bass })} /> <label htmlFor='double_bass'>Double Bass</label></li>
              <li><input type="checkbox" id="classic_guitar" onClick={() => setInstrument({ ...instrument, classic_guitar: !instrument.classic_guitar })} /> <label htmlFor='classic_guitar'>Classic Guitar</label></li>
            </ul>
            <h2>Location</h2>
            <ul className={style.filterList}>
              {/* add location filter here */}
            </ul>
          </div>
          : activeFilter === 'Everything' ?
            <div>
              <h2>Location</h2>
            </div>
            : null
        }
        {/* Show/Hide filter */}
        <div>
          <div className={showFilters ? style.showWindow : style.hideWindow} onClick={() => setShowFilters(!showFilters)}>
            <img src={showFilters ? filters_icon : arrow} width={25} height={25} alt='filters' />
            <p>{showFilters ? 'Show Filters' : 'Hide Filters'}</p>
          </div>
        </div>
      </div>



      <div className={style.cardsAndFilter}>
        <div className={style.wrapper}>


          {windowIsResponsive ?
            <MobileMenu link={link} setLink={setLink} activeFilter={activeFilter} setActiveFilter={setActiveFilter} setGenre={setGenre} setInstrument={setInstrument} /> :
            <DesktopMenu link={link} colors={color} setLink={setLink} activeFilter={activeFilter} setActiveFilter={setActiveFilter} setGenre={setGenre} setInstrument={setInstrument} />}



          {/* SEARCH BAR & RESULTS */}
          <div className={style.searchAndResults}>
            <form style={{ 'backgroundColor': activeFilter === 'Everything' && windowIsResponsive ? color.everything : activeFilter === 'Musicians' && windowIsResponsive ? color.musician : activeFilter === 'Bands' && windowIsResponsive ? color.band : activeFilter === 'Music Studios' && windowIsResponsive ? color.studio : activeFilter === 'Live Stages' && windowIsResponsive ? color.stage : activeFilter === 'Music Stores' && windowIsResponsive ? color.store : '#ffffff' }}>
              <SvgIcon id='search' />
              <input placeholder={`Find ${activeFilter}..`} onChange={(event) => setSearch(event.target.value)} style={{ 'backgroundColor': activeFilter === 'Everything' && windowIsResponsive ? color.everything : activeFilter === 'Musicians' && windowIsResponsive ? color.musician : activeFilter === 'Bands' && windowIsResponsive ? color.band : activeFilter === 'Music Studios' && windowIsResponsive ? color.studio : activeFilter === 'Live Stages' && windowIsResponsive ? color.stage : activeFilter === 'Music Stores' && windowIsResponsive ? color.store : '#ffffff' }} />
            </form>
            <small >Results : {filteredData.length}</small>
          </div>



        </div>

        <div className={style.cardsContainer}>

          {filteredData.map((data, index) =>
            <Card key={index} data={data} color={color} />
          )}

        </div>
      </div>
    </div>
  )
}
