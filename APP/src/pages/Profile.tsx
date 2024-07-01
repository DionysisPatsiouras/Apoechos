
import { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import img from '../utils/img/default_img.png'

// css
import CSS from '../css/Profile/Profile.module.sass'

// context
import AuthContext from '../context/AuthContext'
import { EditProfileProvider } from '../context/EditProfileContext'

// utils
import { Routes } from '../utils/Routes'
import Call from '../utils/Call'

// components
import Modal from '../components/Modal'
import SvgIcon from '../components/SvgIcon'
import Activity from '../components/Profile/Activity'



import EditProfile from '../components/Profile/EditProfile'

export default function Profile() {

    let { user }: any = useContext(AuthContext)

    const [height, setHeight] = useState<any>(undefined)

    const [currentProfile, setCurrentProfile] = useState<any>([])
    const [my_profiles, setMyProfiles] = useState<any>([])

    const [modal, setModal] = useState<boolean>(false)
    let [updateDOM, setUpdateDOM] = useState<boolean>(false)
    let [editMode, setEditMode] = useState<boolean>(false)

    let profile_id = window.location.pathname.replace('/profile/', '')


    const get_profile = new Call(Routes.profiles.id(profile_id), 'GET')
    const get_my_profiles = new Call(Routes.profiles.my_profiles, 'GET')


    let lists = [
        { id: 'studio_services', icon: 'studio', category: 3 },
        { id: 'instruments', icon: 'musician', category: 1 },
        { id: 'genres', icon: 'genres', category: 1 },
    ]


    useEffect(() => {

        setHeight(window.innerHeight)
        window.addEventListener("resize", () => setHeight(window.innerHeight))

        get_my_profiles
            .GET()
            .then((res) => setMyProfiles(res[1]))
            .catch((err) => console.warn(err))

        get_profile
            .GET()
            .then((res: any) => setCurrentProfile(res))
            .catch((err) => console.warn(err))


    }, [updateDOM])


    return (


        <div className={CSS.container}>


            <Modal open={modal} close={() => setModal(false)} closeButton={true}>
                <img src={`http://127.0.0.1:8000/${currentProfile?.photo}` || img} alt='profile_photo' />
            </Modal>

            <Modal
                open={editMode}
                withContainer={true}
                title={'Επεξεργασία προφίλ'}>
                <EditProfileProvider>
                    <EditProfile
                        profile={currentProfile}
                        close={() => {
                            setUpdateDOM(!updateDOM);
                            setEditMode(false)
                        }} />
                </EditProfileProvider>
            </Modal>

            <section style={{ display: 'flex' }}>


                {user?.user_id === currentProfile?.user &&
                    <aside className={CSS.my_profiles_list} style={{ height: height - 55 }}>
                        <ul>
                            {my_profiles.map((profile: any) => (
                                <Link to={`/profile/${profile.profileId}`} onClick={() => setUpdateDOM(!updateDOM)} key={profile.profileId}>
                                    <li
                                        className='items-inline'
                                        style={{
                                            backgroundColor: profile.profileId === currentProfile?.profileId ? profile?.category?.color : 'unset',
                                            color: profile.profileId === currentProfile?.profileId ? '#fff' : '#646464',
                                            justifyContent: 'space-between'
                                        }}
                                    >
                                        {profile.name}
                                        <SvgIcon id={profile.category.icon}
                                            color={profile.profileId === currentProfile?.profileId ? '#fff' : '#646464'}
                                        />
                                    </li>
                                </Link>
                            ))}

                            <Link to='/create/'>

                                <li className='items-inline' style={{ justifyContent: 'space-between' }}>
                                    Νέο Προφίλ
                                    <SvgIcon id='add' color='#646464' />
                                </li>
                            </Link>
                        </ul>
                    </aside>

                }


                <section className={CSS.right_content}>
                    <div className={CSS.profileInfo}>

                        <div style={{ display: 'flex', gap: '20px' }}>


                            <div>
                                <div className={CSS.signature} style={{ backgroundColor: currentProfile?.category?.color }}>
                                    <SvgIcon id={currentProfile?.category?.icon} style={{ margin: '5px  0 0 172px' }} color={'#fff'} />
                                </div>

                                <img
                                    src={currentProfile?.photo !== null ? `http://127.0.0.1:8000/${currentProfile.photo}` : img}
                                    alt='currentProfile'
                                    className={CSS.profile_photo}
                                    width={150}
                                    height={150}
                                    onClick={() => setModal(!modal)} />
                            </div>

                            <div>
                                <div className='items-inline' >
                                    <strong> {currentProfile?.name} </strong>
                                    {user?.user_id === currentProfile?.user &&
                                        <SvgIcon id='edit' color='#5b5b5b' onClick={() => setEditMode(true)} />
                                    }

                                </div>

                                <p className={CSS.bio}>{currentProfile?.bio}</p>
                                <div className='items-inline'>
                                    <SvgIcon id='location' />
                                    <p>{currentProfile?.city?.name}{currentProfile.address && `, ${currentProfile.address}`} </p>

                                </div>

                            </div>
                        </div>

                        <div>
                            {currentProfile?.length !== 0 &&
                                lists
                                    .filter((list: any) => list.category === currentProfile?.category?.id)
                                    .map((list: any) => (
                                        <li key={list.id} className={CSS.attr}>
                                            {currentProfile?.[list?.id]?.length !== 0 &&
                                                <SvgIcon id={list?.icon} style={{ minWidth: '24px', minHeight: '24px' }} color='#414141' />
                                            }

                                            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                                                {currentProfile?.[list.id]?.map((i: any, index: number) => (
                                                    <div key={index} style={{ margin: '0 3px 0 0' }}>
                                                        {i?.name}
                                                        {index !== currentProfile?.[list?.id]?.length - 1 && ','}
                                                    </div>
                                                ))}
                                            </div>


                                        </li>
                                    ))}
                        </div>

                    </div>
                    <Activity
                        id={currentProfile?.profileId}
                        category={currentProfile?.category?.name}
                        canEdit={currentProfile.user === user?.user_id ? true : false}
                    />
                </section>


            </section>




        </div>

    )
}