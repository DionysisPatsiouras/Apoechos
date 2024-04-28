import CSS from '../../css/Profile/Profile.module.sass'
import { useContext, useState, useEffect } from 'react'
import AuthContext from '../../context/AuthContext'
import Modal from '../Modal'
import EditMusician from './EditMusician'
import { Routes } from '../../utils/Routes'
import Call from '../../utils/Call'
import Activity from './Activity'
import SvgIcon from '../SvgIcon'

export default function Musician() {

    let { user }: any = useContext(AuthContext)

    const [modal, setModal] = useState<boolean>(false)
    const [editMode, setEditMode] = useState<boolean>(false)
    const [musician, setMusician] = useState<any>([])
    const [updateDOM, setUpdateDOM] = useState<boolean>(false)


    

    let getId = window.location.pathname.replace('/profile/musician/', '')
    const musician_by_id = new Call(Routes.musician.id(getId), 'GET')

    useEffect(() => {

        musician_by_id
            .GET()
            .then((res) => setMusician(res))
            .catch((err) => console.warn(err))

    }, [updateDOM])



    // console.warn(musician)
    // console.log('user', user)

    return (
        <div className={CSS.container}>

            <Modal open={modal} close={() => setModal(false)} closeButton={true}>
                <img src={`http://127.0.0.1:8000/${musician?.photo}`} />
            </Modal>

            <Modal open={editMode} close={() => setModal(false)}>
                <EditMusician data={musician} close={() => { setEditMode(false); setModal(false); setUpdateDOM(!updateDOM) }} />
            </Modal>

            <section className={CSS.personal_info}>
                <img src={`http://127.0.0.1:8000/${musician?.photo}`} width={150} height={150} onClick={() => setModal(!modal)} />

                {user?.user_id === musician?.user && !editMode &&
                    <button
                        className={CSS.edit_btn}
                        onClick={() => setEditMode(!editMode)}>
                        Επεξεργασία
                    </button>}



                <div className={CSS.info}>
                    <strong> {musician?.artistic_nickname}</strong>

                    <ul className={CSS.characteristics}>
                        <li><SvgIcon id='location' />{musician?.city}</li>

                        <li>
                            <SvgIcon id='location' />
                            {musician?.songs?.map((song: any, index: number) => (
                                <div key={index}>
                                    <div>{`${song?.name},`} </div>

                                </div>
                            ))}
                        </li>
                    </ul>
                    <p className={CSS.bio}>{musician?.bio}</p>
                </div>

            </section>


            <hr></hr>

            <Activity
                canEdit={musician.user === user?.user_id ? true : false}
                profile={musician} 
                />


        </div>
    )
}