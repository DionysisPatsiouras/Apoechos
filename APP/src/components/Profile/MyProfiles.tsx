import { Link } from "react-router-dom"
import SvgIcon from "../SvgIcon"
import { useState, useContext, useEffect } from "react"
import ProfileContext from "../../context/ProfileContext"
// import AuthContext from "../../context/AuthContext"
// css
import CSS from '../../css/Profile/Profile.module.css'

interface Props {
    url: string;
}

export default function MyProfiles({ url }: Props) {

    const [height, setHeight] = useState<any>(window.innerHeight)
    const [width, setWidth] = useState<any>(window.innerWidth)
    let isDesktop = width >= 768
    let threshold = width <= 1500


    let { my_profiles, currentProfile, updateDOM, fetch_current_profile }: any = useContext(ProfileContext)


    const [fullBar, setFullBar] = useState<boolean>(false)

    useEffect(() => {
        setWidth(window.innerWidth)
        window.addEventListener("resize", () => setWidth(window.innerWidth))
        setFullBar(threshold ? false : true)
        document.title = 'Apoechos - Προφίλ'
    }, [width])

    useEffect(() => {
        setHeight(window.innerHeight)
        window.addEventListener("resize", () => setHeight(window.innerHeight))
    }, [height])


    useEffect(() => {
        fetch_current_profile()
    }, [])
    return (

        <aside className={CSS.my_profiles_list}
            style={{
                height: isDesktop ? height - 55 : 'unset',
                width: fullBar && isDesktop ? '320px' : '82px'
            }}>


            <ul className={CSS.myProfilesContainer} style={{ width: isDesktop ? 'auto' : '100vw' }}>

                {my_profiles.map((profile: any) => (
                    // <Link to={`/profile/${profile.profileId}`}
                    <Link to={`/${url}/${profile.profileId}`}
                        key={profile.profileId}
                        onClick={() => updateDOM()} >

                        <li
                            className='items-inline'
                            style={{
                                backgroundColor: profile.profileId === currentProfile?.profileId ? profile?.category?.color : 'unset',
                                color: profile.profileId === currentProfile?.profileId ? '#fff' : '#646464',
                                justifyContent: fullBar ? 'space-between' : 'center'
                            }}
                        >
                            <div className='items-inline' style={{ gap: '10px' }}>
                                <img src={`${process.env.REACT_APP_API_URL}${profile.photo}`} className='circle_img' width={10} />
                                {fullBar &&
                                    <div>
                                        <p className={CSS.profileName}>{profile.name} </p>
                                        <small style={{ color: '#d3d3d3' }} className={CSS.profileName}> {profile?.address}</small>
                                    </div>

                                }
                            </div>
                            {fullBar && <div className={CSS.categoryIcon}>
                                <SvgIcon id={profile.category.icon}
                                    color={profile.profileId === currentProfile?.profileId ? '#fff' : '#646464'}
                                />
                            </div>}
                        </li>

                    </Link>
                ))}

                <Link to='/create/'>
                    <li className='items-inline' style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: fullBar ? 'row' : 'column' }}>
                        {fullBar && 'Νέο Προφίλ'}
                        <SvgIcon id='add' color='#646464' />
                    </li>
                </Link>


            </ul>
            <div className={CSS.toggleIcon}>
                <SvgIcon id='burger' onClick={() => setFullBar(!fullBar)} width={20} />
            </div>

        </aside>

    )
}