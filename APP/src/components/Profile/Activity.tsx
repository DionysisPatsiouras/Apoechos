
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


    let data = props?.data
    // console.log(data)
    // console.log(props)

    return (


        <section >


            <Modal
                open={createNew}
                close={() => setCreateNew(false)}
                withContainer={true}
                title={
                    tab === 'posts' ? 'Νέα δημοσίευση' :
                        'Δημιουργία νέου event'
                }>
                {tab === 'posts' && <NewPost category={data?.category}
                    close={() => setCreateNew(false)}

                    profile_id={data?.musicianId || data?.studioId || data?.storeId || data?.stageId || data?.bandId} />}
                {tab === 'events' && <NewEvent />}

            </Modal>

            <ul className={CSS.wall_list}>

                <li className={tab === 'posts' ? CSS.active : undefined} onClick={() => setTab('posts')}>posts</li>
                {data?.category === 'musician' &&
                    <li className={tab === 'events' ? CSS.active : undefined} onClick={() => setTab('events')}>Events</li>}
            </ul>



            {tab === 'posts' &&
                <>
                    <All_Posts
                        canEdit={data.user === user?.user_id ? true : false}
                        photo={data?.photo}
                        data={data}
                    />

                    <button onClick={() => setCreateNew(true)}>new post</button>
                </>
            }
            {

                tab === 'events' &&

                <p onClick={() => setCreateNew(true)}>new event</p>


            }




        </section>




    )
}