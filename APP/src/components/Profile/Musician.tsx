import CSS from '../../css/Profile/Profile.module.sass'
import { useContext, useState } from 'react'
import AuthContext from '../../context/AuthContext'
import Modal from '../Modal'

export default function Musician(props: any) {

    let { user }: any = useContext(AuthContext)

    const [modal, setModal] = useState<boolean>(false)


    return (
        <div className={CSS.container}>

            <Modal open={modal} close={() => setModal(false)}>
                <img src={props?.data?.photo} />
            </Modal>

            <section className={CSS.header}>
                <img src={props?.data?.photo} width={150} height={150} onClick={() => setModal(!modal)} />

                <div className={CSS.info}>


                    <strong> {props?.data?.artistic_nickname}</strong>

                    {user?.user_id === props?.data?.user &&


                        <button>Επεξεργασία</button>
                    }
                </div>
            </section>



        </div>
    )
}