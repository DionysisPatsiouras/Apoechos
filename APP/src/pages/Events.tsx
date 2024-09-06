
import { forwardRef, useEffect, useState, useContext } from 'react'

import Call from '../utils/Call'
import { Routes } from '../utils/Routes'
// import EventView from '../components/Events/EventView'
import { handle_checkbox } from '../utils/functions/handle_checkbox'
// import CSS from '../css/'
import {  timestamp, day_date } from '../utils/Shortcuts'

import FixedButton from '../components/FixedButton'
import UtilsContext from '../context/UtilsContext'
import { Loading } from '../utils/functions/loading'
import { Link } from 'react-router-dom'
import CSS from '../css/Events/Events.module.css'
import SvgIcon from '../components/SvgIcon'

const Events = forwardRef(function Events(props: any, ref: any) {

    let { cities, get_cities }: any = useContext(UtilsContext)

    let [events, setEvents] = useState<any[]>([])
    // console.log("🚀 ~ events:", events)

    const [selectedCities, setSelectedCities] = useState<any[]>([])
    const [openFilters, setOpenFilters] = useState<boolean>(false)
    const [active, setActive] = useState<string>('')

    const [height, setHeight] = useState<any>(100)

    let fetch_events = new Call(Routes.events.all, 'GET')
    // let fetch_cities = new Call(Routes.profiles.cities, 'GET')

    useEffect(() => {
        document.title = 'Apoechos - Εκδηλώσεις'
        fetch_events.GET_NO_TOKEN().then((res) => setEvents(res)).catch((err) => console.warn(err))
        get_cities()
        setHeight(window.innerHeight)
        window.addEventListener("resize", () => setHeight(window.innerHeight))
    }, [])





    return (
        <main>



            {openFilters &&
                <ul className={`floating_filters shadow`}>
                    <h5>Πόλη</h5>
                    {cities.map((city: any, index: number) => (
                        <li key={index}>
                            <input
                                type='checkbox' id={city?.id}
                                value={city?.id}
                                onChange={(e: any) => handle_checkbox(setSelectedCities, e.target)}
                                checked={selectedCities.includes(city?.id.toString())}

                            />
                            <label htmlFor={city?.id}>{city?.name}</label>
                        </li>
                    ))
                    }
                </ul>
            }

            {Loading(
                events?.length !== 0,

                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start', height: height - 60, overflow: 'auto' }}>

                    {events
                        .filter((event: any) => selectedCities.length === 0
                            ?
                            !selectedCities.includes(event?.profile_location?.city?.id)
                            :
                            selectedCities.includes(event?.profile_location?.city?.id.toString())

                        )
                        .map((event: any) => (
                            <Link to={`/events/${event?.eventId}`} target='_blank' key={event.eventId}>


                                <div className={`${CSS.content} cursor-pointer`} onClick={props?.onClick}
                                    onMouseEnter={() => setActive(event?.eventId)}
                                    onMouseLeave={() => setActive('')}
                                >

                                    <div className={CSS.coverInfo}
                                        style={{
                                            backgroundImage: `url(http://127.0.0.1:8000/${event?.photo})`,

                                        }}>
                                        {active === event?.eventId &&

                                            <div className={CSS.infoOverlay}>
                                                {event?.title &&
                                                    <h2 className={CSS.eventTitle}> {event?.title}</h2>
                                                }

                                                <ul className={CSS.listOfBands}>
                                                    {event?.main_bands.map((band: any) => (
                                                        <li key={band?.profileId}>{band?.name}</li>
                                                    ))}
                                                </ul>

                                                <div className='items-inline' style={{ gap: '10px', marginBottom: '5px', padding: '0 10px' }}>
                                                    <SvgIcon id='location' color='#fff' width={20} />
                                                    <small>{event?.profile_location?.city?.name || event?.location}</small>
                                                </div>


                                                <div className='items-inline' style={{ gap: '10px', marginBottom: '5px', padding: '0 10px' }}>
                                                    <SvgIcon id='calendar' color='#fff' width={20} />
                                                    <small>{day_date(event?.date)}</small>
                                                </div>

                                                <div className='items-inline' style={{ gap: '10px', marginBottom: '5px', padding: '0 10px' }}>
                                                    <SvgIcon id='clock' color='#fff' width={20} />
                                                    <small>{timestamp(event?.date)}</small>
                                                </div>

                                                <button className={CSS.redirectButton}>Προβολή</button>
                                            </div>
                                        }
                                    </div>





                                </div>

                            </Link>
                        ))}

                </div>)}




            <FixedButton icon='filter' onClick={() => setOpenFilters(!openFilters)} />

        </main>
    )
})

export default Events
