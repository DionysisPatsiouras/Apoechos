import Events from "../components/News/Events"
import DisplayPosts from "../components/News/DisplayPosts"
import CSS from '../css/News/News.module.sass'

import AllPosts from "../components/AllPosts"
export default function News() {
    return (

        <section className={CSS.container}>

                

            <Events />
       
       
            <DisplayPosts />

            
        </section>
    )
}