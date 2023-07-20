import { React, useContext } from 'react'
import { Link } from 'react-router-dom'
import style from '../style/MainNavigationMenu.module.css'
import AuthContext from '../context/AuthContext'
import UserMenu from './UserMenu'



export default function MainNavigationMenu(props) {


    let { user } = useContext(AuthContext)
    return (
        <div className={style.mainMenu}>
            <ul>
                <Link to="/" onClick={props.hideMenu}>What's New</Link>
                <Link to="/discover" onClick={props.hideMenu}>Discover</Link>
                <Link to="/mystudio" onClick={props.hideMenu}>My Studio</Link>
                <Link to="/upcoming-events" onClick={props.hideMenu}>Upcoming Events</Link>
                <Link to="/learn-more" onClick={props.hideMenu}>Learn more</Link>
            </ul>

            {user ? <UserMenu onLogout={props.hideMenu}/> :
                <ul className={style.accountMenu}>
                    <Link to="/login" onClick={props.hideMenu}>Login</Link>
                    <Link to="/register" onClick={props.hideMenu}>Register</Link>
                </ul>
            }


        </div>
    )
}
