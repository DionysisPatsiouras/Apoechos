import CSS from '../../css/Profile/Profile.module.sass'
import { useContext, useState, useEffect } from 'react'
import AuthContext from '../../context/AuthContext'
import Modal from '../Modal'
import EditMusician from './EditMusician'
import { Routes } from '../../utils/Routes'
import Call from '../../utils/Call'
import Activity from './Activity'

export default function Studio() {

    let { user }: any = useContext(AuthContext)

    const [modal, setModal] = useState<boolean>(false)
    const [editMode, setEditMode] = useState<boolean>(false)
    const [studio, setStudio] = useState<any>([])
    const [updateDOM, setUpdateDOM] = useState<boolean>(false)



    let getId = window.location.pathname.replace('/profile/studio/', '')
    const studio_by_id = new Call(Routes.studio.id(getId), 'GET')

    useEffect(() => {

        studio_by_id
            .GET()
            .then((res) => { setStudio(res); console.warn(res) })
            .catch((err) => console.warn(err))

    }, [updateDOM])



    console.warn(studio)
    // console.log('user', user)

    return (
        <div className={CSS.container}>

            <Modal open={modal} close={() => setModal(false)}>
                <img src={`http://127.0.0.1:8000/${studio?.photo}`} />

            </Modal>

            <section className={CSS.personal_info}>
                <img src={`http://127.0.0.1:8000/${studio?.photo}`} width={150} height={150} onClick={() => setModal(!modal)} />

                {user?.user_id === studio?.user_id && !editMode &&
                    <button
                        className={CSS.edit_btn}
                        onClick={() => setEditMode(!editMode)}>
                        Επεξεργασία
                    </button>}


                {editMode ?
                    <EditMusician data={studio} editMode={() => setEditMode(false)} updateDOM={() => setUpdateDOM(!updateDOM)} />
                    :
                    <div className={CSS.info}>
                        <strong> {studio?.title}</strong>
                        <p className={CSS.bio}>{studio?.city}<br></br> {studio?.address}</p>
                        {/* {user?.user_id === musician?.user && <button onClick={() => setEditMode(!editMode)}>Επεξεργασία</button>} */}
                    </div>
                }
            </section>


            <hr></hr>

            <Activity />


        </div>
    )
}