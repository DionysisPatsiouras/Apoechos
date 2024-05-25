import { useEffect, useState } from "react"

import Call from "../../utils/Call"
import { Routes } from "../../utils/Routes"

import Post from '../Post'
import NewPost from './NewPost'

export default function All_Posts(props: any) {


    const [posts, setPosts] = useState<any>([])
    const [updateDOM, setUpdateDOM] = useState<boolean>(false)

    let profile = props?.data?.musicianId || props?.data?.studioId

    const posts_by_id = new Call(Routes.posts.profile_id(profile), 'GET')


    useEffect(() => {

        posts_by_id
            .GET()
            .then((res) => setPosts(res))
            .catch((err) => console.warn(err))
    }, [updateDOM, props, posts])



    const unpinnedPosts = posts && posts
        .filter((post: any) => !post?.is_pinned)
        .filter((post: any) => !post?.is_deleted)
        .sort((a: any, b: any) => new Date(b.created_at) > new Date(a.created_at) ? 1 : -1)

    const pinnedPosts = posts && posts
        .filter((post: any) => post?.is_pinned)
        .filter((post: any) => !post?.is_deleted)
        .sort((a: any, b: any) => new Date(b.created_at) > new Date(a.created_at) ? 1 : -1)

    return (
        <section style={{height: '500px', overflowY: 'auto', padding: '0 20px 0 0'}}>

            {pinnedPosts.length > 0 && <h3 style={{ margin: '35px 0 15px 0' }}> {`Καρφιτσωμένες δημοσιεύσεις (${pinnedPosts?.length})`}</h3>}
            {pinnedPosts.map((post: any, index: number) => (
                <Post
                    updateDOM={() => setUpdateDOM(!updateDOM)}
                    key={index}
                    data={post}
                    canEdit={props?.canEdit}
                    profile={props?.data?.artistic_nickname || props?.data?.title}
                    photo={`http://127.0.0.1:8000/${props?.photo}`} />
            ))}


            {unpinnedPosts.length > 0 && <h3 style={{ margin: '35px 0 15px 0' }}> {`Προηγούμενες δημοσιεύσεις (${unpinnedPosts?.length})`}</h3>}
            {unpinnedPosts.map((post: any, index: number) => (
                <Post
                    updateDOM={() => setUpdateDOM(!updateDOM)}
                    key={index}
                    data={post}
                    canEdit={props?.canEdit}
                    profile={props?.data?.artistic_nickname || props?.data?.title}
                    photo={`http://127.0.0.1:8000/${props?.photo}`} />
            ))}

        </section>
    )
}