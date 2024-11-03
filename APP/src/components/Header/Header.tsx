import { useEffect, useState, useContext } from 'react'

import CSS from '../../css/Header/Header.module.css'

// context
import AuthContext from '../../context/AuthContext'
import UserContext from '../../context/UserContext'
import { WindowSize } from '../../App'

import SvgIcon from '../SvgIcon'

import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'


export default function Header() {


    const location = useLocation()

    const { user, logoutUser }: any = useContext(AuthContext)
    const { fetchMyProfiles, myProfiles }: any = useContext(UserContext)
    const windowIsResponsive = useContext(WindowSize)

    const [pageTitle, setPageTitle] = useState<string>('Apoechos')
    const [update, setUpdate] = useState<boolean>(false)
    const [open, setOpen] = useState<boolean>(false)

    let profile_exists = myProfiles?.[1]?.[0]?.profileId !== undefined
    let first_profile = myProfiles?.[1]?.[0]?.profileId

    const toggleMenu = () => setOpen(!open)


    const identify_page = () => {

        const value = location.pathname.replace('/', '')
        const prefix = 'Apoechos'

        const setValue = (title: string) => {
            setPageTitle(title)
            document.title = `${prefix} - ${title}`
        }

        switch (value) {
            case '':
                return setValue('Αρχική')
            case 'account':
                return setValue('Λογαριασμός')
            case 'events':
                return setValue('Εκδηλώσεις')
            case 'discover':
                return setValue('Ανακάλυψε')
            case 'posts':
                return setValue('Δημοσιεύσεις')
            case 'map':
                return setValue('Χάρτης')
            case 'login':
                return setValue('Σύνδεση')
            case 'register':
                return setValue('Εγγραφή')
            case `messages/${first_profile}`:
                return setValue('Μηνύματα')
            case `profile/${first_profile}`:
                return setValue('Προφίλ')
            default:
                return 'Apoechos'
        }
    }



    useEffect(() => {
        identify_page()
    }, [update, user])


    useEffect(() => {
        fetchMyProfiles()
    }, [])





    const menu = [
        {
            icon: 'musician', label: 'Προφίλ',
            url: profile_exists
                ? `/profile/${first_profile}`
                : '/create/', onClick: () => null
        },
        { icon: 'search', label: 'Ανακάλυψε', url: '/discover', onClick: () => null },
        { icon: 'post', label: 'Δημοσιεύσεις', url: '/posts', onClick: () => null },
        { icon: 'calendar', label: 'Εκδηλώσεις', url: '/events', onClick: () => null },
        { icon: 'map', label: 'Χάρτης', url: '/map', onClick: () => null },

        { icon: 'account', label: 'Προφίλ', url: '/account', right_menu: true, onClick: () => null },
        {
            icon: 'messages', label: 'Μηνύματα',
            url: profile_exists ? `/messages/${first_profile}` : '/create', right_menu: true, onClick: () => null
        },
        { icon: 'logout', label: 'Αποσύνδεση', url: '/login', right_menu: true, onClick: () => logoutUser() },

        { icon: 'login', label: 'Σύνδεση', url: '/login', visitor: true, right_menu: true, onClick: () => null },
        { icon: 'studio', label: 'Εγγραφή', url: '/register', visitor: true, right_menu: true, onClick: () => null },

        { icon: 'band', label: 'Αρχική', url: '/', visitor: true, onClick: () => null },
        { icon: 'search', label: 'Ανακάλυψε', url: '/discover', visitor: true, onClick: () => null },
        { icon: 'calendar', label: 'Εκδηλώσεις', url: '/events', visitor: true, onClick: () => null },
    ]




    return (
        <header className='d-flex justify-content-between align-items-center px-3 pr-md-0 pl-md-3' >

            <SvgIcon id='burger' className='d-block d-md-none' color='#fff' width={25} onClick={toggleMenu} />


            <ul className={`${CSS.leftMenu} m-0 d-flex flex-column flex-md-row d-md-flex`}
                style={{
                    // display: open ? 'flex' : 'none',
                    left: open ? '0px' : '-80%'
                }}
            >
                {menu
                    .filter((item: any) => user ? !item.visitor : item.visitor)
                    .filter((item: any) => windowIsResponsive ? item : !item.right_menu)
                    .map((item: any, index: number) => (

                        <Link to={item.url} onClick={() => { setUpdate(!update); setOpen(false); item?.onClick() }} key={index}
                            className='d-flex align-items-center drop-shadow' style={{ gap: '5px' }}>
                            <SvgIcon id={item.icon} color='#fff' width={24} height={24} />
                            <p className='m-0 d-block d-md-none'>{item.label}</p>
                        </Link>
                    ))}
            </ul>

            <div className='d-flex align-items-center drop-shadow px-3 pl-md-0 pr-md-4' style={{ gap: '8px' }}>
                <strong className='text-light'>{pageTitle}</strong>
            </div>


            <ul
                className={`${CSS.rightMenu} d-none d-md-flex m-0`}>
                {menu
                    .filter((item: any) => item.right_menu)
                    .filter((item: any) => user ? !item.visitor : item.visitor)
                    .map((item: any, index: number) => (
                        <Link to={item.url} onClick={() => { setUpdate(!update); item?.onClick() }} key={index} className='d-flex align-items-center' >
                            <SvgIcon id={item.icon} color='#5F69C6' width={20} height={20} className='cursor-pointer' />
                            <p className='m-0 d-block d-md-none'>{item.label}</p>
                        </Link>
                    ))}
            </ul>



        </header>
    )
}