
import { useState, useEffect } from 'react'

import Modal from '../Modal'
import CSS from '../../css/Profile/Profile.module.sass'
// import AuthContext from '../../context/AuthContext'

import NewEvent from './NewEvent'
import NewPost from './NewPost'



// utils
import { Routes } from '../../utils/Routes'
import Call from '../../utils/Call'
import AllPosts from '../AllPosts'


export default function Activity(props: any) {


    const [profile, setProfile] = useState<any>()

    let [tab, setTab] = useState<string>('posts')

    let [createNew, setCreateNew] = useState<boolean>(false)
    let [updateDOM, setUpdateDOM] = useState<boolean>(false)
    let [modalTitle, setModalTitle] = useState<string>('')


    const new_entry = (title: string) => {
        setCreateNew(true)
        setModalTitle(title)
    }

    const get_profile = new Call(Routes.profiles.id(props?.id), 'GET')


    useEffect(() => {

        get_profile
            .GET()
            .then((res: any) => {
                setProfile(res);
                setUpdateDOM(!updateDOM)
            })
            .catch((err) => console.warn(err))


    }, [props])


    // console.log(props)

    return (


        <section >
            {/* FIXED BUTTONS */}
            {props?.canEdit &&
                <div className={CSS.create_new}>
                    <p onClick={() => new_entry('Νέα Δημοσίευση')}>+ Νέα δημοσίευση</p>
                    <p onClick={() => new_entry('Νέα Εκδήλωση')}>+ Νέα εκδήλωση</p>
                </div>
            }


            {/* CREATE NEW SECTION */}
            <Modal
                open={createNew}
                close={() => setCreateNew(false)}
                withContainer={true}
                title={modalTitle}>
                {modalTitle === 'Νέα Δημοσίευση' &&
                    <NewPost category={profile?.category} close={() => setCreateNew(false)} profile_id={props?.id} />}

                {modalTitle === 'Νέα Εκδήλωση' && <NewEvent />}

            </Modal>


            <ul className={CSS.wall_list}>
                <li className={tab === 'posts' ? CSS.active : undefined} onClick={() => setTab('posts')}>Δημοσιεύσεις</li>
                {props?.category === 'musician' &&
                    <li className={tab === 'events' ? CSS.active : undefined} onClick={() => setTab('events')}>Εκδηλώσεις</li>}
            </ul>


            <AllPosts id={profile?.profileId} can_edit={props?.canEdit} updateDOM={() => setUpdateDOM(!updateDOM)} />



        </section>




    )
}