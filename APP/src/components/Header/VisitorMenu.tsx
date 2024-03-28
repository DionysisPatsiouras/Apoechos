import { Link, useNavigate } from 'react-router-dom'
import CSS from '../../css/Header/Header.module.css'

export default function VisitorMenu() {

    return (
        <>
            <ul>
                <Link to="/">What's New</Link>
                <Link to="/discover">Discover</Link>
                <Link to="/upcoming-events">Upcoming Events</Link>
                <Link to="learn-more">Learn More</Link>
            </ul>
            <ul>
                <Link to='/login'>Σύνδεση</Link>
                <Link to='/register'>Εγγραφή</Link>
            </ul>
        </>

    )
}