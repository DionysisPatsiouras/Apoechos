import CSS from '../../css/Profile/Profile.module.sass'
import { useContext, useState, useEffect } from 'react'
import AuthContext from '../../context/AuthContext'
import Modal from '../Modal'
import EditMusician from './EditMusician'
import { Routes } from '../../utils/Routes'
import Call from '../../utils/Call'

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



    console.warn(musician)
    // console.log('user', user)

    return (
        <div className={CSS.container}>

            <Modal open={modal} close={() => setModal(false)}>
                <img
                    src={`http://127.0.0.1:8000/${musician?.photo}`}
                />


            </Modal>

            <section className={CSS.personal_info}>
                <img src={`http://127.0.0.1:8000/${musician?.photo}`} width={150} height={150} onClick={() => setModal(!modal)} />

                {user?.user_id === musician?.user_id && !editMode &&
                    <button
                        className={CSS.edit_btn}
                        onClick={() => setEditMode(!editMode)}>
                        Επεξεργασία
                    </button>}


                {editMode ?
                    <EditMusician data={musician} editMode={() => setEditMode(false)} updateDOM={() => setUpdateDOM(!updateDOM)} />
                    :
                    <div className={CSS.info}>
                        <strong> {musician?.artistic_nickname}</strong>
                        <p className={CSS.bio}>{musician?.bio}</p>
                        {/* {user?.user_id === musician?.user && <button onClick={() => setEditMode(!editMode)}>Επεξεργασία</button>} */}
                    </div>
                }
            </section>


            <hr></hr>
            <section className={CSS.activity}>
                activity
                {musician?.genres?.map((genre: string) => (
                    <div key={genre}>{genre}</div>
                ))}
            </section>



        </div>
    )
}