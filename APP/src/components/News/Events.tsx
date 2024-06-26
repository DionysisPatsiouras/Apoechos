
import { forwardRef, useEffect, useState } from 'react'
import CSS from '../../css/News/News.module.css'
import Call from '../../utils/Call'
import { Routes } from '../../utils/Routes'
import SingleEvent from '../Events/SingleEvent'

const Events = forwardRef(function Events(props: any, ref: any) {

    let [events, setEvents] = useState<any[]>([])
    let fetch_events = new Call(Routes.events.all, 'GET')

    useEffect(() => {

        fetch_events.GET().then((res) => setEvents(res)).catch((err) => console.warn(err))

    }, [])

    console.log(events)
    return (
        <section style={{ width: '50vw' }}>

            <div className={CSS.header}>Εκδηλώσεις</div>

            {events.map((event: any) => (
                <SingleEvent key={event.eventId} event={event} />
            ))}


   
        </section>
    )
})

export default Events

