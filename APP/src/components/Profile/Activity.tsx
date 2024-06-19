
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
import AllPosts from '../AllPosts'


export default function Activity(props: any) {

    let { user }: any = useContext(AuthContext)


    const [profile, setProfile] = useState<any>()
    const [posts, setPosts] = useState<any>([])
    let [tab, setTab] = useState<string>('posts')

    let [createNew, setCreateNew] = useState<boolean>(false)
    let [updateDOM, setUpdateDOM] = useState<boolean>(false)
    let [modalTitle, setModalTitle] = useState<string>('')
    // let data = props?.data



    const new_entry = (title: string) => {
        setCreateNew(true)
        setModalTitle(title)
    }

    const get_profile = new Call(Routes.profiles.id(props?.id), 'GET')


    useEffect(() => {

        const posts_by_id = new Call(Routes.posts.profile_id(props?.id), 'GET')

        get_profile
            .GET()
            .then((res: any) => {
                setProfile(res);
                setUpdateDOM(!updateDOM)
            })
            .catch((err) => console.warn(err))

        posts_by_id
            .GET()
            .then((res) => setPosts(res))
            .catch((err) => console.warn(err))

    }, [props])

    let my_posts = posts?.[1]

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
            
            {/* <AllPosts id={profileId}/> */}
            <AllPosts id={profile?.profileId} with_edit_icon={true}/>

{/* 
            {tab === 'posts' &&
                <section style={{ height: '72vh', overflowY: 'auto', padding: '0 20px 0 0' }}>
                    <div style={{ margin: '6px 0 0 5px', display: 'flex', flexDirection: 'column', gap: '15px' }}>

                        {
                            my_posts && my_posts
                                .sort((a: any, b: any) => new Date(b.created_at) > new Date(a.created_at) ? 1 : -1)
                                .map((post: any, index: number) => (
                                    <Post
                                        key={index}
                                        data={post}
                                        profile={profile}
                                        canEdit={profile.user === user?.user_id ? true : false}
                                        updateDOM={() => setUpdateDOM(!updateDOM)}
                                    />
                                ))
                        }
                    </div>
                </section>
            } */}




        </section>




    )
}