import { useState, useEffect } from 'react'
import CSS from '../css/EventView/EventView.module.sass'


// utils
import Call from '../utils/Call'
import { Routes } from '../utils/Routes'
import SvgIcon from '../components/SvgIcon'

import { numeric_date, timestamp } from '../utils/Shortcuts'
import { Link } from 'react-router-dom'
import ProfileImage from '../components/ProfileImage'

export default function EventView() {

    let event_id = window.location.pathname.replace('/events/', '')

    let get_event = new Call(Routes.events.id(event_id), 'GET')

    let svg_color = '#C0C0C0'
    let a4Ratio = 1.414
    let wastedMargin = 150

    const [event, setEvent] = useState<any>()
    const [height, setHeight] = useState<any>(undefined)



    useEffect(() => {
        get_event
            .GET()
            .then((res) => {
                console.log(res)
                setEvent(res)
            })
            .catch((err) => console.warn(err))

        setHeight(window.innerHeight)
        window.addEventListener("resize", () => setHeight(window.innerHeight))

    }, [])





    return (
        <div className={`${CSS.container} items-inline`}>

            <section className={CSS.leftSector}>
                <img
                    style={{
                        height: `${height - wastedMargin}px`,
                        width: `${(height - wastedMargin) / a4Ratio}px`
                    }}
                    className={CSS.cover_photo}
                    src={`http://127.0.0.1:8000/${event?.photo}`}
                    alt='profile_photo' />
            </section>

            <section className={CSS.rightSector}>
                {event?.title && <h1 className={CSS.title}>{event?.title}</h1>}
                
                <h2 className={CSS.description_title}>Συγκροτήματα</h2>
                <div className='items-inline' style={{ gap: '10px' }}>
                    {event?.main_bands.map((band: any, index: number) => (
                        <Link to={`/profile/${band?.profileId}`} key={index}>
                            <p className={CSS.bandTitle}>{band?.name}</p>
                        </Link>
                    ))}
                </div>

                <hr className={CSS.divider}></hr>

                <h2 className={CSS.description_title}>Περιγραφή</h2>
                <p className={CSS.description_text}>{event?.description}</p>

                <div className={`${CSS.iconsSection} items-inline`} style={{ gap: '30px', marginTop: '30px' }}>

                    <div className='items-inline' style={{ gap: '10px' }}>
                        <SvgIcon id='clock' color={svg_color} />
                        <p>Έναρξη: {timestamp(event?.date)}</p>
                    </div>

                    <div className='items-inline' style={{ gap: '10px' }}>
                        <SvgIcon id='calendar' color={svg_color} />
                        <p>{numeric_date(event?.date)}</p>
                    </div>
                    <div className='items-inline' style={{ gap: '10px' }}>
                        <SvgIcon id='location' color={svg_color} />
                        <p>{event?.profile_location?.city?.name || event?.location}</p>
                    </div>
                </div>


                <hr className={CSS.divider}></hr>

                <section className={`${CSS.footer} items-inline`} style={{ gap: '100px' }}>
                <div>
                    <p className={CSS.description_title}>Τοποθεσία</p>

                    <div className='items-inline' style={{ gap: '10px' }}>
                        <ProfileImage
                            photo={event?.profile_location?.photo}
                            style={{ margin: '0' }}
                            size={60}
                        />
                        <div>
                            <p>{event?.profile_location?.name}</p>
                            <small>{event?.profile_location?.address}</small>
                        </div>
                    </div>
                </div>

                <div>
                    <p className={CSS.description_title}>Δημιουργήθηκε από:</p>

                    <div className='items-inline' style={{ gap: '10px' }}>
                        <ProfileImage
                            photo={event?.created_by?.photo}
                            category={event?.created_by?.category}
                            style={{ margin: '0' }}
                            size={60}
                        />
                        <div>
                            <p>{event?.created_by?.name}</p>
                        </div>
                    </div>
                </div>

            </section>



        </section>




        </div >
    )
}