import React from 'react'
import { Link } from 'react-router-dom'
import back_icon from '../../media/icons/expand.svg'
import style from '../../style/CreateProfile/NewMusician.module.css'

export default function NewMusician() {
  return (
    <div className={style.container}>

    <Link to='/profiles'><img src={back_icon} />Back</Link>

    </div>
  )
}
