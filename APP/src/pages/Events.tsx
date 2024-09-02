
import { forwardRef, useEffect, useState, useContext } from 'react'

import Call from '../utils/Call'
import { Routes } from '../utils/Routes'
import EventView from '../components/Events/EventView'
import { handle_checkbox } from '../utils/functions/handle_checkbox'

import FixedButton from '../components/FixedButton'
import UtilsContext from '../context/UtilsContext'
import { Loading } from '../utils/functions/loading'
import { Link } from 'react-router-dom'

const Events = forwardRef(function Events(props: any, ref: any) {


    let {
        cities,
        get_cities
    }: any = useContext(UtilsContext)

    let [events, setEvents] = useState<any[]>([])

    const [selectedCities, setSelectedCities] = useState<any[]>([])
    const [openFilters, setOpenFilters] = useState<boolean>(false)

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
        <section>

  

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

                                <EventView event={event} />
                            </Link>
                        ))}

                </div>)}




            <FixedButton icon='filter' onClick={() => setOpenFilters(!openFilters)} />

        </section>
    )
})

export default Events
