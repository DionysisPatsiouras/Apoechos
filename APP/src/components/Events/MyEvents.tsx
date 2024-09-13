import { useContext, useEffect, useState } from 'react'

// context
import ProfileContext from '../../context/ProfileContext'
import EventCard from './EventCard'


export default function MyEvents() {

    let { my_events, fetch_my_events }: any = useContext(ProfileContext)





    useEffect(() => {
        fetch_my_events()
    }, [])


    return (
        <div style={{display: 'flex'}}>

            {my_events.map((event: any, index: number) => (
                <EventCard key={index} event={event}  />
            ))}

        </div>
    )
}