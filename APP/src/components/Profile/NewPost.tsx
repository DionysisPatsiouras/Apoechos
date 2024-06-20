
import { useState, useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'

// utils
import Call from '../../utils/Call'
import { Routes } from '../../utils/Routes'

// import Select from 'react-select'

import CSS from '../../css/Profile/NewPost.module.css'

export default function NewPost(props: any) {


    const form = useForm()
    const { register, handleSubmit, resetField } = form

    const [wordCount, setWordCount] = useState<number>(0)
    const [labels, setLabels] = useState<any[]>([])
    let limit = 150


    const get_labels = new Call(Routes.posts.titles, 'GET')


    useEffect(() => {
        get_labels
            .GET()
            .then((res) => {
                setLabels(res
                    .filter((i: any) => i.categoryId?.id === props?.category?.id)
                    .map((i: any) => ({ value: i.id, label: i.title, category: i.categoryId?.id }))
                )
            })
    }, [props])

    // console.log(props)
    // console.log(labels)





    const onSubmit = (data: any) => {


        const finalData = {
            title: data.title,
            body: data.body,
            profile: props?.profile_id
        }

        const new_post = new Call(Routes.posts.new, 'POST', finalData)

        new_post
            .POST()
            .then(() => {
                props?.close()
                resetField('body');
                resetField('title');
                setWordCount(0);
                console.log('Post uploaded successfully')
            })
            .catch((err) => console.warn(err))

    }





    return (

        <form onSubmit={handleSubmit(onSubmit)} noValidate className={CSS.new_post_form}>


            <div className={CSS.labels}>
                <h3>Νέα δημοσίευση - Επιλέξτε θέμα:</h3>
                {/* <Select options={labels} defaultValue={labels?.[0]?.value} onChange={(e) => setTitle(e.value)} /> */}

                <select {...register('title')}>
                    {labels?.map((i: any) => (
                        <option key={i.value}
                            value={i.value}>{i.label}
                        </option>
                    ))}
                </select>
            </div>


            <div style={{ margin: '0 0 20px 0', width: '100%' }}>


                <textarea placeholder='Γράψτε κάτι...' {...register('body')}
                    onChange={(e) => { setWordCount(e.target.value.length) }}>
                </textarea>

                <div className={CSS.bottom_section}>
                    <p>{wordCount}/{limit}</p>
                    <button>Δημοσίευση</button>
                </div>

            </div>

        </form>

    )
}