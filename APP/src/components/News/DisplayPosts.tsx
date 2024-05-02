
import { forwardRef, useEffect, useState } from 'react'
import Call from '../../utils/Call'
import { Routes } from '../../utils/Routes'


const DisplayPosts = forwardRef(function DisplayPosts(props: any, ref: any) {

    const all_posts = new Call(Routes.posts.all, 'GET')
    const [data, setData] = useState<any[]>([])

    useEffect(() => {
        all_posts.GET()
        .then((res)=> setData(res))
    },[])

    console.log(data)

    return (
        <div style={{width : '50vw'}}>
            posts
        </div>
    )
})

export default DisplayPosts

