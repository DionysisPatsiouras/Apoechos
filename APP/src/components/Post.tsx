
import { forwardRef, useState } from 'react'
import CSS from '../css/Post/Post.module.css'
import SvgIcon from './SvgIcon'
import Modal from './Modal'
import Confirmation from './Modal/Confirmation'
import { full_date } from '../utils/Shortcuts'
import { Routes } from '../utils/Routes'
import Call from '../utils/Call'
import UpdatePost from './UpdatePost'

// props -> data, canEdit, photo

const Post = forwardRef(function Post(props: any, ref: any) {

    let post = props?.data
    const [edit, setEdit] = useState<boolean>(false)
    const [deletePost, setDelete] = useState<boolean>(false)
    const [modal, setModal] = useState<boolean>(false)
    const [patchPost, setPatchPost] = useState<boolean>(false)

    const pinPost = (post_id: string) => {
        const data = {
            updated_at: new Date(),
            is_pinned: post?.is_pinned ? false : true
        }
        let patchPost = new Call(Routes.posts.post_id(post_id), 'PATCH', data)

        patchPost.PATCH()
            .then((res) =>
            // console.log(res)
            {
                props?.updateDOM();
                setEdit(false);
                setModal(false)
            }
            )
            .catch((err) => console.warn(err))

    }

    const delete_post = (post_id: string) => {
        const data = {
            deleted_at: new Date(),
            is_deleted: true
        }
        let patchPost = new Call(Routes.posts.post_id(post_id), 'PATCH', data)

        patchPost.PATCH()
            .then((res) =>
            // console.log(res)
            {
                props?.updateDOM();
                setEdit(false);
                setModal(false)
            }
            )
            .catch((err) => console.warn(err))
    }


    const PostView = (with_edit_icon: boolean) =>
        <section className={CSS.post_card}>
            <div className={CSS.top}>
                <div style={{ display: 'flex' }}>
                    <img src={props?.photo} width={100} alt='profile_image' />
                    <div className={CSS.content}>
                        <h3 style={{ display: 'flex', alignItems: 'center' }}>
                            {props?.profile}
                            {post?.is_pinned && <SvgIcon id={'pinned'} color='#D2A35B' />}
                        </h3>
                        <p className={CSS.category}>{`"${post?.category}"`}</p>
                        <p className={CSS.body}>{post?.body}</p>
                        <p className={CSS.date}>{full_date(post?.created_at)}</p>
                    </div>
                </div>
                {with_edit_icon && props?.canEdit && <SvgIcon id={'expand'} width={20} height={20} onClick={() => setEdit(!edit)} />}
            </div>
        </section>

// console.log(props)


    return (
        <div style={{ display: 'flex', marginLeft: '7px' }}>


            <Modal
                open={patchPost}
                close={() => setPatchPost(false)}
                withContainer={true}
                title={'Επεξεργασία δημοσίευσης'}>
                <UpdatePost
                    category={props?.category}
                    body={post?.body}
                    value={post.category}
                    post_id={props?.data?.post_id}
                    close={() => {setPatchPost(false); props?.updateDOM()}}
                />
            </Modal>

            <Modal open={modal} close={() => setEdit(false)}>

                <Confirmation
                    cancel={() => setModal(false)}
                    confirm={() => deletePost ? delete_post(post?.post_id) : pinPost(post?.post_id)}
                    // icon={'delete'}
                    text={
                        deletePost ? `Είστε σίγουρος πως θέλετε να διαγράψετε την παρακάτω δημοσιεύση;
                        ΠΡΟΣΟΧΗ!
                Δεν θα μπορέσετε να αναιρέσετε αυτή την ενέργεια` :
                            `Είστε σίγουρος πως θέλετε να καρφιτσώσετε την παρακάτω δημοσιεύση;
                Μπορείτε να αναιρέσετε αυτή την ενέργεια οποιαδήποτε στιγμη.`
                    }
                    body={PostView(false)}
                />


            </Modal>

            {PostView(props?.canEdit ? true : false)}



            <ul className={CSS.edit_menu} style={{ visibility: edit ? 'visible' : 'hidden' }}>
                <li onClick={() => { setEdit(false); setPatchPost(true) }}>
                    <SvgIcon id={'edit'} color='#5F69C6' />
                </li>
                <li onClick={() => { setModal(true); setEdit(false) }}>
                    <SvgIcon id={post?.is_pinned ? 'pinned' : 'pinned'} color={post?.is_pinned ? '#000' : '#D2A35B'} />
                </li>
                <li onClick={() => { setModal(true); setEdit(false); setDelete(true) }} >
                    <SvgIcon id={'delete'} color='#C65F5F' />
                </li>
            </ul>

        </div>
    );
});

export default Post