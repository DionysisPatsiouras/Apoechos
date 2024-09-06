import { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import SvgIcon from '../SvgIcon'
import CSS from '../../css/Header/Header.module.css'


// utils
import Call from '../../utils/Call'
import { Routes } from '../../utils/Routes'

// context
import UserContext from '../../context/UserContext'
import AuthContext from '../../context/AuthContext'


import logo from '../../img/logo.png'

export default function UserMenu(props: any) {

    let { logoutUser }: any = useContext(AuthContext)
    let { updateDOM }: any = useContext(UserContext)


    const [accountModal, setAccountModal] = useState<boolean>(false)
    const [myProfiles, setMyProfiles] = useState<any[]>([])

    const fetch_my_profiles = new Call(Routes.profiles.my_profiles, 'GET')

    useEffect(() => {
        fetch_my_profiles
            .GET()
            .then((res) => {
                setMyProfiles(res)
            })
            .catch((err) => console.warn(err))
    }, [updateDOM])

    // console.log(myProfiles)

    let profile_exists = myProfiles?.[1]?.[0]?.profileId !== undefined
    let first_profile = myProfiles?.[1]?.[0]?.profileId


    return (
        <>
            <ul className={CSS.mainNavigation}>
                <img src={logo} width={40} style={{ margin: '0 10px' }} alt='apoechos logo'/>
                <Link to={profile_exists
                    ? `/profile/${first_profile}`
                    : '/create/'}>Προφίλ</Link>
                <Link to="/discover">Ανακάλυψε</Link>
                <Link to="/posts">Δημοσιεύσεις</Link>
                <Link to="/events">Εκδηλώσεις</Link>
                <Link to="/map">Χάρτης</Link>
            </ul>



            <ul className={CSS.loggedUserMenu}>


                {/* <SvgIcon id='notifications' width={20} /> */}
                <Link to={profile_exists ? `/messages/${first_profile}` : '/create'}>
                    <SvgIcon id='messages' width={25} height={40} color='#6f6f6f' />
                </Link>

                <SvgIcon id='account' width={25} height={40} color='#6f6f6f' onClick={() => setAccountModal(!accountModal)} />

            </ul>


            <div
                className={CSS.account_dropdown}
                onClick={() => setAccountModal(false)}
                style={{ 'display': accountModal ? 'block' : 'none' }}>
                <Link to='/account'><SvgIcon id='account' width={25} />Λογαριασμός</Link>
                <Link to='/login' onClick={logoutUser}><SvgIcon id='logout' width={25} />Αποσύνδεση</Link>
            </div>

        </>
    )
}