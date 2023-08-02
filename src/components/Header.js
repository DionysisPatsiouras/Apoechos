import React, { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext'

// import axios from 'axios'

import '../style/main.css'
import style from '../style/Header.module.css'

import burgerMenuIcon from '../media/icons/burger-menu.svg'
import closeIcon from '../media/icons/close.svg'
import accountIcon from '../media/icons/account.svg'
import onlinePic from '../media/icons/onlinePic.svg'
import notificationsIcon from '../media/icons/notifications.svg'
import messagesIcon from '../media/icons/messages.svg'
import editIcon from '../media/icons/edit.svg'
import logoutIcon from '../media/icons/logout.svg'
import musicianIcon from '../media/icons/musicianIcon.svg'
// import logo from '../media/logo.svg'




export default function Header() {

    let { user, logoutUser } = useContext(AuthContext)
    const [width, setWidth] = React.useState(window.innerWidth);


    const [menuIsOpen, setMenuIsOpen] = useState(false)
    const [accountIsOpen, setAccountIsOpen] = useState(false)
    const [dropdownIsOpen, setDropDownIsOpen] = useState(false)
    const [hover, setHover] = useState('')

    const mobileEnabled = width < 769


    useEffect(() => {
        window.addEventListener("resize", () => setWidth(window.innerWidth));
    }, [])


    return (

        <div className={style.container}>


            {/*   NAVIGATION MENU  */}
            <div className={style.menu}>

                {mobileEnabled ? <img src={menuIsOpen ? closeIcon : burgerMenuIcon} width={44} height={44} alt="menu" onClick={() => { setMenuIsOpen(!menuIsOpen); setAccountIsOpen(false) }} /> : null}
                <ul style={{ 'left': menuIsOpen ? '0%' : '-200%' }}>
                    {/* <Link to="/"><img src={logo} width={30} height={30} /></Link> */}
                    <Link to="/" onClick={() => setMenuIsOpen(false)}>What's New</Link>
                    <Link to="/discover" onClick={() => setMenuIsOpen(false)}>Discover</Link>
                    <Link to="/mystudio" onClick={() => setMenuIsOpen(false)}>My Studio</Link>
                    <Link to="/upcoming-events" onClick={() => setMenuIsOpen(false)}>Upcoming Events</Link>
                    <Link to="learn-more" onClick={() => setMenuIsOpen(false)}>Learn More</Link>
                </ul>
            </div>



            {/* USER MENU */}
            <div className={style.account}>

                {mobileEnabled ?
                    <>
                        <img src={user ? onlinePic : accountIcon} width={41} height={41} alt="menu" style={{ 'borderRadius': '99px', 'border': accountIsOpen ? '3px solid #5F69C6' : '3px solid #ffffff' }} onClick={() => { setAccountIsOpen(!accountIsOpen); setMenuIsOpen(false) }} />
                        <ul className={style.dropdown} style={{ 'left': accountIsOpen ? '0' : '-200%' }}>
                            <ul className={style.accountMenu}>
                                {user && !user.hasMusicianProfile && !user.hasBandProfile && !user.hasStoreProfile && !user.hasStageProfile && !user.StudioProfile ? <Link to='/create-profile' className={style.joinButton}>Join the community!</Link> : null}
                                {user ? <Link to="/account" onClick={() => setAccountIsOpen(false)}><img src={accountIcon} width={40} height={40} alt='Account' />Account</Link> : null}
                                {user ? <Link to="/profile" onClick={() => setAccountIsOpen(false)}><img src={editIcon} width={40} height={40} alt='Edit' />Edit profile</Link> : null}
                                {user ? <Link to="/notifications" onClick={() => setAccountIsOpen(false)}><img src={notificationsIcon} width={40} height={40} alt='Notifications' />Notifications</Link> : null}
                                {user ? <Link to="/messages" onClick={() => setAccountIsOpen(false)}><img src={messagesIcon} width={40} height={40} alt='Messages' />Messages</Link> : null}
                                {user ? <hr className={style.divider}></hr> : null}
                                {user ? <Link to="/login" onClick={() => { setAccountIsOpen(false); logoutUser() }}><img src={logoutIcon} width={40} height={40} alt='Logout' />Logout</Link> : null}
                                {user ? null : <Link to="/login" onClick={() => setAccountIsOpen(false)}>Login</Link>}
                                {user ? null : <Link to="/register" onClick={() => setAccountIsOpen(false)}>Register</Link>}
                            </ul>
                        </ul>
                    </>
                    :
                    // DESKTOP VERSION
                    <ul className={style.onlineMenu}>

                        {user && !user.hasMusicianProfile && !user.hasBandProfile && !user.hasStoreProfile && !user.hasStageProfile && !user.StudioProfile ? <Link to='/account' className={style.joinButton}>Join the community!</Link> : null}
                        {user ? <img src={notificationsIcon} width={25} height={25} alt='Notifications' /> : null}

                        {user ? <img src={messagesIcon} width={25} height={25} alt='Messages' /> : null}
                        {user ? <img src={onlinePic} width={40} height={40} alt='Account' style={{ 'borderRadius': '199px', 'border': dropdownIsOpen ? '3px solid #5F69C6' : '3px solid #ffffff' }} onClick={() => setDropDownIsOpen(!dropdownIsOpen)} /> : null}


                        {dropdownIsOpen ?
                            <ul className={style.dropDownDesktop} >
                                <Link to="/profiles"
                                    onClick={() => { setAccountIsOpen(false); setDropDownIsOpen(false) }}
                                    onMouseOver={() => setHover('profiles')}
                                    onMouseLeave={() => setHover('')}>
                                    {/* <img src={musicianIcon} width={20} height={20} alt='Profiles' /> */}
                                    <svg width="30" height="28" viewBox="0 0 30 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clip-path="url(#clip0_1313_1029)">
                                            <path d="M19.4671 0.808835C19.2947 1.02254 19.3316 1.11849 19.6083 1.18578C19.6886 1.20548 19.7561 1.22226 19.7555 1.2248C19.7574 1.22794 19.4553 1.50623 19.4533 1.5031C19.4524 1.50153 19.4511 1.4743 19.4485 1.4414C19.4426 1.36735 19.3755 1.21874 19.3185 1.15455C19.281 1.11502 19.2596 1.10877 19.1992 1.11785C19.0677 1.14032 18.9042 1.31836 18.9169 1.42491C18.9256 1.49288 19.022 1.55664 19.1851 1.59663C19.2552 1.61398 19.3118 1.63097 19.3106 1.63606C19.3083 1.63959 19.2345 1.71293 19.1435 1.80118C18.9956 1.94375 18.9314 1.98966 18.9595 1.93145C18.9754 1.90009 18.9244 1.75244 18.8676 1.66004C18.8282 1.59583 18.8058 1.57724 18.752 1.56496C18.6906 1.55092 18.6784 1.55622 18.589 1.62194C18.4804 1.69943 18.4086 1.819 18.425 1.88872C18.4388 1.94708 18.5659 2.01786 18.7089 2.04651C18.7786 2.05976 18.8369 2.07576 18.8407 2.08202C18.8446 2.08829 18.7877 2.15338 18.7139 2.22673C18.6418 2.29909 18.576 2.36752 18.5683 2.37654C18.5584 2.38909 18.543 2.36403 18.5196 2.29001C18.4675 2.13002 18.4166 2.05779 18.3401 2.03358C18.2835 2.01659 18.2646 2.02171 18.1879 2.0688C18.085 2.13414 17.9991 2.25589 18.004 2.32836C18.0067 2.40437 18.0883 2.46207 18.2534 2.50519C18.3312 2.5243 18.3939 2.54402 18.3933 2.54657C18.3936 2.55068 18.3272 2.62166 18.2483 2.70461C18.1052 2.85501 18.0617 2.87739 18.0763 2.79725C18.0852 2.74004 18.013 2.54716 17.9608 2.4908C17.8938 2.41761 17.8308 2.41533 17.7263 2.48165C17.5899 2.56759 17.5108 2.71107 17.5579 2.78781C17.5896 2.83949 17.7324 2.90712 17.8478 2.92678C17.9998 2.95209 17.9985 2.96796 17.8267 3.14679C17.744 3.23425 17.6699 3.30348 17.6613 3.30016C17.6536 3.2984 17.6475 3.27412 17.6494 3.24493C17.6512 3.16187 17.568 2.9692 17.5053 2.91716C17.4425 2.86512 17.3965 2.86536 17.307 2.9203C17.1568 3.01253 17.0793 3.15503 17.1322 3.24117C17.1639 3.29285 17.4084 3.3972 17.4615 3.37971C17.4787 3.37558 17.5072 3.38612 17.5245 3.40354C17.555 3.43877 17.5559 3.44033 17.416 3.578C17.3237 3.67134 17.244 3.86046 17.2458 3.98877C17.2469 4.0873 17.2995 4.20165 17.3834 4.28815C17.419 4.32455 17.419 4.33532 17.3842 4.40412C17.3632 4.44508 17.3485 4.49289 17.354 4.50895C17.3595 4.52501 17.2673 4.73687 17.1506 4.97676C17.0348 5.21823 16.8563 5.58669 16.7549 5.79778C16.6541 6.00632 16.5609 6.19506 16.5485 6.2178C16.5377 6.23955 16.4691 6.37871 16.398 6.52805C16.0211 7.32241 15.8169 7.7389 15.7978 7.75067C15.785 7.75852 15.7748 7.77773 15.7761 7.79418C15.7774 7.81064 15.6349 8.11599 15.4614 8.47485C15.2879 8.83372 15.0994 9.22551 15.0404 9.348C14.983 9.46952 14.8628 9.71804 14.7741 9.89973C14.6864 10.083 14.5726 10.3168 14.5222 10.4211C14.4718 10.5253 14.3385 10.7991 14.2285 11.0285C14.1194 11.2593 14.0199 11.452 14.0103 11.4579C14.0007 11.4638 13.988 11.4932 13.9794 11.5222C13.9717 11.5527 13.9121 11.6886 13.8452 11.8267C13.7466 12.0317 13.3767 12.7873 13.3183 12.9072C13.3024 12.9386 13.2277 13.0966 13.0348 13.5062C12.9809 13.6191 12.934 13.7147 12.9308 13.7167C12.9261 13.7196 12.8855 13.8006 12.8422 13.8984C12.7507 14.0969 12.7593 14.0895 12.4598 14.2108C12.1603 14.3322 11.9796 14.3569 11.7963 14.3056C11.636 14.2595 11.5549 14.1885 11.429 13.9833C11.3097 13.7891 11.2602 13.6405 11.2491 13.4468C11.2399 13.2885 11.2701 13.1406 11.4216 12.6205C11.4961 12.3656 11.5062 12.3033 11.4961 12.1758C11.4633 11.7926 11.2224 11.5545 10.8556 11.5447C10.6733 11.538 10.5131 11.5889 10.353 11.7045C9.75521 12.132 9.37461 12.8164 9.18729 13.8049C9.15332 13.9789 9.08011 14.4616 9.02409 14.8756C8.92691 15.5952 8.84569 16.0614 8.79725 16.1903C8.76539 16.2746 8.63517 16.471 8.53682 16.5832C8.32735 16.8261 8.10885 17.0185 7.69702 17.3296C6.86441 17.9552 6.22243 18.5867 5.76629 19.2269C5.5039 19.5951 5.39898 19.8148 5.35141 20.1028C5.19822 21.0143 5.48222 21.9139 6.13917 22.6039C6.42521 22.9049 6.84204 23.1967 7.49949 23.5543C9.40302 24.5939 11.0852 25.1439 12.0471 25.0407C12.3944 25.0042 12.6923 24.8946 13.0684 24.6615C13.3401 24.4947 13.4682 24.388 13.6562 24.1712C13.8641 23.9292 14.0919 23.5262 14.2107 23.1858C14.4264 22.566 14.5693 21.6198 14.5514 20.917C14.535 20.2132 14.7188 19.6561 15.1606 19.0677C15.3288 18.8436 15.5054 18.6511 15.9791 18.1683C16.3821 17.7569 16.4942 17.6277 16.6222 17.424C16.8401 17.0766 16.8956 16.7514 16.7874 16.4426C16.7444 16.3224 16.5915 16.0733 16.4893 15.9571C16.39 15.8455 16.2988 15.8153 16.121 15.8339C15.8575 15.8598 15.6964 15.963 15.3966 16.2917C15.2493 16.4532 15.2148 16.483 15.0423 16.589C14.8835 16.6887 14.8301 16.7128 14.7271 16.7351C14.4992 16.7866 14.3011 16.7616 14.0944 16.6578C13.9696 16.5943 13.7502 16.4162 13.7281 16.3587C13.7178 16.3348 13.8179 16.0857 14.0302 15.6038C14.2049 15.2075 14.357 14.8639 14.3685 14.8396C14.38 14.8153 14.4594 14.6328 14.5451 14.4357C14.6299 14.237 14.708 14.0704 14.716 14.0655C14.724 14.0606 14.7409 14.02 14.7533 13.9757C14.7705 13.9177 15.3593 12.5619 15.535 12.1779C15.572 12.0948 15.7735 11.6347 15.8315 11.4998C15.8596 11.4309 15.9236 11.288 15.9705 11.1816C16.019 11.0742 16.3085 10.4133 16.6164 9.71089C16.9238 9.01103 17.1884 8.42797 17.2076 8.4162C17.2252 8.40541 17.2338 8.38718 17.2261 8.37465C17.2126 8.35272 17.5087 7.64896 17.5375 7.63129C17.5455 7.62639 17.5531 7.6066 17.5566 7.5872C17.5617 7.55605 17.8346 6.91832 17.8834 6.82581C17.892 6.80758 17.9765 6.61552 18.0715 6.39758C18.1665 6.17965 18.25 5.98602 18.2596 5.96936C18.2682 5.95113 18.3591 5.74436 18.4611 5.50919C18.5806 5.23089 18.6549 5.07958 18.6719 5.08211C18.7058 5.08717 18.7788 4.91941 18.7567 4.88339C18.7432 4.86146 18.7614 4.84812 18.9276 4.75685C19.1012 4.66323 19.324 4.57817 19.6229 4.49166L19.7482 4.45568L19.8276 4.30554C19.954 4.05976 20.0446 3.71293 20.1426 3.10928C20.1708 2.92589 20.2181 2.66609 20.2445 2.53344L20.294 2.29166L20.3433 2.32177C20.5239 2.43304 20.8637 2.34512 21.0633 2.13628C21.215 1.97843 21.2788 1.80989 21.2593 1.61696C21.2486 1.51354 21.2364 1.48652 21.1268 1.30798C20.9517 1.02294 20.7862 0.878745 20.5785 0.827249C20.4138 0.788245 20.36 0.797509 20.1779 0.909361C20.09 0.963325 19.9916 1.03238 19.9597 1.06278L19.8996 1.11907L19.8941 1.04914C19.8908 1.008 19.86 0.925565 19.818 0.849995C19.7551 0.733307 19.7423 0.719609 19.6956 0.711626C19.6438 0.702475 19.5044 0.762173 19.4671 0.808835Z" fill={hover === 'profiles' ? '#ffffff' : '#3E3E3E'} />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_1313_1029">
                                                <rect width="24" height="17" fill="white" transform="translate(0 12.75) rotate(-31.5528)" />
                                            </clipPath>
                                        </defs>
                                    </svg>

                                    Profiles
                                </Link>

                                <Link
                                    to="/account"
                                    onClick={() => { setAccountIsOpen(false); setDropDownIsOpen(false) }}
                                    onMouseOver={() => setHover('account')}
                                    onMouseLeave={() => setHover('')}>
                                    <svg width="20" height="20" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8.42096 33.2825C10.2801 31.8608 12.358 30.7398 14.6546 29.9196C16.9513 29.0994 19.3573 28.6893 21.8726 28.6893C24.388 28.6893 26.7939 29.0994 29.0906 29.9196C31.3872 30.7398 33.4651 31.8608 35.3243 33.2825C36.6002 31.7879 37.5936 30.0928 38.3044 28.1971C39.0153 26.3015 39.3707 24.2783 39.3707 22.1275C39.3707 17.2791 37.6665 13.1506 34.258 9.74213C30.8495 6.33365 26.721 4.62941 21.8726 4.62941C17.0242 4.62941 12.8957 6.33365 9.48725 9.74213C6.07876 13.1506 4.37452 17.2791 4.37452 22.1275C4.37452 24.2783 4.72995 26.3015 5.44081 28.1971C6.15167 30.0928 7.14505 31.7879 8.42096 33.2825ZM21.8726 24.3148C19.7218 24.3148 17.9082 23.5766 16.4318 22.1002C14.9554 20.6238 14.2172 18.8101 14.2172 16.6593C14.2172 14.5085 14.9554 12.6949 16.4318 11.2185C17.9082 9.74213 19.7218 9.00393 21.8726 9.00393C24.0234 9.00393 25.837 9.74213 27.3134 11.2185C28.7898 12.6949 29.528 14.5085 29.528 16.6593C29.528 18.8101 28.7898 20.6238 27.3134 22.1002C25.837 23.5766 24.0234 24.3148 21.8726 24.3148ZM21.8726 44.0001C18.8469 44.0001 16.0035 43.4259 13.3423 42.2776C10.6811 41.1293 8.36627 39.5709 6.39774 37.6024C4.4292 35.6338 2.87078 33.319 1.72247 30.6578C0.574156 27.9966 0 25.1532 0 22.1275C0 19.1018 0.574156 16.2583 1.72247 13.5972C2.87078 10.936 4.4292 8.62116 6.39774 6.65262C8.36627 4.68409 10.6811 3.12566 13.3423 1.97735C16.0035 0.829039 18.8469 0.254883 21.8726 0.254883C24.8983 0.254883 27.7418 0.829039 30.4029 1.97735C33.0641 3.12566 35.3789 4.68409 37.3475 6.65262C39.316 8.62116 40.8744 10.936 42.0228 13.5972C43.1711 16.2583 43.7452 19.1018 43.7452 22.1275C43.7452 25.1532 43.1711 27.9966 42.0228 30.6578C40.8744 33.319 39.316 35.6338 37.3475 37.6024C35.3789 39.5709 33.0641 41.1293 30.4029 42.2776C27.7418 43.4259 24.8983 44.0001 21.8726 44.0001Z" fill={hover === 'account' ? "#ffffff" : '#3E3E3E'} />
                                    </svg>
                                    Account
                                </Link>

                                <Link to="/login"
                                    onClick={() => { setDropDownIsOpen(false); logoutUser() }}
                                    onMouseOver={() => setHover('logout')}
                                    onMouseLeave={() => setHover('')}>
                                    {/* <img src={logoutIcon} width={20} height={20} alt='Logout' /> */}
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 -960 960 960" >
                                        <path d="M189-95q-39.05 0-66.525-27.475Q95-149.95 95-189v-582q0-39.463 27.475-67.231Q149.95-866 189-866h296v95H189v582h296v94H189Zm467-174-67-66 97-98H354v-94h330l-97-98 67-66 212 212-210 210Z" fill={hover === 'logout' ? '#ffffff': '#3E3E3E'}/>
                                    </svg>
                                    Log Out</Link>
                            </ul>
                            :
                            null
                        }

                        {user ? null :
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


