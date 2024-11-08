import { forwardRef, useState, useContext } from 'react'
import { Link } from 'react-router-dom'

// CSS
import CSS from '../css/Post/Post.module.css'

// context
import ProfileContext from '../context/ProfileContext'

// utils
import Call from '../utils/Call'
import { Routes } from '../utils/Routes'
import { full_date } from '../utils/Shortcuts'

// components
import Modal from './Modal'
import UpdatePost from './UpdatePost'
import Confirmation from './Modal/Confirmation'
import SvgIcon from './SvgIcon'
import { useSnackbarContext } from '../context/SnackbarContext'
import ProfileImage from './ProfileImage'
import Loader from '../utils/Loader'

// This component may take up to 2 props
// 1) can_edit -> is used in "Profile" page to check if the user owns the posts array
// 2) all_posts -> is used on "Posts" page. In this case it returns any post array is provided with

interface AllPostsProps {
    can_edit?: boolean;
    all_posts?: {};
}

// const AllPosts = forwardRef(function AllPosts(props: any, ref: any) {
const AllPosts = forwardRef(function AllPosts({ can_edit, all_posts }: AllPostsProps, ref) {


    let { posts, updateDOM }: any = useContext(ProfileContext)
    let { snackbar }: any = useSnackbarContext()

    const [editModal, setEditModal] = useState<boolean>(false)
    const [deleteModal, setDeleteModal] = useState<boolean>(false)


    const [selectedPost, setSelectedPost] = useState<any>()


    let posts_array = all_posts ? all_posts : posts


    const delete_post = (post_id: string) => {
        const data = {
            deleted_at: new Date(),
            is_deleted: true
        }
        let patchPost = new Call(Routes.posts.update(post_id), 'PATCH', data)

        patchPost
            .PATCH()
            .then(() => {
                console.log('Post deleted successfully')
                updateDOM()
                setDeleteModal(false)
                snackbar('Η δημοσίευση διεγράφη')
            })
            .catch((err) => console.warn(err))
    }


    let all = new Loader(posts_array)


    const PostView = (post: any, with_icons: boolean) =>
        <section className={CSS.post_card}>

            <div className={CSS.top}>
                <div style={{ display: 'flex' }}>



                    <ProfileImage
                        photo={post?.profile?.photo}
                        category={post?.profile?.category}
                        size={100}
                    />


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
                {/* {with_icons && props?.can_edit && */}
                {with_icons && can_edit &&
                    <ul>
                        <li> <SvgIcon id='edit' color='#e2e2e2' width={18} height={18} onClick={() => { setEditModal(!editModal); setSelectedPost(post) }} /> </li>
                        <li> <SvgIcon id='delete' color='#e2e2e2' width={18} height={18} onClick={() => { setDeleteModal(!deleteModal); setSelectedPost(post) }} /></li>
                    </ul>
                }


            </div>

        </section>


    return (
        <div className={CSS.postsContainer}>
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
                
            {all.posts_load(

                <>

                    {posts_array
                        .map((post: any, index: number) =>
                            <div key={index} style={{ display: 'flex' }}>
                                {PostView(post, all_posts ? false : true)}
                            </div>
                        )}
                </>
            )}



        </div>


    )
})

export default AllPosts

