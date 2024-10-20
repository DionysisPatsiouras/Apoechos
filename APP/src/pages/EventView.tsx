import { useState, useEffect, useContext } from 'react'
import CSS from '../css/EventView/EventView.module.sass'


// utils
import Call from '../utils/Call'
import { Routes } from '../utils/Routes'
import SvgIcon from '../components/SvgIcon'

import { numeric_date, timestamp } from '../utils/Shortcuts'
import { Link } from 'react-router-dom'
import ProfileImage from '../components/ProfileImage'
import UserContext from '../context/UserContext'
import FixedButton from '../components/FixedButton'


import NewEvent from '../components/Events/NewEvent'
import FullModal from '../components/FullModal'
import { NewEventProvider } from '../context/NewEventContext'

export default function EventView() {

    let event_id = window.location.pathname.replace('/events/', '')
    let get_event = new Call(Routes.events.id(event_id), 'GET')


    const { me, updateDOM, setUpdateDOM }: any = useContext(UserContext)


    let svg_color = '#C0C0C0'
    let a4Ratio = 1.414
    let wastedMargin = 150

    const [event, setEvent] = useState<any>()
    const [height, setHeight] = useState<any>(undefined)
    const [modal, setModal] = useState<boolean>(false)


    let user_can_edit = me.id === event?.created_by?.user



    useEffect(() => {
        get_event
            .GET_NO_TOKEN()
            .then((res) => {
                // console.log(res)
                setEvent(res)
            })
            .catch((err) => console.warn(err))

        setHeight(window.innerHeight)
        window.addEventListener("resize", () => setHeight(window.innerHeight))

    }, [updateDOM])

    const updateDom = () => {
        setModal(false)
        setUpdateDOM(!updateDOM)
    }


    return (


        <main className={`${CSS.container} items-inline`}>

            <FullModal open={modal} close={() => setModal(false)} title='Επεξεργασία εκδήλωσης'>
                <NewEventProvider>
                    <NewEvent closeModal={updateDom} data={event} />
                </NewEventProvider>

            </FullModal>

            <section className={CSS.leftSector}>
                <img
                    style={{
                        height: `${height - wastedMargin}px`,
                        width: `${(height - wastedMargin) / a4Ratio}px`
                    }}
                    className={CSS.cover_photo}
                    src={`${process.env.REACT_APP_API_URL}${event?.photo}`}
                    alt='profile_photo' />
            </section>

            <section className={CSS.rightSector}>
                {event?.title && <h1 className={CSS.title}>{event?.title}</h1>}

                <h2 className={CSS.description_title}>Συγκροτήματα</h2>
                <div className='items-inline' style={{ gap: '25px', flexWrap: 'wrap' }}>
                    {event?.main_bands.map((band: any, index: number) => (


                        <Link to={`/profile/${band?.profileId}`} key={index}>
                            <div className='items-inline' style={{ gap: '10px' }}>


                                <ProfileImage
                                    photo={band?.photo}
                                    size={60}
                                    style={{ margin: '0' }}
                                    key={index}
                                />
                                <div>
                                    <h2>{band?.name}</h2>
                                    <small>{band?.city?.name}</small>
                                </div>

                            </div>
                        </Link>

                    ))}
                </div>

                {event?.support_acts.length !== 0 &&
                    <>

                        <hr className={CSS.divider}></hr>
                        <h2 className={CSS.description_title}>Support acts</h2>
                        <div className='items-inline' style={{ gap: '25px', flexWrap: 'wrap' }}>
                            {event?.support_acts.map((band: any, index: number) => (


                                <Link to={`/profile/${band?.profileId}`} key={index}>
                                    <div className='items-inline' style={{ gap: '10px' }}>


                                        <ProfileImage
                                            photo={band?.photo}
                                            size={40}
                                            style={{ margin: '0' }}
                                            key={index}
                                        />
                                        <div>
                                            <h3>{band?.name}</h3>
                                            <small>{band?.city?.name}</small>
                                        </div>

                                    </div>
                                </Link>

                            ))}
                        </div>
                    </>
                }

                <hr className={CSS.divider}></hr>

                <h2 className={CSS.description_title}>Περιγραφή</h2>
                <article className={CSS.description_text}>{event?.description}</article>

                <div className={`${CSS.iconsSection} items-inline`} style={{ gap: '30px', marginTop: '30px' }}>

                    <div className='items-inline' style={{ gap: '10px' }}>
                        <SvgIcon id='location' color={svg_color} />
                        <p>{event?.profile_location?.city?.name || `${event?.location_name}, ${event?.address}, ${event?.city?.name}`}</p>
                    </div>


                    <div className='items-inline' style={{ gap: '10px' }}>
                        <SvgIcon id='calendar' color={svg_color} />
                        <p>{numeric_date(event?.date)}</p>
                    </div>

                    <div className='items-inline' style={{ gap: '10px' }}>
                        <SvgIcon id='clock' color={svg_color} />
                        <p>Έναρξη: {timestamp(event?.date)}</p>
                    </div>

                </div>


                <hr className={CSS.divider}></hr>

                <section className={`${CSS.footer} items-inline`} style={{ gap: '100px' }}>
                    {event?.profile_location &&
                        <div>
                            <p className={CSS.description_title}>Τοποθεσία</p>
                            <Link to={`/profile/${event?.profile_location?.profileId}`}>
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
                            </Link>
                        </div>
                    }


                    <div>
                        <p className={CSS.description_title}>Δημιουργήθηκε από</p>

                        <Link to={`/profile/${event?.created_by?.profileId}`}>
                            <div className='items-inline' style={{ gap: '10px' }}>
                                <ProfileImage
                                    photo={event?.created_by?.photo}
                                    // category={event?.created_by?.category}
                                    style={{ margin: '0' }}
                                    size={60}
                                />
                                <div>
                                    <p>{event?.created_by?.name}</p>
                                </div>
                            </div>
                        </Link>
                    </div>

                </section>

                {user_can_edit && <FixedButton onClick={() => setModal(!modal)} icon='edit'/>}


            </section>

        </main>


    )
}