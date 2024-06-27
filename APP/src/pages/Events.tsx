
import { forwardRef, useEffect, useState } from 'react'
// import CSS from '../css/News/News.module.css'
import Call from '../utils/Call'
import { Routes } from '../utils/Routes'
import EventView from '../components/Events/EventView'
import Modal from '../components/Modal'

const Events = forwardRef(function Events(props: any, ref: any) {

    let [events, setEvents] = useState<any[]>([])
    const [modal, setModal] = useState<boolean>(false)
    const [content, setContent] = useState<any>()

    let fetch_events = new Call(Routes.events.all, 'GET')

    useEffect(() => {

        fetch_events.GET().then((res) => setEvents(res)).catch((err) => console.warn(err))

    }, [])

 
    const toggle_modal = (state: boolean, content: any) => {
        setModal(state)
        setContent(content)
    }

    // console.log(events)
    return (
        <section>

            <Modal open={modal} title={content?.title || 'live'} withContainer >
                
                <h5>Περιγραφή</h5>
                {content && content?.description}
                <button onClick={() => toggle_modal(false, undefined)}>Κλείσιμο</button>
            </Modal>


            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start' }}>

                {events.map((event: any) => (
                    <EventView key={event.eventId} event={event} onClick={() => toggle_modal(true, event)} />
                ))}

            </div>

        </section>
    )
})

export default Events
