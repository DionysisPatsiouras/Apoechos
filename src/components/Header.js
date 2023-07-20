import React, { useContext, useState, useEffect } from 'react'

import AuthContext from '../context/AuthContext'
import MainNavigationMenu from './MainNavigationMenu'

import '../style/main.css'
import style from '../style/MainNavigationMenu.module.css'

import burgerMenuIcon from '../media/icons/burger-menu.svg'
import closeIcon from '../media/icons/close.svg'



const Header = () => {
    let { user, logoutUser } = useContext(AuthContext)
    const [menuIsOpen, setMenuIsOpen] = useState(false)
    const [width, setWidth] = React.useState(window.innerWidth);


    useEffect(() => {
        window.addEventListener("resize", () => setWidth(window.innerWidth));
    }, [])


    return (


        <div className={style.menuContainer}>

            {width < 769 ? <img src={!menuIsOpen ? burgerMenuIcon : closeIcon} alt='Menu' className={style.menuIcon} onClick={() => setMenuIsOpen(!menuIsOpen)} /> : <MainNavigationMenu />}
            <hr className={style.divider}></hr>
            {menuIsOpen && width < 769 ? <MainNavigationMenu hideMenu={() => setMenuIsOpen(!menuIsOpen)} /> : null}


        </div>

    )
}

export default Header
