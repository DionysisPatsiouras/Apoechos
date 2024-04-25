import NewPost from "./NewPost"
import Call from "../../utils/Call"
import { Routes } from "../../utils/Routes"
import { useEffect, useState } from "react"
import CSS from '../../css/Post/Post.module.css'

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

            <h3>Προηγούμενες δημοσίευσεις</h3>
            {
                posts && posts.map((post: any, index: number) => (
                    <section key={index} className={CSS.post_card}>
                        <div className={CSS.top}>
                            <img src={`http://127.0.0.1:8000/${props?.profile?.photo}`} width={100} />
                            <div className={CSS.content}>
                                <h3>{props?.profile?.artistic_nickname}</h3>
                                <p className={CSS.category}>{post?.category}</p>
                                <p>{post?.body}</p>
                            </div>


                        </div>


                        
                    </section>
                ))
            }
        </section>
    )
}