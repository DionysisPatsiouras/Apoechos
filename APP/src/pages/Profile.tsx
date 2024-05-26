
import { useEffect, useState, useContext } from 'react'

import { Routes } from '../utils/Routes'
import Call from '../utils/Call'
import CSS from '../css/Profile/Profile.module.sass'
import AuthContext from '../context/AuthContext'
import Modal from '../components/Modal'
import EditMusician from '../components/Profile/EditMusician'
import Activity from '../components/Profile/Activity'
import Characteristics from '../components/Profile/Characteristics'
import { Colors } from '../App'
import SvgIcon from '../components/SvgIcon'

export default function Profile() {

    const [data, setData] = useState<any>([])
    const [modal, setModal] = useState<boolean>(false)
    let { user }: any = useContext(AuthContext)
    let [updateDOM, setUpdateDOM] = useState<boolean>(false)

    let [editMode, setEditMode] = useState<boolean>(false)

    let profile_id = window.location.pathname.replace('/profile/', '')

    const color = useContext<any>(Colors)


    useEffect(() => {

        const newCall = new Call(
            window.location.pathname.includes('MUSICIAN') ?
                Routes.musician.id(profile_id)
                :
                window.location.pathname.includes('STUDIO') ?
                    Routes.studio.id(profile_id)
                    :
                    window.location.pathname.includes('STORE') ?
                        Routes.store.id(profile_id)
                        :
                        window.location.pathname.includes('STAGE') ?
                            Routes.stage.id(profile_id)
                            : '/',
            'GET'
        )

        newCall
            .GET()
            .then((res: any) => {
                console.log(res)
                setData(res);
                // console.log(res)
            })
            .catch((err) => console.warn(err))

    }, [updateDOM])


    // console.log(data)


    const check_category = (category: string) => {

        switch (category) {
            case 'musician':
                return <EditMusician data={data} close={() => { setEditMode(false); setUpdateDOM(!updateDOM) }} />

            default:
                break;
        }
    }

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
                {check_category(data?.category)}
            </Modal>



            <section className={CSS.personal_info}>

                <div className={CSS.signature} style={{ backgroundColor: color?.[data?.category] }}>
                    <SvgIcon id={data?.category} style={{ margin: '5px  0 0 172px' }} color={'#fff'} />
                </div>

                <img
                    style={{ borderRadius: '0  100px 0 0' }}
                    src={`http://127.0.0.1:8000/${data?.photo}`}
                    alt='profile_photo'
                    width={150}
                    height={150}
                    onClick={() => setModal(!modal)} />

                <Characteristics
                    data={data}
                    canEdit={user?.user_id === data?.user ? true : false}
                    onClick={() => setEditMode(!editMode)}
                />

            </section>

            <hr></hr>

            <section className={CSS.right_section}>
                <Activity data={data} />
            </section>


        </div>
    )
}