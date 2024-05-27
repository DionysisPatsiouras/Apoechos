
import { useEffect, useState, useContext } from 'react'
import img from '../utils/img/default_img.png'

// css
import CSS from '../css/Profile/Profile.module.sass'

// context
import AuthContext from '../context/AuthContext'
import { Colors } from '../App'

// utils
import { Routes } from '../utils/Routes'
import Call from '../utils/Call'

// components
import Modal from '../components/Modal'
import SvgIcon from '../components/SvgIcon'
import Activity from '../components/Profile/Activity'
import EditMusician from '../components/Profile/EditMusician'
import Characteristics from '../components/Profile/Characteristics'





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
            .then((res: any) => { setData(res) })
            .catch((err) => console.warn(err))

    }, [updateDOM])


    // console.warn(data)


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
                <img src={img || `http://127.0.0.1:8000/${data?.photo}`} alt='profile_photo' />
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
                    src={data?.photo !== null ? `http://127.0.0.1:8000/${data.photo}` : img}
                    alt='profile_photo'
                    className={CSS.profile_photo}
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
                <Activity
                    photo={data?.photo}
                    category={data?.category}
                    canEdit={data.user === user?.user_id ? true : false}
                    profile_name={data?.artistic_nickname || data?.title}
                    profile_id={data?.musicianId || data?.studioId || data?.storeId || data?.stageId || data?.bandId}

                />
            </section>


        </div>

    )
}