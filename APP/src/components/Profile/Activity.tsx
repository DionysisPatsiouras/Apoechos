import NewPost from "./NewPost"
import Call from "../../utils/Call"
import { Routes } from "../../utils/Routes"
import { useEffect, useState } from "react"
import CSS from '../../css/Post/Post.module.css'
import SvgIcon from "../SvgIcon"

export default function Activity(props: any) {

    // console.warn(props)

    const [posts, setPosts] = useState<any>([])
    const [updateDOM, setUpdateDOM] = useState<boolean>(false)

    let getId = window.location.pathname.replace('/profile/musician/', '')
    const posts_by_id = new Call(Routes.posts.profile_id(getId), 'GET')
    useEffect(() => {

        posts_by_id
            .GET()
            .then((res) => { setPosts(res); console.log(res); setUpdateDOM(!updateDOM) })
            .catch((err) => console.warn(err))
    }, [])

    return (
        <section>

            {props?.canEdit && <NewPost />}
            <br></br>
            <br></br>

            <h3>Προηγούμενες δημοσίευσεις</h3>
            <br></br>

            {
                posts && posts.map((post: any, index: number) => (
                    <section key={index} className={CSS.post_card}>
                        <div className={CSS.top}>
                            <div style={{ display: 'flex' }}>
                                <img src={`http://127.0.0.1:8000/${props?.profile?.photo}`} width={100} />
                                <div className={CSS.content}>
                                    <h3>{props?.profile?.artistic_nickname}</h3>
                                    <p className={CSS.category}>{`"${post?.category}"`}</p>
                                    <p className={CSS.body}>{post?.body}</p>
                          
                                    <p className={CSS.date}>
                                        {new Date(post.created_at)
                                            .toLocaleDateString("el-GR", {
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric",
                                                hour: "numeric",
                                                minute: "numeric"
                                            })}

                                    </p>

                                </div>
                            </div>
                            {props?.canEdit &&
                                <SvgIcon id={'expand'} width={20} height={20} />
                            }

                        </div>



                    </section>
                ))
            }
        </section>
    )
}