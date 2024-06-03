
import { forwardRef, useEffect, useState } from 'react'
import Call from '../../utils/Call'
import { Routes } from '../../utils/Routes'
import Post from '../Post'
import CSS from '../../css/News/News.module.css'

const DisplayPosts = forwardRef(function DisplayPosts(props: any, ref: any) {

    const all_posts = new Call(Routes.posts.all, 'GET')
    const [data, setData] = useState<any[]>([])

    useEffect(() => {
        all_posts.GET()
            .then((res) => setData(res))
    }, [])

    console.log(data)

    return (
        <section style={{ width: '50vw' }}>


            <div className={CSS.header}>Δημοσίευσεις</div>

            <div className={CSS.main_body}>
                {data.map((post: any, index: number) => (
                    <Post data={post} key={index} />
                ))}
            </div>

        </section>
    )
})

export default DisplayPosts

