
import { forwardRef, useState } from 'react'
import SvgIcon from './../SvgIcon'
import { Link } from 'react-router-dom'
import { timestamp, day_date } from '../../utils/Shortcuts'
import CSS from '../../css/Events/Events.module.css'
import NewEvent from './NewEvent'
import FullModal from '../FullModal'
import { NewEventProvider } from '../../context/NewEventContext'

const EventCard = forwardRef(function EventCard(props: any, ref: any) {

    let event = props?.event
    const [modal, setModal] = useState<boolean>(false)

    return (
        // <Link to={`/events/${event?.eventId}`} target='_blank' key={event.eventId}>


        <>
            <FullModal open={modal} close={() => setModal(false)}>
                <NewEventProvider>
                    <NewEvent closeModal={() => setModal(false)} data={event}/>
                </NewEventProvider>

            </FullModal>

            <div className={`${CSS.content} cursor-pointer`}>

                <div className={CSS.coverInfo}

                    style={{ backgroundImage: `url(http://127.0.0.1:8000/${event?.photo})` }}>

                    <div className={CSS.infoOverlay}>
                        {event?.title && <h2 className={CSS.eventTitle}> {event?.title}</h2>}

                        <ul className={CSS.listOfBands}>
                            {event?.main_bands.map((band: any) => (
                                <li key={band?.profileId}>{band?.name}</li>
                            ))}
                        </ul>

                        <div className={`${CSS.specificInfo} items-inline`}>
                            <SvgIcon id='location' color='#fff' width={20} />
                            <small>{event?.profile_location?.city?.name || event?.location}</small>
                        </div>


                        <div className={`${CSS.specificInfo} items-inline`}>
                            <SvgIcon id='calendar' color='#fff' width={20} />
                            <small>{day_date(event?.date)}</small>
                        </div>

                        <div className={`${CSS.specificInfo} items-inline`}>
                            <SvgIcon id='clock' color='#fff' width={20} />
                            <small>{timestamp(event?.date)}</small>
                        </div>

                        <button className={CSS.redirectButton}>Προβολή</button>
                        <button className={CSS.redirectButton} onClick={() => setModal(true)}>Επεξεργασία</button>
                    </div>

                </div>


            </div>
        </>

        // </Link>
    )
})

export default EventCard

