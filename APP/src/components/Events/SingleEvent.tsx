
import { forwardRef } from 'react'
import CSS from '../../css/Event/SingleEvent.module.sass'
import { numeric_date, timestamp } from '../../utils/Shortcuts'
const SingleEvent = forwardRef(function SingleEvent(props: any, ref: any) {


    let event = props.event
    console.log(event)


    return (
        <div className={CSS.content}>

            {event.title}
            <img src={`http://127.0.0.1:8000/${event.photo}`} alt='profile_photo' width={200} />

            <div>
                {event?.main_bands.map((band: any, index: number) => (
                    <h2 key={index}>{band?.name}</h2>
                ))}
            </div>

            
            {event.support_acts.length !== 0 && <p className={CSS.supportTitle}>SUPPORT ACT</p>}

            {event?.support_acts.map((band: any, index: number) => (
                <h5 key={index}>{band?.name}</h5>
            ))}

            <p>{numeric_date(event.date)}</p>
            <p>Ώρα: {timestamp(event.date)}</p>
            =======================================
        </div>
    )
})

export default SingleEvent

