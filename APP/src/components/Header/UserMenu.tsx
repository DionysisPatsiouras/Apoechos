import { Link } from 'react-router-dom'
import AuthContext from '../../context/AuthContext'
import SvgIcon from '../SvgIcon'
import CSS from '../../css/Header/Header.module.css'
import { useContext, useState, useEffect } from 'react'
import UserContext from '../../context/UserContext'



export default function UserMenu(props: any) {

    let { logoutUser }: any = useContext(AuthContext)
    let { me, myProfiles }: any = useContext(UserContext)


    const [accountModal, setAccountModal] = useState<boolean>(false)


    let profile_url = myProfiles?.[1]?.[0]?.profileId == undefined
        ? '/create/'
        : `/profile/${myProfiles?.[1]?.[0]?.profileId}`

    return (
        <>

            <ul>
                <Link to={profile_url}>Προφίλ</Link>
                <Link to="/discover">Ανακάλυψε</Link>
                <Link to="/">Εκδηλώσεις - Ροή</Link>
                {/* <Link to="/mystudio">My Studio</Link> */}
                {/* <Link to="/upcoming-events">Upcoming Events</Link> */}
                {/* <Link to="learn-more">Learn More</Link> */}
            </ul>



            <ul className={CSS.loggedUserMenu}>

                {me?.musicianId &&
                    <>
                        <SvgIcon id='notifications' width={20} />
                        <SvgIcon id='messages' width={25} />
                    </>
                }
              
                <SvgIcon id='account' width={25} onClick={() => setAccountModal(!accountModal)} />



            </ul>


            <div
                className={CSS.account_dropdown}
                onClick={() => setAccountModal(false)}
                style={{ 'display': accountModal ? 'block' : 'none' }}>
                <Link to='/account'><SvgIcon id='account' width={25} />Λογαριασμός</Link>
                <Link to='/create'><SvgIcon id='add' width={25} />Νέο Προφίλ</Link>
                <Link to='/login' onClick={logoutUser}><SvgIcon id='logout' width={25} />Αποσύνδεση</Link>
            </div>

        </>
    )
}