import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { SignatureColors, WindowSize } from '../App'
import style from '../style/Pages/Discover.module.css'
import MobileMenu from '../components/DiscoverComponents/MobileMenu'
import DesktopMenu from '../components/DiscoverComponents/DesktopMenu'

import pic from '../media/musician.png'
import arrow from '../media/icons/expand.svg'
import filters_icon from '../media/icons/filters.svg'





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

  function searchChanged(event) {
    setSearch(event.target.value)
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://127.0.0.1:8000/profiles/' + link);
      const json = await response.json();
      setData(json);
    };

    fetchData();
  }, [activeFilter]);







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
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.52949 10.9786C3.98576 10.9786 2.67825 10.4424 1.60695 9.36997C0.53565 8.29759 0 7.00402 0 5.48928C0 3.97453 0.536193 2.68097 1.60858 1.60858C2.68097 0.536193 3.97788 0 5.49933 0C7.02078 0 8.31434 0.536193 9.38003 1.60858C10.4457 2.68097 10.9786 3.97554 10.9786 5.49229C10.9786 6.0935 10.8948 6.65214 10.7272 7.16823C10.5597 7.68432 10.3083 8.17024 9.97319 8.62601L14.7185 13.3311C14.9062 13.5262 15 13.756 15 14.0203C15 14.2847 14.9062 14.5107 14.7185 14.6984C14.5237 14.8995 14.2925 15 14.025 15C13.7575 15 13.5329 14.8995 13.3512 14.6984L8.62601 9.9933C8.23727 10.3006 7.77842 10.5416 7.24948 10.7164C6.72054 10.8912 6.14721 10.9786 5.52949 10.9786ZM5.51648 9.08847C6.52046 9.08847 7.36679 8.73827 8.05546 8.03787C8.74414 7.33747 9.08847 6.48794 9.08847 5.48928C9.08847 4.49062 8.74315 3.64109 8.05251 2.94068C7.36186 2.24028 6.51652 1.89008 5.51648 1.89008C4.50527 1.89008 3.64807 2.24028 2.94487 2.94068C2.24168 3.64109 1.89008 4.49062 1.89008 5.48928C1.89008 6.48794 2.24069 7.33747 2.94191 8.03787C3.64314 8.73827 4.50133 9.08847 5.51648 9.08847Z" fill={windowIsResponsive ? '#ffffff' : '#4F4F4F'} /></svg>
              <input placeholder={'Find ' + activeFilter + '..'} onChange={searchChanged} style={{ 'backgroundColor': activeFilter === 'Everything' && windowIsResponsive ? color.everything : activeFilter === 'Musicians' && windowIsResponsive ? color.musician : activeFilter === 'Bands' && windowIsResponsive ? color.band : activeFilter === 'Music Studios' && windowIsResponsive ? color.studio : activeFilter === 'Live Stages' && windowIsResponsive ? color.stage : activeFilter === 'Music Stores' && windowIsResponsive ? color.store : '#ffffff' }} />
            </form>
            {/* need to change the length when user searches */}
            <small >Results : {data.length}</small>
          </div>

          {/* {console.log(genre)} */}
          {/* {console.log(instrument)} */}

       
        </div>
        <div className={style.cardsContainer}>
          {data
            //filters data when you type on search
            .filter((i) => i.first_name?.toLowerCase().includes(search) || i.last_name?.toLowerCase().includes(search) || i.title?.toLowerCase().includes(search) || i.name?.toLowerCase().includes(search))
            
            .filter((i) => genre.rock ? i.rock : allGenres)
      
            // .filter((i) =>  genre.rock ? i.rock : allGenres, console.log(typeof genre.rock))

            .filter((i) => genre.jazz ? i.jazz : allGenres)
            .filter((i) => genre.country ? i.country : allGenres)
            .filter((i2) => instrument.classic_guitar ? i2.classic_guitar : allInstruments)
            .filter((i2) => instrument.double_bass ? i2.double_bass : allInstruments)

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
