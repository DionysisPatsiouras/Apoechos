import CSS from '../css/Profile/NewPost.module.css'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import Call from '../utils/Call'
import { Routes } from '../utils/Routes'
import Select from 'react-select'



export default function UpdatePost(props: any) {

    const [wordCount, setWordCount] = useState<number>(props?.data?.body?.length)


    let data = props?.data
    let limit = 150
    const [post, setPost] = useState<string>(props?.body)

    const form = useForm()
    const { register, handleSubmit } = form
    // const { errors } = formState


    const onSubmit = () => {

        const finalData = {
            body: post,
        }


        const update_post = new Call(Routes.posts.update(data?.post_id), 'PATCH', finalData)

        update_post
            .PATCH()
            .then(() => {
                console.log('Post updated successfully')
                props?.close()
                // props?.updateDOM()
            })
            .catch((err) => console.warn(err))


    }


    return (


        <form onSubmit={handleSubmit(onSubmit)} noValidate className={CSS.new_post_form}>

            <h3>Θέμα: {data?.title?.title}</h3>

            <div style={{ margin: '20px 0', width: '100%' }}>
                <textarea
                    defaultValue={data?.body}
                    placeholder='Γράψτε κάτι...'
                    {...register('post')}
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