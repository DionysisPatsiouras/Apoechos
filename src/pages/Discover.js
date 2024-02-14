import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { SignatureColors, WindowSize } from '../App'
import style from '../style/Pages/Discover.module.css'
import MobileMenu from '../components/DiscoverComponents/MobileMenu'
import DesktopMenu from '../components/DiscoverComponents/DesktopMenu'

import pic from '../media/musician.png'
import arrow from '../media/icons/expand.svg'
import filters_icon from '../media/icons/filters.svg'

import SvgIcon from '../components/SvgIcon'



export default function Discover() {

  const [activeFilter, setActiveFilter] = useState('Everything')
  const [link, setLink] = useState('everything')
  const [data, setData] = useState([])
  const [showFilters, setShowFilters] = useState(false)


  const [search, setSearch] = useState('')
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
    const fetchData = async () => {
      const response = await fetch(`http://127.0.0.1:8000/profiles/${link}`);
      const json = await response.json();
      setData(json);
    };

    fetchData();
  }, [activeFilter]);


  const filteredData = data
    //filters data when you type on search
    .filter((i) => i.first_name?.toLowerCase().includes(search) || i.last_name?.toLowerCase().includes(search) || i.title?.toLowerCase().includes(search) || i.name?.toLowerCase().includes(search))
    .filter((i) => genre.rock ? i.rock : allGenres)
    .filter((i) => genre.jazz ? i.jazz : allGenres)
    .filter((i) => genre.country ? i.country : allGenres)
    .filter((i2) => instrument.classic_guitar ? i2.classic_guitar : allInstruments)
    .filter((i2) => instrument.double_bass ? i2.double_bass : allInstruments)





  return (
    <div className={style.mainBody}>


      <div className={style.filterBar} style={{ 'left': showFilters ? '-20%' : '0', 'transition': '1s' }}>

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
            <DesktopMenu link={link} setLink={setLink} activeFilter={activeFilter} setActiveFilter={setActiveFilter} setGenre={setGenre} setInstrument={setInstrument} />}


          {/* {console.log(data)} */}



          {/* SEARCH BAR & RESULTS */}
          <div className={style.searchAndResults}>
            <form style={{ 'backgroundColor': activeFilter === 'Everything' && windowIsResponsive ? color.everything : activeFilter === 'Musicians' && windowIsResponsive ? color.musician : activeFilter === 'Bands' && windowIsResponsive ? color.band : activeFilter === 'Music Studios' && windowIsResponsive ? color.studio : activeFilter === 'Live Stages' && windowIsResponsive ? color.stage : activeFilter === 'Music Stores' && windowIsResponsive ? color.store : '#ffffff' }}>
              <SvgIcon id='search' />
              <input placeholder={'Find ' + activeFilter + '..'} onChange={(event) => setSearch(event.target.value)} style={{ 'backgroundColor': activeFilter === 'Everything' && windowIsResponsive ? color.everything : activeFilter === 'Musicians' && windowIsResponsive ? color.musician : activeFilter === 'Bands' && windowIsResponsive ? color.band : activeFilter === 'Music Studios' && windowIsResponsive ? color.studio : activeFilter === 'Live Stages' && windowIsResponsive ? color.stage : activeFilter === 'Music Stores' && windowIsResponsive ? color.store : '#ffffff' }} />
            </form>
            <small >Results : {filteredData.length}</small>
          </div>






        </div>
        <div className={style.cardsContainer}>

          {filteredData

            //display all profiles
            .map((i) => (
              <div key={i.id + i.category}
                className={style.card}
                style={{ 'backgroundColor': i.category === 'musician' ? color.musician : i.category === 'band' ? color.band : i.category === 'studio' ? color.studio : i.category === 'store' ? color.store : i.category === 'stage' ? color.stage : null }}>

                <div className={style.cardWhitePart}>
                  <img className={style.signatureIcon} style={{ 'marginRight': i.category === 'musician' ? '-18px' : '-5px', 'marginTop': i.category === 'musician' ? '-10px' : '-5px' }} alt='Category Icon' src={require("../media/icons/profiles/light/" + i.category + ".svg")} />
                  <div className={style.profileInfo}>
                    <img src={i.photo != null ? 'http://127.0.0.1:8000/' + i.photo : pic} width={84} height={84} alt='Profile' />
                    <h6 className={style.profileTitle}>{i.title || i.name || i.first_name + ' ' + i.last_name}</h6>
                  </div>

                  <Link to={'/profiles/' + i.category + '/' + i.id} ><button className={style.seeProfileButton}> See profile</button></Link>
                </div>

              </div>

            )

            )}

        </div>
      </div>
    </div>
  )
}
