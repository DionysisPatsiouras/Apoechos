


import { forwardRef, useEffect, useState } from 'react'
import Call from '../utils/Call'
import { Routes } from '../utils/Routes'
import CSS from '../css/News/News.module.css'
import AllPosts from '../components/AllPosts'
import { handle_checkbox } from '../utils/functions/handle_checkbox'

export default function News() {
    const [data, setData] = useState<any[]>([])
    const [array, setArray] = useState<any[]>([])
    const [open, setOpen] = useState<boolean>(false)

    const [labels, setLabels] = useState<any[]>([])

    const all_posts = new Call(Routes.posts.all, 'GET')
    const get_labels = new Call(Routes.posts.titles, 'GET')


    useEffect(() => {
        get_labels
            .GET()
            .then((res) => { setLabels(res.map((i: any) => ({ value: i.id, label: i.title }))) })


        all_posts.GET().then((res) => setData(res)).catch((err) => console.warn(err))
    }, [])




    return (
        <section>


            <div className={CSS.header}>
                <p>Δημοσίευσεις</p>

                <div className={`${CSS.filters} cursor-pointer`}
                    onClick={() => setOpen(!open)}>
                    {open ? 'Κλείσιμο' : 'Φίλτρα'}
                </div>

                {open &&
                    <ul>
                        {labels.map((label: any, index: number) => (
                            <li key={index}>
                                <input type='checkbox' id={label?.label}
                                    value={label.label}
                                    onChange={(e: any) => handle_checkbox(setArray, e.target)}
                                />
                                <label htmlFor={label.label}>{label.label}</label>
                            </li>
                        ))
                        }

                    </ul>
                }
            </div>

            <div className={CSS.main_body}>

                <div style={{ margin: '10px', display: 'flex', flexDirection: 'column', gap: '15px' }}>

                    <AllPosts
                        all_posts={data
                            .filter((profile: any) => array.length === 0 ? !array.includes(labels) : array.includes(profile.title.title))
                            .sort((a: any, b: any) => new Date(b.created_at) > new Date(a.created_at) ? 1 : -1)} />
                </div>
            </div>


        </section>
    )
}