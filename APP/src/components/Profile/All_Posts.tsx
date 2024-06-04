import { useEffect, useState } from "react"

import Call from "../../utils/Call"
import { Routes } from "../../utils/Routes"

import Post from '../Post'


// NOT IN USE
export default function All_Posts(props: any) {


    const [posts, setPosts] = useState<any>([])
    const [updateDOM, setUpdateDOM] = useState<boolean>(false)


    let profile = props?.profile_id

    const posts_by_id = new Call(Routes.posts.profile_id(profile), 'GET')

    // console.log(props)


    useEffect(() => {
        posts_by_id
            .GET()
            .then((res) => {
                // console.warn(res)
                setPosts(res);
            })
            .catch((err) => console.warn(err))

    }, [props, updateDOM])


    // console.log(props)




    const unpinnedPosts = posts && posts
        .filter((post: any) => !post?.is_pinned)
        .filter((post: any) => !post?.is_deleted)
        .sort((a: any, b: any) => new Date(b.created_at) > new Date(a.created_at) ? 1 : -1)

    const pinnedPosts = posts && posts
        .filter((post: any) => post?.is_pinned)
        .filter((post: any) => !post?.is_deleted)
        .sort((a: any, b: any) => new Date(b.created_at) > new Date(a.created_at) ? 1 : -1)

    return (

        <section style={{ height: '72vh', overflowY: 'auto', padding: '0 20px 0 0' }}>


            {pinnedPosts.length > 0 && <h3 style={{ margin: '15px 0 15px 0' }}> {`Καρφιτσωμένες δημοσιεύσεις (${pinnedPosts?.length})`}</h3>}
            {pinnedPosts.map((post: any, index: number) => (
                <Post
                    category={props?.category}
                    updateDOM={() => setUpdateDOM(!updateDOM)}
                    key={index}
                    data={post}
                    canEdit={props?.canEdit}
                    profile={props?.profile_name}
                    photo={`http://127.0.0.1:8000/${props?.photo}`} />
            ))}


            {unpinnedPosts.length > 0 && <h3 style={{ margin: '15px 0 15px 0' }}> {`Προηγούμενες δημοσιεύσεις (${unpinnedPosts?.length})`}</h3>}
            {unpinnedPosts.map((post: any, index: number) => (
                <Post
                    category={props?.category}
                    updateDOM={() => setUpdateDOM(!updateDOM)}
                    key={index}
                    data={post}
                    canEdit={props?.canEdit}
                    profile={props?.profile_name}
                    photo={`http://127.0.0.1:8000/${props?.photo}`} />
            ))}

        </section>
    )
}