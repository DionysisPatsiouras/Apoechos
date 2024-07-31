
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
import IconButton from '../components/IconButton'

export default function Profile() {

    let { user }: any = useContext(AuthContext)
    let {
        my_profiles,
        currentProfile,
        updateDOM,
        editMode, setEditMode }: any = useContext(ProfileContext)


    const [height, setHeight] = useState<any>(undefined)
    const [width, setWidth] = useState<any>(undefined)

    let isMobile = width >= 768
    let threshold = width <= 1500


    const [modal, setModal] = useState<boolean>(false)
    const [fullBar, setFullBar] = useState<boolean>(false)
    const [newMsg, setNewMsg] = useState<boolean>(false)



    let lists = [
        { id: 'studio_services', icon: 'studio', category: 3 },
        { id: 'instruments', icon: 'musician', category: 1 },
        { id: 'genres', icon: 'genres', category: 1 },
    ]



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


    return (


        <div className={CSS.container}>


            <Modal open={modal} close={() => setModal(false)} closeButton={true}>
                <img src={`http://127.0.0.1:8000/${currentProfile?.photo}` || img} alt='profile_photo' />
            </Modal>

            {/* <Modal
                open={editMode}
                withContainer={true}
                title={'Επεξεργασία προφίλ'}>
                <EditProfile
                    profile={currentProfile}
                    close={() => setEditMode(false)}
                />
            </Modal> */}


             <Modal open={newMsg} withContainer title='Νέο μήνυμα' btn close={() => setNewMsg(false)}>
                <NewMessageWindow receiver={currentProfile} close={() => setNewMsg(false)} />
            </Modal> 

            <section className={CSS.mainContainer}>


                {user?.user_id === currentProfile?.user?.id &&
                    <aside className={CSS.my_profiles_list}
                        style={{
                            height: isMobile ? height - 55 : '100%',
                            width: fullBar && isMobile ? '320px' : '82px'
                        }}>


                        <ul className={CSS.myProfilesContainer} style={{ width: isMobile ? 'auto' : '100vw' }}>
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
                                        <div className='items-inline' style={{ gap: '10px' }}>
                                            <img src={`http://127.0.0.1:8000/${profile.photo}`} className='circle_img' width={10} />
                                            {fullBar && <p className={CSS.profileName}>{profile.name}</p>}
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

                                <li className='items-inline' style={{ justifyContent: 'space-between' }}>
                                    {fullBar && 'Νέο Προφίλ'}
                                    <SvgIcon id='add' color='#646464'/>
                                </li>
                            </Link>
                        </ul>
                        <div className={CSS.toggleIcon}>
                            <SvgIcon id='burger' onClick={() => setFullBar(!fullBar)} width={20} />
                        </div>

                    </aside>

                }




                <section className={CSS.right_content} >
                    {/* <div className={CSS.profileInfo}> */}
                    <div className={CSS.profileInfo}>

                        {/* <div style={{ display: 'flex', gap: '20px' }}> */}
                        <div>
                            {/* <div className={CSS.signature} style={{ backgroundColor: currentProfile?.category?.color }}>
                                <SvgIcon id={currentProfile?.category?.icon} style={{ margin: '5px  0 0 172px' }} color={'#fff'} />
                            </div> */}

                            <img
                                src={`http://127.0.0.1:8000/${currentProfile.photo}`}
                                alt='currentProfile'
                                className={CSS.profile_photo}
                                width={150}
                                height={150}
                                onClick={() => setModal(!modal)} />
                            {/* <div className={CSS.signature} style={{ backgroundColor: currentProfile?.category?.color }}> */}
                            <SvgIcon id={currentProfile?.category?.icon}
                                style={{
                                    padding: '10px',
                                    borderRadius: '200px',
                                    marginLeft: '-55px',
                                    backgroundColor: currentProfile?.category?.color
                                }}
                                color='#fff' width={20} height={20} />
                            {/* </div> */}

                            <div>
                                <div className='items-inline' style={{ justifyContent: 'center' }}>
                                    <strong> {currentProfile?.name} </strong>


                                </div>

                                {/* <p className={CSS.bio}>{currentProfile?.bio}</p> */}
                                <div className='items-inline' style={{ justifyContent: 'center' }}>

                                    <div className='column' style={{ alignItems: 'center', marginTop: '15px' }}>
                                        <b>{currentProfile?.city?.name} </b>
                                        <p style={{ color: '#A4A4A4' }}>{currentProfile?.address && `${currentProfile.address}`}</p>
                                        <br></br>
                                        {user?.user_id === currentProfile?.user?.id
                                            ?
                                            <IconButton icon='edit' onClick={() => setEditMode(true)} />
                                            :
                                            <IconButton icon='messages' onClick={() => setNewMsg(!newMsg)} />
                                        }

                                    </div>
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

                </section>
                <Activity
                    canEdit={currentProfile.user?.id === user?.user_id ? true : false}
                />

            </section>




        </div>

    )
}