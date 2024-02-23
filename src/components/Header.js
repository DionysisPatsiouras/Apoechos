import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import { WindowSize } from '../App'



import '../style/main.css'
import style from '../style/Header.module.css'

import burgerMenuIcon from '../media/icons/burger-menu.svg'
import closeIcon from '../media/icons/close.svg'
import accountDark from '../media/icons/accountDark.svg'
import accountLight from '../media/icons/accountLight.svg'
import logoutIcon from '../media/icons/logout2.svg'


import musicianDark from '../media/icons/profiles/dark/musician.svg'
import musicianLight from '../media/icons/profiles/light/musician.svg'




import onlinePic from '../media/icons/onlinePic.svg'

import logo from '../media/logo-04.png'

import notificationsIcon from '../media/icons/notifications.svg'
import messagesIcon from '../media/icons/messagesDark.svg'
import editIcon from '../media/icons/edit.svg'






export default function Header() {

    let { user, logoutUser } = useContext(AuthContext)

    const navigate = useNavigate();

    const [menuIsOpen, setMenuIsOpen] = useState(false)
    const [accountIsOpen, setAccountIsOpen] = useState(false)
    const [dropdownIsOpen, setDropDownIsOpen] = useState(false)
    const [hover, setHover] = useState('')


    const windowIsResponsive = useContext(WindowSize)
    console.log('user', user)
    // console.log('mpikoto', localStorage.getItem('auth-token'))
    return (

        <div className={style.container}>


            {/*   NAVIGATION MENU  */}
            <div className={style.menu}>

                {windowIsResponsive ? <img src={menuIsOpen ? closeIcon : burgerMenuIcon} width={44} height={44} alt="menu" onClick={() => { setMenuIsOpen(!menuIsOpen); setAccountIsOpen(false) }} /> : null}
                <ul style={{ 'left': menuIsOpen ? '0%' : '-200%' }}>
                    <img className={style.logo} src={logo} width={60} height={60} alt='logo' onClick={() => navigate('/')} />
                    <Link to="/" onClick={() => setMenuIsOpen(false)}>What's New</Link>
                    <Link to="/discover" onClick={() => setMenuIsOpen(false)}>Discover</Link>
                    <Link to="/mystudio" onClick={() => setMenuIsOpen(false)}>My Studio</Link>
                    <Link to="/upcoming-events" onClick={() => setMenuIsOpen(false)}>Upcoming Events</Link>
                    <Link to="learn-more" onClick={() => setMenuIsOpen(false)}>Learn More</Link>

                </ul>
            </div>



            {/* USER MENU */}
            <div className={style.account}>

                {windowIsResponsive ?
                    <>
                        <img src={user ? onlinePic : accountDark} width={41} height={41} alt="menu" style={{ 'borderRadius': '99px', 'border': accountIsOpen ? '3px solid #5F69C6' : '3px solid #ffffff' }} onClick={() => { setAccountIsOpen(!accountIsOpen); setMenuIsOpen(false) }} />
                        <ul className={style.dropdown} style={{ 'left': accountIsOpen ? '0' : '-200%' }}>
                            <ul className={style.accountMenu}>

                                {user && !user.hasMusicianProfile && !user.hasBandProfile && !user.hasStoreProfile && !user.hasStageProfile && !user.StudioProfile ? <Link to='/profiles' onClick={() => setAccountIsOpen(false)} className={style.joinButton}>Join the community!</Link> : null}

                                {user ?
                                    <>
                                        <Link to="/account" onClick={() => setAccountIsOpen(false)}><img src={accountDark} width={40} height={40} alt='Account' />Account</Link>
                                        <Link to="/profile" onClick={() => setAccountIsOpen(false)}><img src={editIcon} width={40} height={40} alt='Edit' />Edit profile</Link>
                                        <Link to="/notifications" onClick={() => setAccountIsOpen(false)}><img src={notificationsIcon} width={40} height={40} alt='Notifications' />Notifications</Link>
                                        <Link to="/messages" onClick={() => setAccountIsOpen(false)}><img src={messagesIcon} width={40} height={40} alt='Messages' />Messages</Link>
                                        <Link to="/login" onClick={() => { setAccountIsOpen(false); logoutUser() }}><img src={logoutIcon} width={40} height={40} alt='Logout' />Logout</Link>
                                        <hr className={style.divider}></hr>
                                    </>
                                    :
                                    <>
                                        <Link to="/login" onClick={() => setAccountIsOpen(false)}>Login</Link>
                                        <Link to="/register" onClick={() => setAccountIsOpen(false)}>Register</Link>
                                    </>
                                }
                            </ul>
                        </ul>
                    </>
                    :
                    // DESKTOP VERSION
                    <ul className={style.onlineMenu}>

                        {user && !user.hasMusicianProfile && !user.hasBandProfile && !user.hasStoreProfile && !user.hasStageProfile && !user.StudioProfile ? <Link to='/profiles' className={style.joinButton}>Join the community! </Link> : null}

                        {user &&
                            <>
                                <img src={notificationsIcon} width={25} height={25} alt='Notifications' />
                                <img src={messagesIcon} width={25} height={25} alt='Messages' />
                                <img src={logo} width={40} height={40} alt='Account' style={{ 'padding': '0', 'borderRadius': '199px', 'border': dropdownIsOpen ? '3px solid #5F69C6' : '3px solid #ffffff' }} onClick={() => setDropDownIsOpen(!dropdownIsOpen)} />
                            </>
                        }

                        {dropdownIsOpen &&
                            <ul className={style.dropDownDesktop} >
                                <Link to="/profiles"
                                    onClick={() => { setAccountIsOpen(false); setDropDownIsOpen(false) }}
                                    onMouseOver={() => setHover('profiles')}
                                    onMouseLeave={() => setHover('')}>
                                    <img src={hover === 'profiles' ? musicianLight : musicianDark} width={30} height={30} alt='Profiles' />
                                    Profiles
                                </Link>

                                <Link
                                    to="/account"
                                    onClick={() => { setAccountIsOpen(false); setDropDownIsOpen(false) }}
                                    onMouseOver={() => setHover('account')}
                                    onMouseLeave={() => setHover('')}>
                                    <img src={hover === 'account' ? accountLight : accountDark} width={20} height={20} alt='Profiles' />
                                    Account
                                </Link>

                                <Link to="/login"
                                    onClick={() => { setDropDownIsOpen(false); logoutUser() }}
                                    onMouseOver={() => setHover('logout')}
                                    onMouseLeave={() => setHover('')}>
                                    <img src={logoutIcon} width={20} height={20} alt='Logout' />

                                    Log Out</Link>
                            </ul>
                        }

                        {!user &&
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


