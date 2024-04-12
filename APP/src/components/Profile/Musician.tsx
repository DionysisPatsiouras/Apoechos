import CSS from '../../css/Profile/Profile.module.sass'
import { useContext, useState } from 'react'
import AuthContext from '../../context/AuthContext'
import Modal from '../Modal'
import EditMusician from './EditMusician'


export default function Musician(props: any) {

    let { user }: any = useContext(AuthContext)

    const [modal, setModal] = useState<boolean>(false)
    const [editMode, setEditMode] = useState<boolean>(false)


    // console.log(props?.data)

    return (
        <div className={CSS.container}>

            <Modal open={modal} close={() => setModal(false)}>
                <img src={props?.data?.photo} />
            </Modal>

            <section className={CSS.personal_info}>
                <img src={props?.data?.photo} width={150} height={150} onClick={() => setModal(!modal)} />



                {editMode ?
                    <EditMusician data={props?.data} editMode={() => setEditMode(false)} />
                    :
                    <div className={CSS.info}>
                        <strong> {props?.data?.artistic_nickname}</strong>
                        <p>{props?.data?.bio}</p>
                        {user?.user_id === props?.data?.user && <button onClick={() => setEditMode(!editMode)}>Επεξεργασία</button>}
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