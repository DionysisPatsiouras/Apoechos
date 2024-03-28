import CSS from '../../css/Header/Header.module.css'

import AuthContext from '../../context/AuthContext'
import UserContext from '../../context/UserContext'
import { useContext } from 'react'

import { WindowSize } from '../../App'


import MobileMenu from './MobileMenu'
import VisitorMenu from './VisitorMenu'
import UserMenu from './UserMenu'


export default function Header() {


    let { user }: any = useContext(AuthContext)
    let { data }: any = useContext(UserContext)
    const windowIsResponsive = useContext(WindowSize)

    
    // console.warn(data)

    return (
        <header className={CSS.container}>


            {windowIsResponsive ?
                <MobileMenu /> :
                <div className={CSS.desktopMenu}>
                    {user ? <UserMenu user={user} data={data}/> : <VisitorMenu />}
                </div>
            }


        </header>
    )
}