import { React, useContext, useState } from 'react'
import notificationIcon from '../media/icons/notifications.svg'
import messagesIcon from '../media/icons/messages.svg'
import AuthContext from '../context/AuthContext'
import style from '../style/MainNavigationMenu.module.css'

import profilePic from '../media/profile.svg'
import DropDownMenu from './DropDownMenu'



export default function UserMenu(props) {


    let { user, logoutUser } = useContext(AuthContext)
    let hideMenu = props.onLogout

    const [dropDownMenu, setDropDownMenu] = useState(false)

    return (
        <div className={style.accountMenu}>
            <div className={style.accountLogged}>
                <img src={notificationIcon} alt='notifications' />
                {/* <p>{user.email}</p> */}
                <img src={profilePic} alt='profilePicture' onClick={() => setDropDownMenu(!dropDownMenu)} />
                <img src={messagesIcon} alt='messages' />
                {/* <button onClick={() => { logoutUser(); hideMenu(); }}>Logout</button> */}
            </div>

        {dropDownMenu ? <DropDownMenu logout={logoutUser} hide={hideMenu}/> : null}

        </div>
    )
}
