
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'

// utils
import Call from '../../utils/Call'
import { Routes } from '../../utils/Routes'

import Select from 'react-select'

import CSS from '../../css/Profile/NewPost.module.css'

export default function NewPost(props: any) {


    const form = useForm()
    const { register, handleSubmit, resetField } = form

    const [wordCount, setWordCount] = useState<number>(0)
    const [labels, setLabels] = useState<any[]>([])

    const [post, setPost] = useState<string>('')
    const [title, setTitle] = useState<any>()

    let limit = 150


    const get_labels = new Call(Routes.posts.titles, 'GET')


    useEffect(() => {
        get_labels
            .GET()
            .then((res) => {
                setLabels(
                    res
                        .filter((i: any) => i.category === props?.category)
                        .map((i: any) => ({ value: i.id, label: i.title, }))
                )
            })
    }, [])





    const onSubmit = () => {
        const finalData = {
            title: title,
            body: post,
            [props?.category]: props?.profile_id
        }


        const new_post = new Call(Routes.posts.new, 'POST', finalData)

        new_post
            .POST()
            .then(() => {
                props?.close()
                resetField('post');
                setWordCount(0);
                setPost('')
                console.log('Post uploaded successfully')
            })
            .catch((err) => console.warn(err))


        // console.log(finalData)
    }





    return (

        <form onSubmit={handleSubmit(onSubmit)} noValidate className={CSS.new_post_form}>


            <div className={CSS.labels}>
                <h3>Νέα δημοσίευση - Επιλέξτε θέμα:</h3>
                <Select options={labels} onChange={(e) => setTitle(e.value)} />
            </div>


            <div style={{ margin: '0 0 20px 0', width: '100%' }}>


                <textarea placeholder='Γράψτε κάτι...' {...register('post')}
                    onChange={(e) => {
                        setPost(e.target.value);
                        setWordCount(e.target.value.length)
                    }}>

                </textarea>

                <div className={CSS.bottom_section}>
                    <p>{wordCount}/{limit}</p>
                    <button>Δημοσίευση</button>
                </div>

            </div>

        </form>

    )
}