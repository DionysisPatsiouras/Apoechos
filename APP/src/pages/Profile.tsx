
import { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom'


// css
import CSS from '../css/Profile/Profile.module.sass'

// context
import AuthContext from '../context/AuthContext'
import ProfileContext from '../context/ProfileContext'

// components
import Modal from '../components/Modal'
import SvgIcon from '../components/SvgIcon'
import MyActivity from '../components/Activity/MyActivity'
import EditProfile from '../components/Profile/EditProfile'
import NewMessageWindow from '../components/Messages/NewMessageWindow'
import IconButton from '../components/IconButton'
import NewPost from '../components/Profile/NewPost'
import { useSnackbarContext } from '../context/SnackbarContext'
import NewEvent from '../components/Events/NewEvent'
import FullModal from '../components/FullModal'
import ProfileImage from '../components/ProfileImage'
import Loader from '../utils/Loader'
import FixedButton from '../components/FixedButton'

import { useNavigate } from "react-router-dom"
import { NewEventProvider } from '../context/NewEventContext'
import MyProfiles from '../components/Profile/MyProfiles'


export default function Profile() {


    let { user }: any = useContext(AuthContext)
    let { currentProfile, updateDOM, editMode, setEditMode }: any = useContext(ProfileContext)
    let { snackbar }: any = useSnackbarContext()

    const [height, setHeight] = useState<any>(undefined)
    const [width, setWidth] = useState<any>(undefined)

    const navigate = useNavigate()

    // let isDesktop = width >= 768
    // let threshold = width <= 1500
    let my_category = currentProfile?.category?.id
    let url = window.location.href;

    const [modal, setModal] = useState<boolean>(false)
    // const [fullBar, setFullBar] = useState<boolean>(false)
    const [newMsg, setNewMsg] = useState<boolean>(false)
    const [actions, setActions] = useState<boolean>(false)
    const [postModal, setPostModal] = useState<boolean>(false)
    const [eventModal, setEventModal] = useState<boolean>(false)



    let lists = [
        { id: 'studio_services', icon: 'studio', category: 3 },
        { id: 'instruments', icon: 'musician', category: 1 },
        { id: 'genres', icon: 'genres', category: 1 },
    ]


    let my_action = [
        {
            icon: 'add', text: 'Νέο Προφίλ', category: [1, 2, 3, 4, 5],
            onClick: () => { navigate('/create'); setActions(false) }
        },
        {
            icon: 'edit', text: 'Επεξεργασία', category: [1, 2, 3, 4, 5],
            onClick: () => { setEditMode(!editMode); setActions(false) }
        },
        {
            icon: 'url', text: 'Αντιγραφή URL', category: [1, 2, 3, 4, 5],
            onClick: () => { navigator.clipboard.writeText(url); setActions(false); snackbar('Ο σύνδεσμος αντιγράφηκε') }
        },
        {
            icon: 'post', text: 'Νέα δημοσίευση', category: [1, 2, 3, 4, 5],
            onClick: () => { setPostModal(true); setActions(false) }
        },
        {
            icon: 'new event', text: 'Νέα εκδήλωση', category: [1, 2, 5],
            onClick: () => { setEventModal(!eventModal); setActions(false) }
        },

    ]



    useEffect(() => {
        setWidth(window.innerWidth)
        window.addEventListener("resize", () => setWidth(window.innerWidth))
        // setFullBar(threshold ? false : true)
        document.title = 'Apoechos - Προφίλ'
    }, [width])

    useEffect(() => {
        setHeight(window.innerHeight)
        window.addEventListener("resize", () => setHeight(window.innerHeight))
    }, [height])


    let loading = new Loader(currentProfile)
    // console.log("🚀 ~ Profile ~ currentProfile:", currentProfile)

    return (


        <div className={CSS.container}>


            <FullModal open={eventModal} close={() => setEventModal(false)} title='Νέα εκδήλωση'>
                <NewEventProvider>
                    <NewEvent profileId={currentProfile?.profileId} closeModal={() => setEventModal(false)} />
                </NewEventProvider>

            </FullModal>

            <Modal open={modal} close={() => setModal(false)} closeButton>
                <img src={`${process.env.REACT_APP_API_URL}${currentProfile?.photo}`} alt='profile_photo' />
            </Modal>

            <FullModal open={editMode} title='Επεξεργασία προφίλ' close={() => setEditMode(false)}>
                <EditProfile profile={currentProfile} close={() => setEditMode(false)} />
            </FullModal>


            <Modal open={postModal} close={() => setPostModal(false)} withContainer title='Νέα δημοσίευση' btn>
                <NewPost category={currentProfile?.category} profile_id={currentProfile?.profileId}
                    close={() => {
                        updateDOM()
                        setPostModal(false)
                        snackbar('Επιτυχής δημοσίευση')
                    }} />
            </Modal>


            <Modal open={newMsg} withContainer title='Νέο μήνυμα' btn close={() => setNewMsg(false)}>
                <NewMessageWindow receiver={currentProfile} close={() => setNewMsg(false)} />
            </Modal>




            <section className={CSS.mainContainer}>

                {user?.user_id === currentProfile?.user?.id &&
                    <MyProfiles url='profile' />
                }

                <section className={CSS.right_content} >

                    <div className={CSS.profileInfo}>

                        <div style={{ padding: '40px 70px 20px 70px' }}>

                            <ProfileImage
                                photo={currentProfile?.photo}
                                category={currentProfile?.category}
                                onClick={() => setModal(!modal)}
                                size={180}
                            />



                            <div className='items-inline' style={{ justifyContent: 'center', width: '200px', margin: '0 auto' }}>
                                <strong>{loading.string_load(currentProfile.name)}</strong>
                            </div>




                            <div className='items-inline' style={{ justifyContent: 'center' }}>

                                <div className='column' style={{ alignItems: 'center', marginTop: '15px' }}>
                                    <b>{currentProfile?.city?.name} </b>
                                    {/* <p style={{ color: '#A4A4A4' }}>{currentProfile?.address && `${currentProfile.address}`}</p> */}
                                    <div style={{ width: '200%', color: '#A4A4A4' }}>{loading.string_load(currentProfile.address)}</div>
                                    <br></br>
                                    {user?.user_id !== currentProfile?.user?.id && <IconButton icon='send' onClick={() => setNewMsg(!newMsg)} />}

                                </div>
                            </div>

                        </div>

                        <div>
                            {currentProfile?.length !== 0 && lists.filter((list: any) => list.category === currentProfile?.category?.id).length !== 0 &&
                                <>

                                    <div style={{ padding: '20px', background: '#E9E9E9', display: 'flex', justifyContent: 'space-around' }}>
                                        {lists
                                            .filter((list: any) => list.category === currentProfile?.category?.id)
                                            .map((i: any, index: number) => (
                                                <SvgIcon key={index} id={i?.icon} style={{ minWidth: '24px', minHeight: '24px' }} color='#414141' />
                                            ))}
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-around', paddingTop: '20px' }}>


                                        {lists
                                            .filter((list: any) => list.category === currentProfile?.category?.id)
                                            .map((list: any, index: number) => (

                                                <div key={index} style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'column' }}>
                                                    {currentProfile?.[list.id]?.map((i: any, index: number) => (
                                                        <div key={index} style={{ margin: '0 3px 0 0', textAlign: 'left' }}>
                                                            {i?.name}
                                                        </div>
                                                    ))}
                                                </div>

                                            ))
                                        }
                                    </div>
                                </>
                            }

                        </div>
                    </div>

                </section>
                <MyActivity canEdit={currentProfile.user?.id === user?.user_id ? true : false} />

            </section>


            {/* FIXED BUTTONS */}
            {user?.user_id === currentProfile?.user?.id &&



                <section className={CSS.actionsButton}>

                    {actions &&
                        <ul className={CSS.actionsContainer}>
                            {my_action
                                .filter((action: any) => action.category.includes(my_category))
                                .map((action: any) => (
                                    <li className='items-inline' onClick={action.onClick} key={action.text}>
                                        <p className={`${CSS.label} shadow`}>{action.text}</p>
                                        <SvgIcon id={action.icon} color='#fff' />
                                    </li>
                                ))}
                        </ul>
                    }

                    <FixedButton icon='settings' onClick={() => setActions(!actions)} />

                </section>
            }


        </div>

    )
}