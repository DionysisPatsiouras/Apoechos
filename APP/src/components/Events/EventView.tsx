
import { forwardRef, useState } from 'react'
import CSS from '../../css/Event/EventView.module.css'
import { numeric_date, timestamp } from '../../utils/Shortcuts'
import { Link } from 'react-router-dom'
import Modal from '../Modal'

const EventView = forwardRef(function EventView(props: any, ref: any) {

    const [modal, setModal] = useState<boolean>(false)
    const [content, setContent] = useState<any>()


    let event = props.event
    // console.log(content)


    return (
        <div
            className={`${CSS.content} cursor-pointer`}
            onClick={() => {
                setModal(true)
                setContent(event)
            }}>


            <Modal
                open={modal}
                title={content?.title || 'live'}
                withContainer
            >   
            <h5>Περιγραφή</h5>
                {content && content?.description}
            </Modal>

            {event.title ? <h3 className={CSS.title}>{event.title}</h3> : <h3 className={CSS.title}>&nbsp;</h3>}

            <img className={CSS.cover} src={`http://127.0.0.1:8000/${event.photo}`} alt='profile_photo' width={200} />

            <div className={CSS.main_bands}>
                {event?.main_bands
                    .map((band: any, index: number) => (
                        <Link to={`/profile/${band.profileId}`} key={index}>
                            <h2 >{band?.name}</h2>
                        </Link>

                    ))}
            </div>




            {event.support_acts.length !== 0 && <p className={CSS.supportTitle}>SUPPORT ACT</p>}

            {event?.support_acts
                .map((band: any, index: number) => (
                    <Link to={`/profile/${band.profileId}`} key={index}>
                        <h5>{band?.name}</h5>
                    </Link>
                ))}



            <div className={CSS.date}>
                <p>{numeric_date(event.date)}</p>
                <p>Έναρξη: {timestamp(event.date)}</p>
            </div>


        </div>
    )
})

export default EventView

