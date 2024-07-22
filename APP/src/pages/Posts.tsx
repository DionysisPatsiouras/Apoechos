


import { useCallback, useEffect, useState } from 'react'
import Call from '../utils/Call'
import { Routes } from '../utils/Routes'
import CSS from '../css/News/News.module.css'
import AllPosts from '../components/AllPosts'
import { handle_checkbox } from '../utils/functions/handle_checkbox'
import FixedButton from '../components/FixedButton'
import { Loading } from '../utils/functions/loading'

export default function News() {
    const [data, setData] = useState<any[]>([])
    const [array, setArray] = useState<any[]>([])
    const [open, setOpen] = useState<boolean>(false)

    const [labels, setLabels] = useState<any[]>([])

    const all_posts = new Call(Routes.posts.all, 'GET')
    const get_labels = new Call(Routes.posts.titles, 'GET')


    const get_posts = useCallback(() => {
        all_posts
            .GET()
            .then((res) => setData(res))
            .catch((err) => console.warn(err))
    }, [data])


    const get_titles = useCallback(() => {
        get_labels
            .GET()
            .then((res) => { setLabels(res.map((i: any) => ({ value: i.id, label: i.title }))) })
            .catch((err) => console.warn(err))
    }, [labels])

    useEffect(() => {


        get_titles()
        get_posts()

    }, [])

    // console.log(data)



    return (
        <section>


            <div className={CSS.main_body}>

                <div className={CSS.allPosts} >


                    {Loading(
                        data?.length !== 0,
                        <AllPosts all_posts={
                            data
                                .filter((profile: any) => array.length === 0 ? !array.includes(labels) : array.includes(profile.title.title))
                                .sort((a: any, b: any) => new Date(b.created_at) > new Date(a.created_at) ? 1 : -1)} />
                    )}




                </div>
            </div>

            {open &&

                <ul className='shadow floating_filters'>
                    <h5>Κατηγορία</h5>

                    {labels?.map((label: any, index: number) => (
                        <li key={index} >
                            <input
                                className='cursor-pointer'
                                type='checkbox'
                                id={label?.label}
                                value={label.label}
                                onChange={(e: any) => handle_checkbox(setArray, e.target)}
                                checked={array.includes(label?.label)}
                            />
                            <label className='cursor-pointer' htmlFor={label.label}>{label.label}</label>
                        </li>
                    ))
                    }

                </ul>
            }
            <FixedButton icon='filter' onClick={() => setOpen(!open)} />
        </section>
    )
}