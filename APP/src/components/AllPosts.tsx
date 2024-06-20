import { forwardRef, useEffect, useState } from 'react'
import Call from '../utils/Call'
import { Routes } from '../utils/Routes'
import CSS from '../css/Post/Post.module.css'
import { Link } from 'react-router-dom'
import SvgIcon from './SvgIcon'
import { full_date } from '../utils/Shortcuts'

const AllPosts = forwardRef(function AllPosts(props: any, ref: any) {

    const posts_by_id = new Call(Routes.posts.profile_id(props?.id), 'GET')

    const [post, setPost] = useState<any[]>([])


    useEffect(() => {

        props?.id && posts_by_id.GET().then((res) => setPost(res?.[1])).catch((err) => console.warn(err))
        props?.all_posts && setPost(props?.all_posts)

    }, [props])

    // console.log(post)

    return (
        <>

            {post.map((i: any, index: number) => (
                <section className={CSS.post_card} key={index}>
                    <div className={CSS.top}>
                        <div style={{ display: 'flex' }}>
                            <img
                                src={`http://127.0.0.1:8000/${i?.profile?.photo}`}
                                className={CSS.profile_photo}
                                width={100}
                                alt='profile_image' />

                            <div className={CSS.category_container} style={{ backgroundColor: i?.profile?.category?.color }} >
                                <SvgIcon id={i?.profile?.category?.name.toLocaleLowerCase()} color={'#fff'} width={20} />
                            </div>

                            <div className={CSS.content}>

                                <Link to={`/profile/${i?.profile?.profileId}`}>
                                    <h3 style={{ display: 'flex', alignItems: 'center' }}>
                                        {i?.profile?.name}
                                        {/* {post?.is_pinned && <SvgIcon id={'pinned'} color='#D2A35B' />} */}
                                    </h3>
                                </Link>

                                <p className={CSS.category}>{`"${i?.title?.title}"`}</p>
                                <p className={CSS.body}>{i?.body}</p>
                                <p className={CSS.date}><SvgIcon id='calendar' color='#BDBDBD' width={20} />{full_date(i?.created_at)}</p>

                            </div>

                        </div>
                        {props?.with_edit_icon && <SvgIcon id={'expand'} width={20} height={20}
                        // onClick={() => setEdit(!edit)}
                        />}
                    </div>
                </section>

            ))
            }
        </>


    )
})

export default AllPosts

