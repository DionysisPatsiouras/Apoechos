
import { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import img from '../utils/img/default_img.png'

// css
import CSS from '../css/Profile/Profile.module.sass'

// context
import AuthContext from '../context/AuthContext'
import ProfileContext from '../context/ProfileContext'

// components
import Modal from '../components/Modal'
import SvgIcon from '../components/SvgIcon'
import Activity from '../components/Profile/Activity'
import EditProfile from '../components/Profile/EditProfile'
import NewMessageWindow from '../components/Messages/NewMessageWindow'

export default function Profile() {

    let { user }: any = useContext(AuthContext)
    let {
        my_profiles,
        currentProfile,
        updateDOM,
        editMode, setEditMode }: any = useContext(ProfileContext)


    const [height, setHeight] = useState<any>(undefined)



    const [modal, setModal] = useState<boolean>(false)
    const [newMsg, setNewMsg] = useState<boolean>(false)



    let lists = [
        { id: 'studio_services', icon: 'studio', category: 3 },
        { id: 'instruments', icon: 'musician', category: 1 },
        { id: 'genres', icon: 'genres', category: 1 },
    ]



    useEffect(() => {

        setHeight(window.innerHeight)
        window.addEventListener("resize", () => setHeight(window.innerHeight))


    }, [])

    // console.log(currentProfile)

    return (


        <div className={CSS.container}>


            <Modal open={modal} close={() => setModal(false)} closeButton={true}>
                <img src={`http://127.0.0.1:8000/${currentProfile?.photo}` || img} alt='profile_photo' />
            </Modal>

            <Modal
                open={editMode}
                withContainer={true}
                title={'Επεξεργασία προφίλ'}>
                <EditProfile
                    profile={currentProfile}
                    close={() => setEditMode(false)}
                />
            </Modal>


            <Modal open={newMsg} withContainer title='Νέο μήνυμα' btn close={() => setNewMsg(false)}>
                <NewMessageWindow receiver={currentProfile} close={() => setNewMsg(false)} />
            </Modal>

            <section style={{ display: 'flex' }}>


                {user?.user_id === currentProfile?.user?.id &&
                    <aside className={CSS.my_profiles_list} style={{ height: height - 55 }}>
                        <ul>
                            {my_profiles.map((profile: any) => (
                                <Link to={`/profile/${profile.profileId}`}
                                    key={profile.profileId}
                                    onClick={() => updateDOM()} >
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
                                    {user?.user_id === currentProfile?.user?.id ?
                                        <SvgIcon id='edit' color='#5b5b5b' onClick={() => setEditMode(true)} />

                                        :
                                        <SvgIcon id='messages' onClick={() => setNewMsg(!newMsg)} width={20}/>
                           
                                    }

                                </div>

                                <p className={CSS.bio}>{currentProfile?.bio}</p>
                                <div className='items-inline'>
                                    <SvgIcon id='location' />
                                    <p>{currentProfile?.city?.name}{currentProfile?.address && `, ${currentProfile.address}`} </p>

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
                        canEdit={currentProfile.user?.id === user?.user_id ? true : false}
                    />
                </section>


            </section>




        </div>

    )
}