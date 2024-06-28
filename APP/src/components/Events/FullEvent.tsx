
import { forwardRef, useEffect, useState } from 'react'
// import CSS from '../css/News/News.module.css'
import CSS from '../../css/Event/FullEvent.module.css'
import { Link } from 'react-router-dom'


const FullEvent = forwardRef(function FullEvent(props: any, ref: any) {


    console.log(props.event)

    let event = props?.event

    return (
        <section>

            <img src={`http://127.0.0.1:8000/${event?.photo}`} alt='profile_photo' style={{ width: '100%' }} />

            <div className={CSS.bands_content}>


                {event?.main_bands.map((band: any) => (
                    <Link to={band.profileId} key={band.profileId}>
                        <h1>{band.name}</h1>
                    </Link>

                ))}

                {event?.support_acts.length !== 0 &&
                    <div className={CSS.support_section}>
                        <p>Support Acts</p>
                        {event?.support_acts.map((band: any) => (
                            <Link to={band.profileId} key={band.profileId}>
                                <h2>{band.name}</h2>
                            </Link>
                        ))}

                    </div>

                }
            </div>

          
            <h3>Περιγραφή</h3><br></br>
            <p>{event?.description}</p>




        </section>
    )
})

export default FullEvent
