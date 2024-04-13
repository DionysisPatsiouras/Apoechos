import CSS from '../../css/Profile/Profile.module.sass'
import { useContext, useState, useEffect } from 'react'
import AuthContext from '../../context/AuthContext'
import Modal from '../Modal'
import EditMusician from './EditMusician'
import axios from 'axios'
import { config } from '../../utils/Token'

export default function Musician() {

    let { user }: any = useContext(AuthContext)

    const [modal, setModal] = useState<boolean>(false)
    const [editMode, setEditMode] = useState<boolean>(false)
    const [musician, setMusician] = useState<any>([])
    let getId = window.location.pathname.replace('/profile/musician/', '')

    useEffect(() => {

        axios
            .get(`http://localhost:8000/profiles/musician/${getId}/`, config)
            .then((res) => setMusician(res.data))
    }, [])


   
    // console.log(musician)
  

    return (
        <div className={CSS.container}>

            <Modal open={modal} close={() => setModal(false)}>
                <img src={musician?.photo} />
            </Modal>

            <section className={CSS.personal_info}>
                <img src={musician?.photo} width={150} height={150} onClick={() => setModal(!modal)} />

      

                {editMode ?
                    <EditMusician data={musician} editMode={() => setEditMode(false)} />
                    :
                    <div className={CSS.info}>
                        <strong> {musician?.artistic_nickname}</strong>
                        <p>{musician?.bio}</p>
                        {user?.user_id === musician?.user && <button onClick={() => setEditMode(!editMode)}>Επεξεργασία</button>}
                    </div>
                }
            </section>


            <hr></hr>
            <section className={CSS.activity}>
                activity

            </section>



        </div>
    )
}