
import { useEffect, useState, useContext } from 'react'

import { Routes } from '../utils/Routes'
import Call from '../utils/Call'
import Modal from '../components/Modal'
import CSS from '../css/Profile/Profile.module.sass'
import AuthContext from '../context/AuthContext'
import SvgIcon from '../components/SvgIcon'
import Activity from '../components/Profile/Activity'

export default function Profile() {

    const [data, setData] = useState<any>([])
    const [modal, setModal] = useState<boolean>(false)
    let { user }: any = useContext(AuthContext)
    let [updateDOM, setUpdateDOM] = useState<boolean>(false)
    let [editMode, setEditMode] = useState<boolean>(false)

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
            .then((res: any) => { setData(res); console.log(res) })

    }, [updateDOM])







    return (
        <div className={CSS.container}>

            <Modal open={modal} close={() => setModal(false)} closeButton={true}>
                <img src={`http://127.0.0.1:8000/${data?.photo}`} />
            </Modal>

            <Modal open={editMode} close={() => setModal(false)}>
                {/* <EditMusician data={musician} close={() => { setEditMode(false); setModal(false); setUpdateDOM(!updateDOM) }} /> */}
                dsad
            </Modal>

            <section className={CSS.personal_info}>
                <img src={`http://127.0.0.1:8000/${data?.photo}`} width={150} height={150} onClick={() => setModal(!modal)} />

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

            <Activity
                canEdit={data.user === user?.user_id ? true : false}
                profile={data?.musicianId || data?.studioId}
                photo={data?.photo}
            />


        </div>
    )
}