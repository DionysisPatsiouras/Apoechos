import NewPost from "./NewPost"
import Call from "../../utils/Call"
import { Routes } from "../../utils/Routes"
import { useEffect, useState } from "react"
import CSS from '../../css/Post/Post.module.css'
import SvgIcon from '../SvgIcon'

export default function Activity(props: any) {


    const [posts, setPosts] = useState<any>([])
    const [updateDOM, setUpdateDOM] = useState<boolean>(false)

    const posts_by_id = new Call(Routes.posts.profile_id(props?.profile), 'GET')

    useEffect(() => {

        posts_by_id
            .GET()
            .then((res) => setPosts(res))
            .catch((err) => console.warn(err))
    }, [updateDOM, props])



    return (
        <section>

            {props?.canEdit &&
                <NewPost
                    profile_id={props?.profile}
                    updateDOM={() => setUpdateDOM(!updateDOM)}
                />}



            {posts.length > 0 && <h3 style={{ margin: '35px 0 15px 0' }}> {`Προηγούμενες δημοσίευσεις (${posts?.length})`}</h3>}
            {
                posts && posts
                    .sort((a: any, b: any) => new Date(b.created_at) > new Date(a.created_at) ? 1 : -1)
                    .map((post: any, index: number) => (
                        <section key={index} className={CSS.post_card}>
                            <div className={CSS.top}>
                                <div style={{ display: 'flex' }}>
                                    <img src={`http://127.0.0.1:8000/${props?.photo}`} width={100} />
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