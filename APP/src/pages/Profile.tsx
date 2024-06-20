
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
import { Link } from 'react-router-dom'
export default function Profile() {

    const [data, setData] = useState<any>([])
    const [modal, setModal] = useState<boolean>(false)
    let { user }: any = useContext(AuthContext)
    let [updateDOM, setUpdateDOM] = useState<boolean>(false)

    let [editMode, setEditMode] = useState<boolean>(false)

    let profile_id = window.location.pathname.replace('/profile/', '')

    // console.log(window.location)


    const [my_profiles, setMyProfiles] = useState<any>([])

    const get_profile = new Call(Routes.profiles.id(profile_id), 'GET')
    const get_my_profiles = new Call(Routes.profiles.my_profiles, 'GET')

    const getProfile = () => {

        get_profile
            .GET()
            .then((res: any) => {
                setData(res);
                setUpdateDOM(!updateDOM)
            })
            .catch((err) => console.warn(err))
    }

    const getMyProfiles = () => {

        get_my_profiles.GET()
            .then((res) => {
                // setUpdateDOM(!updateDOM)
                setMyProfiles(res[1]);

            })
    }
    useEffect(() => {
        getProfile()
        getMyProfiles()

    }, [profile_id])



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


            {user?.user_id === data?.user &&
                <aside className={CSS.my_profiles_list}>
                    <ul>
                        {my_profiles.map((profile: any) => (
                            <Link to={`/profile/${profile.profileId}`} key={profile.profileId}>
                                <li
                                    className='items-inline'
                                    style={{
                                        backgroundColor: profile.profileId === data?.profileId ? profile?.category?.color : 'unset',
                                        color: profile.profileId === data?.profileId ? '#fff' : '#646464',
                                        justifyContent: 'space-between'
                                    }}
                                >
                                    {profile.name}
                                    <SvgIcon id={profile.category.name.toLocaleLowerCase()}
                                        color={ profile.profileId === data?.profileId ? '#fff' : '#646464'}
                                    />
                                </li>
                            </Link>
                        ))}

                        <Link to='/create/'>

                            <li className='items-inline' style={{ justifyContent: 'space-between' }}>
                                Νέο Προφίλ
                                <SvgIcon id='add' color='#646464' />
                            </li>
                        </Link>
                    </ul>
                </aside>

            }

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
                <Activity
                    id={data?.profileId}
                    category={data?.category?.name}
                    canEdit={data.user === user?.user_id ? true : false}
                />
            </section>


        </div>

    )
}