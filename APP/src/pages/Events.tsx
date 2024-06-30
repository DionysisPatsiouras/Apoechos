
import { forwardRef, useEffect, useState } from 'react'
// import CSS from '../css/News/News.module.css'
import Call from '../utils/Call'
import { Routes } from '../utils/Routes'
import EventView from '../components/Events/EventView'
import Modal from '../components/Modal'
import FullEvent from '../components/Events/FullEvent'
import { handle_checkbox } from '../utils/functions/handle_checkbox'

const Events = forwardRef(function Events(props: any, ref: any) {

    let [events, setEvents] = useState<any[]>([])
    let [cities, setCities] = useState<any[]>([])
    const [modal, setModal] = useState<boolean>(false)
    const [content, setContent] = useState<any>()
    const [array, setArray] = useState<any[]>([])

    let fetch_events = new Call(Routes.events.all, 'GET')
    let fetch_cities = new Call(Routes.profiles.cities, 'GET')

    useEffect(() => {

        fetch_events.GET().then((res) => setEvents(res)).catch((err) => console.warn(err))
        fetch_cities.GET().then((res) => setCities(res?.[1])).catch((err) => console.warn(err))

    }, [])


    const toggle_modal = (state: boolean, content: any) => {
        setModal(state)
        setContent(content)
    }

    // console.log(array)
    return (
        <section>

            <Modal open={modal} title='Εκδήλωση' withContainer btn close={() => toggle_modal(false, undefined)}>
                <FullEvent event={content} />
            </Modal>



            <ul>
                {cities.map((city: any, index: number) => (
                    <li key={index}>
                        <input type='checkbox' id={city?.id}
                            value={city?.id}
                            onChange={(e: any) => handle_checkbox(setArray, e.target)}
                        />
                        <label htmlFor={city?.id}>{city?.name}</label>
                    </li>
                ))
                }

            </ul>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start' }}>

                {events
                    .filter((event: any) => array.length === 0
                        ?
                        !array.includes(event?.profile_location?.city?.id)
                        :
                        array.includes(event?.profile_location?.city?.id.toString()))
                    .map((event: any) => (
                        <EventView key={event.eventId} event={event} onClick={() => toggle_modal(true, event)} />
                    ))}

            </div>

        </section>
    )
})

export default Events
