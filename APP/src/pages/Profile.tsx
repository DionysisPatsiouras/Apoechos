
import { useEffect, useState, useContext } from 'react'

import { Routes } from '../utils/Routes'
import Call from '../utils/Call'
import Modal from '../components/Modal'
import CSS from '../css/Profile/Profile.module.sass'
import AuthContext from '../context/AuthContext'
import SvgIcon from '../components/SvgIcon'
import Activity from '../components/Profile/Activity'
import EditMusician from '../components/Profile/EditMusician'
import NewEvent from '../components/Profile/NewEvent'

export default function Profile() {

    const [data, setData] = useState<any>([])
    const [modal, setModal] = useState<boolean>(false)
    let { user }: any = useContext(AuthContext)
    let [updateDOM, setUpdateDOM] = useState<boolean>(false)
    let [editMode, setEditMode] = useState<boolean>(false)
    let [newEvent, setNewEvent] = useState<boolean>(false)
    let [tab, setTab] = useState<string>('posts')

    let profile_id = window.location.pathname.replace('/profile/', '')


    useEffect(() => {

        const newCall = new Call(
            window.location.pathname.includes('MUSICIAN') ?
                Routes.musician.id(profile_id)
                :
                window.location.pathname.includes('STUDIO') ?
                    Routes.studio.id(profile_id)
                    : '/',
            'GET'
        )


        newCall
            .GET()
            .then((res: any) => {
                setData(res);
                // console.log(res)

            })

    }, [updateDOM])





    return (
        <div className={CSS.container}>

            <Modal open={modal} close={() => setModal(false)} closeButton={true}>
                <img src={`http://127.0.0.1:8000/${data?.photo}`} alt='profile_photo' />
            </Modal>

            <Modal
                open={editMode}
                close={() => { setEditMode(false); setUpdateDOM(!updateDOM) }}
                withContainer={true}
                title={'Επεξεργασία'}>
                {data?.category === 'musician' &&
                    <EditMusician data={data} close={() => { setEditMode(false); setUpdateDOM(!updateDOM) }} />
                }
            </Modal>

            <Modal open={newEvent} close={() => setNewEvent(false)} withContainer={true} title={'Δημιουργία νέου event'}>
                <NewEvent />

            </Modal>

            <section className={CSS.personal_info}>
                <img src={`http://127.0.0.1:8000/${data?.photo}`} alt='profile_photo' width={150} height={150} onClick={() => setModal(!modal)} />

                {user?.user_id === data?.user && !editMode &&
                    <button
                        className={CSS.edit_btn}
                        onClick={() => setEditMode(!editMode)}>
                        Επεξεργασία
                    </button>}



                <div className={CSS.info}>
                    <strong> {data?.artistic_nickname}</strong>

                    <ul className={CSS.characteristics}>
                        <li><SvgIcon id='location' />{data?.city}</li>
                        {/* 
                        <li>
                            <SvgIcon id='location' />
                            {data?.songs?.map((song: any, index: number) => (
                                <div key={index}>
                                    <div>{`${song?.name},`} </div>

                                </div>
                            ))}
                        </li> */}
                    </ul>
                    <p className={CSS.bio}>{data?.bio}</p>
                </div>

            </section>


            <hr></hr>

            <section className={CSS.right_section}>


                <ul className={CSS.wall_list}>
                    <li className={tab === 'posts' ? CSS.active : undefined} onClick={() => setTab('posts')}>Δημοσιεύσεις</li>
                    <li className={tab === 'events' ? CSS.active : undefined} onClick={() => setTab('events')}>Events</li>
                </ul>

                <div>
                    {tab === 'posts' &&
                        <Activity
                            canEdit={data.user === user?.user_id ? true : false}
                            photo={data?.photo}
                            data={data}
                        />
                    }
                </div>


            </section>



        </div>
    )
}