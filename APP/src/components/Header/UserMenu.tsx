import { Link } from 'react-router-dom'
import AuthContext from '../../context/AuthContext'
import SvgIcon from '../SvgIcon'
import CSS from '../../css/Header/Header.module.css'
import { useContext, useState, useEffect } from 'react'
import UserContext from '../../context/UserContext'
import Call from '../../utils/Call'
import { Routes } from '../../utils/Routes'


export default function UserMenu(props: any) {

    let { logoutUser }: any = useContext(AuthContext)
    let { me }: any = useContext(UserContext)


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
    }, [])

    // console.log(myProfiles)


    return (
        <>
           

            <ul>
                <Link to={ myProfiles?.[1]?.[0]?.profileId !== undefined ? `/profile/${myProfiles?.[1]?.[0]?.profileId}` : '/create/' }>Προφίλ</Link>
                <Link to="/discover">Ανακάλυψε</Link>
                <Link to="/">Εκδηλώσεις - Ροή</Link>
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
           
                <Link to='/login' onClick={logoutUser}><SvgIcon id='logout' width={25} />Αποσύνδεση</Link>
            </div>

        </>
    )
}