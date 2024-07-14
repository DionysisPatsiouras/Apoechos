
import { forwardRef } from 'react'
import CSS from '../../css/Event/FullEvent.module.css'
import { Link } from 'react-router-dom'
import { numeric_date, timestamp } from '../../utils/Shortcuts'
import SvgIcon from '../SvgIcon'


const FullEvent = forwardRef(function FullEvent(props: any, ref: any) {



    let event = props?.event

    console.warn(event)

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

            <div className={CSS.info}>
                <div className='items-inline'>
                    <SvgIcon id='calendar' color={'#c5c2c2'} />
                    <p>{numeric_date(event?.date)}</p>
                </div>


                <div className='items-inline'>
                    <SvgIcon id='clock' color={'#c5c2c2'} />
                    <p>{timestamp(event?.date)}</p>
                </div>

            </div>

            <div className={CSS.info}>

                <div className='items-inline' >
                    <Link to={`/profile/${event?.profile_location?.profileId}`}>
                        <div className='items-inline' style={{ gap: '10px' }}>
                            <img src={`http://127.0.0.1:8000/${event?.profile_location?.photo}`} alt='profile_photo' width={50} />
                            <div>


                                <p>{event?.profile_location?.name}</p>
                                <p>{event?.profile_location?.address}</p>
                            </div>
                        </div>

                    </Link>
                </div>

                <div className='items-inline'>
                    <SvgIcon id='location' color={'#c5c2c2'} />
                    <p>{event?.profile_location?.city?.name}</p>
                </div>


            </div>



            <p>{event?.description}</p>




        </section>
    )
})

export default FullEvent
