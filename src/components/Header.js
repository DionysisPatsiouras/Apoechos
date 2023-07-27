import React, { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext'


import '../style/main.css'


import style from '../style/Header.module.css'

import burgerMenuIcon from '../media/icons/burger-menu.svg'
import closeIcon from '../media/icons/close.svg'
import profileIcon from '../media/icons/profile.svg'
import onlinePic from '../media/icons/onlinePic.svg'
import notificationsIcon from '../media/icons/notifications.svg'
import messagesIcon from '../media/icons/messages.svg'
import editIcon from '../media/icons/edit.svg'
import logoutIcon from '../media/icons/logout.svg'
import musicianIcon from '../media/icons/musicianIcon.svg'




export default function Header() {

    let { user, logoutUser } = useContext(AuthContext)
    const [width, setWidth] = React.useState(window.innerWidth);


    const [menuIsOpen, setMenuIsOpen] = useState(false)
    const [accountIsOpen, setAccountIsOpen] = useState(false)
    const [dropdownIsOpen, setDropDownIsOpen] = useState(false)

    useEffect(() => {
        window.addEventListener("resize", () => setWidth(window.innerWidth));
    }, [])


    return (

        <div className={style.container}>

            <div className={style.menu}>
                {width < 769 ?
                    <>
                        <img src={menuIsOpen ? closeIcon : burgerMenuIcon} width={44} height={44} alt="menu" onClick={() => { setMenuIsOpen(!menuIsOpen); setAccountIsOpen(false) }} />

                        <ul style={{ 'left': menuIsOpen ? '0%' : '-200%' }}>
                            <Link to="/" onClick={() => setMenuIsOpen(false)}>What's New</Link>
                            <Link to="/discover" onClick={() => setMenuIsOpen(false)}>Discover</Link>
                            <Link to="/mystudio" onClick={() => setMenuIsOpen(false)}>My Studio</Link>
                            <Link to="/upcoming-events" onClick={() => setMenuIsOpen(false)}>Upcoming Events</Link>
                            <Link to="/learn-more" onClick={() => setMenuIsOpen(false)}>Learn more</Link>
                        </ul>
                    </>
                    :
                    <ul>
                        <Link to="/" >What's New</Link>
                        <Link to="/discover" >Discover</Link>
                        <Link to="/mystudio" >My Studio</Link>
                        <Link to="/upcoming-events" >Upcoming Events</Link>
                        <Link to="/learn-more" >Learn more</Link>
                    </ul>
                }
            </div>



            <div className={style.account}>

                {width < 769 ?
                    <>
                        <img src={user ? onlinePic : profileIcon} width={41} height={41} alt="menu" style={{ 'borderRadius': '99px', 'border': accountIsOpen ? '3px solid #5F69C6' : '3px solid #ffffff' }} onClick={() => { setAccountIsOpen(!accountIsOpen); setMenuIsOpen(false) }} />

                        <ul className={style.dropdown} style={{ 'left': accountIsOpen ? '0' : '-200%' }}>
                            {user ?
                                <ul className={style.accountMenu} >
                                    <Link to="/account" onClick={() => setAccountIsOpen(false)}><img src={profileIcon} width={40} height={40} alt='Account' />Account</Link>
                                    <Link to="/profile" onClick={() => setAccountIsOpen(false)}><img src={editIcon} width={40} height={40} alt='Edit' />Edit profile</Link>
                                    <Link to="/notifications" onClick={() => setAccountIsOpen(false)}><img src={notificationsIcon} width={40} height={40} alt='Notifications' />Notifications</Link>
                                    <Link to="/messages" onClick={() => setAccountIsOpen(false)}><img src={messagesIcon} width={40} height={40} alt='Messages' />Messages</Link>
                                    <hr className={style.divider}></hr>
                                    <Link to="/login" onClick={() => { setAccountIsOpen(false); logoutUser() }}><img src={logoutIcon} width={40} height={40} alt='Logout' />Logout</Link>
                                </ul>
                                :
                                <ul className={style.accountMenu}>
                                    <Link to="/login" onClick={() => setAccountIsOpen(false)}>Login</Link>
                                    <Link to="/register" onClick={() => setAccountIsOpen(false)}>Register</Link>
                                </ul>
                            }
                        </ul>
                    </>
                    :
                    <ul className={style.onlineMenu}>
                 
                            {user ? <img src={notificationsIcon} width={25} height={25} alt='Notifications' /> : null}
                            {user ? <img src={messagesIcon} width={25} height={25} alt='Messages' /> : null}
                            {user ? <img src={onlinePic} width={40} height={40} alt='Account' style={{ 'borderRadius': '199px', 'border': dropdownIsOpen ? '3px solid #5F69C6' : '3px solid #ffffff' }} onClick={() => setDropDownIsOpen(!dropdownIsOpen)} /> : null}
                       
                        {dropdownIsOpen ?
                            <ul className={style.dropDownDesktop} >
                                <Link to="/profiles" onClick={() => setAccountIsOpen(false)}>  <img src={musicianIcon} width={20} height={20} alt='Profiles' />Profiles</Link>
                                <Link to="/account" onClick={() => setAccountIsOpen(false)}> <img src={profileIcon} width={20} height={20} alt='Account' />Account</Link>
                                <Link to="/login" onClick={() => { setDropDownIsOpen(false); logoutUser() }}><img src={logoutIcon} width={20} height={20} alt='Logout' />Log Out</Link>
                            </ul>
                            :
                            null
                        }



                        {user ? null :
                            <ul className={style.accountMenu}>
                                <Link to="/login" onClick={() => setAccountIsOpen(false)}>Login</Link>
                                <Link to="/register" onClick={() => setAccountIsOpen(false)}>Register</Link>
                            </ul>
                        }

                    </ul>
                }


            </div>
        </div >

    )
}


