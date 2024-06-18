
import CSS from '../../css/Header/Header.module.css'
import { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import SvgIcon from '../SvgIcon'
import AuthContext from '../../context/AuthContext'

export default function MobileMenu(props: any) {

    const [navMenu, setNavMenu] = useState<boolean>(false)
    const [accountMenu, setAccountMenu] = useState<boolean>(false)
    let { user, logoutUser }: any = useContext(AuthContext)

    return (
        <div className={CSS.mobileMenu}>
            <div
                className={CSS.leftMenuContainer}
                style={{ 'left': navMenu ? '0px' : '-100vw' }}
                onClick={() => setNavMenu(false)}>
                <nav>
                    <ul>
                        <Link to="/">Εκδηλώσεις - Ροή</Link>
                        <Link to="/discover">Ανακάλυψε</Link>
                        {/* <Link to="/upcoming-events">Upcoming Events</Link> */}
                        {/* <Link to="learn-more">Learn More</Link> */}
                    </ul>
                </nav>
            </div>


            <div
                className={CSS.leftMenuContainer}
                style={{ 'left': accountMenu ? '0px' : '-100vw' }}
                onClick={() => setAccountMenu(false)}>
                <nav>
                    {user ?
                        <ul>
                            <Link to='/account'><SvgIcon id='account' color={'#3E3E3E'} /> Λογαριασμός</Link>
                            <Link to='/account'><SvgIcon id='notifications' color={'#3E3E3E'} /> Ειδοποιήσεις</Link>
                            <Link to='/account'><SvgIcon id='messages' color={'#3E3E3E'} /> Μηνύματα</Link>
                            <Link to="/profile">Προφίλ</Link>
                            <Link to='/account' onClick={logoutUser}><SvgIcon id='logout' color={'#3E3E3E'} /> Αποσύνδεση</Link>
                        </ul>
                        :
                        <ul>
                            <Link to="/login">Login</Link>
                            <Link to="/register">Register</Link>
                        </ul>
                    }


                </nav>
            </div>


            <SvgIcon
                id={navMenu ? 'close' : 'burger'}
                onClick={() => { setNavMenu(!navMenu); setAccountMenu(false) }}
            />
            <SvgIcon
                color={user ? '#32cc1a' : '#000000'}
                id={'account'}
                onClick={() => { setNavMenu(false); setAccountMenu(!accountMenu) }}
            />
        </div>
    )
}