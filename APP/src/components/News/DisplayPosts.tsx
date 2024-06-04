
import { forwardRef, useEffect, useState } from 'react'
import Call from '../../utils/Call'
import { Routes } from '../../utils/Routes'
import Post from '../Post'
import CSS from '../../css/News/News.module.css'

const DisplayPosts = forwardRef(function DisplayPosts(props: any, ref: any) {

    const all_posts = new Call(Routes.posts.all, 'GET')
    const [data, setData] = useState<any[]>([])
    const [array, setArray] = useState<any[]>([])
    const [open, setOpen] = useState<boolean>(false)

    let labels = [
        { title: 'Ψάχνω νέα μέλη' },
        { title: 'Νέα κυκλοφορία' },
        { title: 'Ψάχνω μπάντα' },
        { title: 'Νέα ενημέρωση' },
        { title: 'Νέες αφίξεις' },
        { title: 'Προσφορές' },
        { title: 'Ζητείται προσωπικό' }
    ]

    const handle_checkbox = (event: any) => {
        const { value, checked } = event.target;
        setArray((prevCategories: any) =>
            checked
                ? [...prevCategories, value]
                : prevCategories.filter((all_values: any) => all_values !== value)
        )
    }


    useEffect(() => {
        all_posts.GET()
            .then((res) => setData(res))
    }, [])

    // console.log(array)

    return (
        <section style={{ width: '50vw' }}>


            <div className={CSS.header}>
                <p>Δημοσίευσεις</p>

                <div className={CSS.filters} onClick={() => setOpen(!open)}>Φίλτρα</div>
                {open &&

                    <ul>

                        {labels.map((label: any, index: number) => (
                            <li key={index}>
                                <input type='checkbox' id={label?.title} value={label.title} onChange={(e: any) => handle_checkbox(e)} />
                                <label htmlFor={label.title}>{label.title}</label>
                            </li>
                        ))
                        }

                    </ul>
                }
            </div>

            <div className={CSS.main_body}>
                <div style={{ margin: '10px', display: 'flex', flexDirection: 'column', gap: '15px' }}>


                    {data
                        .filter((profile: any) => array.length === 0 ? !array.includes(labels) : array.includes(profile.category))
                        .sort((a: any, b: any) => new Date(b.created_at) > new Date(a.created_at) ? 1 : -1)
                        .map((post: any, index: number) => (
                            <Post data={post} key={index} />
                        ))}
                </div>
            </div>


        </section>
    )
})

export default DisplayPosts

