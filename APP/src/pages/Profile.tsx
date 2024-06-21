
import { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import img from '../utils/img/default_img.png'

// css
import CSS from '../css/Profile/Profile.module.sass'

// context
import AuthContext from '../context/AuthContext'

// utils
import { Routes } from '../utils/Routes'
import Call from '../utils/Call'

// components
import Modal from '../components/Modal'
import SvgIcon from '../components/SvgIcon'
import Activity from '../components/Profile/Activity'

import Characteristics from '../components/Profile/Characteristics'

import EditProfile from '../components/Profile/EditProfile'
export default function Profile() {

    let { user }: any = useContext(AuthContext)

    const [currentProfile, setCurrentProfile] = useState<any>([])
    const [my_profiles, setMyProfiles] = useState<any>([])

    const [modal, setModal] = useState<boolean>(false)
    let [updateDOM, setUpdateDOM] = useState<boolean>(false)
    let [editMode, setEditMode] = useState<boolean>(false)

    let profile_id = window.location.pathname.replace('/profile/', '')


    const get_profile = new Call(Routes.profiles.id(profile_id), 'GET')
    const get_my_profiles = new Call(Routes.profiles.my_profiles, 'GET')

   
    useEffect(() => {
 
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
                <EditProfile profile={currentProfile} close={() => {
                    setUpdateDOM(!updateDOM);
                    setEditMode(false)
                }} />
            </Modal>


            {user?.user_id === currentProfile?.user &&
                <aside className={CSS.my_profiles_list}>
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
                                    <SvgIcon id={profile.category.name.toLocaleLowerCase()}
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

            <section className={CSS.personal_info}>

                <div className={CSS.signature} style={{ backgroundColor: currentProfile?.category?.color }}>
                    <SvgIcon id={currentProfile?.category?.name.toLowerCase()} style={{ margin: '5px  0 0 172px' }} color={'#fff'} />
                </div>


                <img
                    src={currentProfile?.photo !== null ? `http://127.0.0.1:8000/${currentProfile.photo}` : img}
                    alt='currentProfile'
                    className={CSS.profile_photo}
                    width={150}
                    height={150}
                    onClick={() => setModal(!modal)} />

                <Characteristics
                    data={currentProfile}
                    canEdit={user?.user_id === currentProfile?.user ? true : false}
                    onClick={() => setEditMode(!editMode)}
                />

            </section>

            <hr></hr>

            <section className={CSS.right_section}>
                <Activity
                    id={currentProfile?.profileId}
                    category={currentProfile?.category?.name}
                    canEdit={currentProfile.user === user?.user_id ? true : false}
                />
            </section>


        </div>

    )
}