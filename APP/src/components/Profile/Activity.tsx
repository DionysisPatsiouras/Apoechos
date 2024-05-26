
import { useState, useContext } from 'react'

import Modal from '../Modal'
import CSS from '../../css/Profile/Profile.module.sass'
import AuthContext from '../../context/AuthContext'
import All_Posts from './All_Posts'
import NewEvent from './NewEvent'
import NewPost from './NewPost'


export default function Activity(props: any) {

    let { user }: any = useContext(AuthContext)

    let [tab, setTab] = useState<string>('posts')

    let [createNew, setCreateNew] = useState<boolean>(false)
    let [modalTitle, setModalTitle] = useState<string>('')


    let data = props?.data
    // console.log(data)
    // console.log(props)

    const new_entry = (title: string) => {
        setCreateNew(true)
        setModalTitle(title)
    }

    return (


        <section >

            <div className={CSS.create_new}>
                <p onClick={() => new_entry('Νέα Δημοσίευση')}>+ Νέα δημοσίευση</p>
                <p onClick={() => new_entry('Νέα Εκδήλωση')}>+ Νέα εκδήλωση</p>
            </div>

            <Modal
                open={createNew}
                close={() => setCreateNew(false)}
                withContainer={true}
                title={modalTitle}>
                {modalTitle === 'Νέα Δημοσίευση' && <NewPost category={data?.category}
                    close={() => setCreateNew(false)}
                    profile_id={data?.musicianId || data?.studioId || data?.storeId || data?.stageId || data?.bandId} />}
                {modalTitle === 'Νέα Εκδήλωση' && <NewEvent />}

            </Modal>

            <ul className={CSS.wall_list}>

                <li className={tab === 'posts' ? CSS.active : undefined} onClick={() => setTab('posts')}>Δημοσιεύσεις</li>
                {data?.category === 'musician' &&
                    <li className={tab === 'events' ? CSS.active : undefined} onClick={() => setTab('events')}>Εκδηλώσεις</li>}
            </ul>



            {tab === 'posts' &&
                <>
                    <All_Posts
                        canEdit={data.user === user?.user_id ? true : false}
                        photo={data?.photo}
                        data={data}
                    />

                    {/* <button onClick={() => setCreateNew(true)}>new post</button> */}
                </>
            }
       



        </section>




    )
}