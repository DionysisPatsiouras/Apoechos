
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




    useEffect(() => {

        const get_profile = new Call(Routes.profiles.id(profile_id), 'GET')
        const my_profiles = new Call(Routes.profiles.my_profiles, 'GET')

        get_profile
            .GET()
            .then((res: any) => { setData(res) })
            .catch((err) => console.warn(err))

        my_profiles.GET()
        .then((res)=> console.log(res))

    }, [updateDOM])



    // console.warn(user)






    return (


        <div className={CSS.container}>


            <Modal open={modal} close={() => setModal(false)} closeButton={true}>
                <img src={`http://127.0.0.1:8000/${data?.photo}` || img} alt='profile_photo' />
            </Modal>

            <Modal
                open={editMode}
                close={() => { setEditMode(false); setUpdateDOM(!updateDOM) }}
                withContainer={true}
                title={'Επεξεργασία'}>
                {/* {check_category(data?.category)} */}

            </Modal>



            <section className={CSS.personal_info}>

                <div className={CSS.signature} style={{ backgroundColor: data?.category?.color }}>
                    <SvgIcon id={data?.category?.name.toLowerCase()} style={{ margin: '5px  0 0 172px' }} color={'#fff'} />
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
                {/* <Activity
                    id={profileId}
                    category={data?.category}
                    canEdit={data.user === user?.user_id ? true : false}
                /> */}
            </section>


        </div>

    )
}