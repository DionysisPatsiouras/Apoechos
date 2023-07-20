import {React, useContext} from 'react'
import style from '../style/MainNavigationMenu.module.css'
import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext'

export default function DropDownMenu(props) {

    let hideMenu = props.hide

    let {logoutUser } = useContext(AuthContext)

  return (
    <div className={style.dropDown}>
        <ul>
            <Link to=''>Account</Link>
            <Link to=''>Profiles</Link>
            <Link onClick={() => {hideMenu(); logoutUser();}}>Logout</Link>
    
        </ul>
    </div>
  )
}
