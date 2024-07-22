import { forwardRef, useEffect, useState, useContext } from 'react'
import Call from '../utils/Call'
import { Routes } from '../utils/Routes'
import CSS from '../css/Post/Post.module.css'
import { Link } from 'react-router-dom'
import SvgIcon from './SvgIcon'
import { full_date } from '../utils/Shortcuts'
import Modal from './Modal'
import Confirmation from './Modal/Confirmation'
import UpdatePost from './UpdatePost'
import ProfileContext from '../context/ProfileContext'

const AllPosts = forwardRef(function AllPosts(props: any, ref: any) {

    let { posts, updateDOM }: any = useContext(ProfileContext)

    const [editModal, setEditModal] = useState<boolean>(false)
    const [deleteModal, setDeleteModal] = useState<boolean>(false)


    const [selectedPost, setSelectedPost] = useState<any>()


    // console.warn(props)


    const delete_post = (post_id: string) => {
        const data = {
            deleted_at: new Date(),
            is_deleted: true
        }
        let patchPost = new Call(Routes.posts.update(post_id), 'PATCH', data)

        patchPost.PATCH()
            .then(() => {
                console.log('Post deleted successfully')
                updateDOM()
                setDeleteModal(false)
            })
            .catch((err) => console.warn(err))
    }




    const PostView = (post: any, with_icons: boolean) =>
        <section className={CSS.post_card}>

            <div className={CSS.top}>
                <div style={{ display: 'flex' }}>
                    <img
                        src={`http://127.0.0.1:8000/${post?.profile?.photo}`}
                        className={CSS.profile_photo}
                        width={100}
                        height={100}
                        alt='profile_image' />

                    <div className={CSS.category_container} style={{ backgroundColor: post?.profile?.category?.color }} >
                        <SvgIcon id={post?.profile?.category?.icon} color={'#fff'} width={20} />
                    </div>

                    <div className={CSS.content}>

                        <Link to={`/profile/${post?.profile?.profileId}`}>
                            <h3 style={{ display: 'flex', alignItems: 'center' }}>
                                {post?.profile?.name}

                            </h3>
                        </Link>

                        <p className={CSS.category}>{`"${post?.title?.title}"`}</p>
                        <p className={CSS.body}>{post?.body}</p>
                        <p className={CSS.date}><SvgIcon id='calendar' color='#BDBDBD' width={20} />{full_date(post?.created_at)}</p>

                    </div>

                </div>
                {with_icons && props?.can_edit &&
                    <ul>
                        <li> <SvgIcon id='edit' width={20} height={20} onClick={() => { setEditModal(!editModal); setSelectedPost(post) }} /> </li>
                        <li> <SvgIcon id='delete' onClick={() => { setDeleteModal(!deleteModal); setSelectedPost(post) }} /></li>
                    </ul>
                }


            </div>

        </section>


    return (
        <>
            <Modal open={deleteModal} close={() => setDeleteModal(false)} title='Διαγραφή Δημοσίευσης' btn>
                <Confirmation
                    cancel={() => setDeleteModal(false)}
                    confirm={() => delete_post(selectedPost?.post_id)}
                    text='Είστε σίγουρος πως θέλετε να διαγράψετε την παρακάτω δημοσιεύση;'
                    body={PostView(selectedPost, false)}
                />

            </Modal>

            <Modal open={editModal} close={() => { setEditModal(false) }} withContainer title='Επεξεργασία Δημοσίευσης' btn>
                <UpdatePost post={selectedPost} close={() => {
                    setSelectedPost(undefined);
                    setEditModal(false);
                    updateDOM()
                }} />
            </Modal>


            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '33vw', minWidth: '200px', maxWidth: '500px' }}>


                {posts
                    .map((post: any, index: number) =>
                        <div key={index} style={{ display: 'flex' }}>
                            {PostView(post, props?.all_posts ? false : true)}
                        </div>
                    )}
            </div>


        </>


    )
})

export default AllPosts

