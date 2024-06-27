
import { forwardRef, useEffect, useState } from 'react'
import CSS from '../css/News/News.module.css'
import Call from '../utils/Call'
import { Routes } from '../utils/Routes'
import EventView from '../components/Events/EventView'

const Events = forwardRef(function Events(props: any, ref: any) {

    let [events, setEvents] = useState<any[]>([])
    let fetch_events = new Call(Routes.events.all, 'GET')

    useEffect(() => {

        fetch_events.GET().then((res) => setEvents(res)).catch((err) => console.warn(err))

    }, [])

    // console.log(events)
    return (
        <section>



            <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start'}}>


                {events.map((event: any) => (
                    <EventView key={event.eventId} event={event} />
                ))}

            </div>

        </section>
    )
})

export default Events
