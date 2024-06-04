
import { useState, useContext, useEffect } from 'react'

import Modal from '../Modal'
import CSS from '../../css/Profile/Profile.module.sass'
import AuthContext from '../../context/AuthContext'
import All_Posts from './All_Posts'
import NewEvent from './NewEvent'
import NewPost from './NewPost'
import Post from '../Post'


// utils
import { Routes } from '../../utils/Routes'
import Call from '../../utils/Call'


export default function Activity(props: any) {

    let { user }: any = useContext(AuthContext)


    const [data, setData] = useState<any>()
    const [posts, setPosts] = useState<any>([])
    let [tab, setTab] = useState<string>('posts')

    let [createNew, setCreateNew] = useState<boolean>(false)
    let [modalTitle, setModalTitle] = useState<string>('')
    // let data = props?.data


    const new_entry = (title: string) => {
        setCreateNew(true)
        setModalTitle(title)
    }
    // @ts-ignore





    useEffect(() => {

        const newCall = new Call(
            window.location.pathname.includes('MUSICIAN') ?
                Routes.musician.id(props?.id)
                :
                window.location.pathname.includes('STUDIO') ?
                    Routes.studio.id(props?.id)
                    :
                    window.location.pathname.includes('STORE') ?
                        Routes.store.id(props?.id)
                        :
                        window.location.pathname.includes('STAGE') ?
                            Routes.stage.id(props?.id)
                            : '/',
            'GET'
        )

        newCall
            .GET()
            .then((res: any) => { setData(res) })
            .catch((err) => console.warn(err))


        const posts_by_id = new Call(Routes.posts.profile_id(props?.id), 'GET')

        posts_by_id
            .GET()
            .then((res) => setPosts(res))
            .catch((err) => console.warn(err))

    }, [props, createNew])

    // console.warn(data)




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
                    <NewPost category={data?.category} close={() => setCreateNew(false)} profile_id={props?.id} />}

                {modalTitle === 'Νέα Εκδήλωση' && <NewEvent />}

            </Modal>


            <ul className={CSS.wall_list}>
                <li className={tab === 'posts' ? CSS.active : undefined} onClick={() => setTab('posts')}>Δημοσιεύσεις</li>
                {props?.category === 'musician' &&
                    <li className={tab === 'events' ? CSS.active : undefined} onClick={() => setTab('events')}>Εκδηλώσεις</li>}
            </ul>



            {/* {tab === 'posts' &&
                <All_Posts
                    photo={props?.photo}
                    canEdit={props?.canEdit}
                    category={props?.category}
                    profile_id={props?.profile_id}
                    profile_name={props?.profile_name}
                />
            } */}
            {tab === 'posts' &&
                <section style={{ height: '72vh', overflowY: 'auto', padding: '0 20px 0 0' }}>
                    <div style={{margin: '6px 0 0 5px', display: 'flex', flexDirection: 'column', gap: '15px'}}>


                        {
                            posts
                                .sort((a: any, b: any) => new Date(b.created_at) > new Date(a.created_at) ? 1 : -1)
                                .map((post: any, index: number) => (
                                    <Post key={index} data={post} canEdit={data.user === user?.user_id ? true : false} />
                                ))
                        }
                    </div>
                </section>
            }




        </section>




    )
}