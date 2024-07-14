
import { forwardRef } from 'react'
import CSS from '../css/Profile/NewPost.module.css'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import Call from '../utils/Call'
import { Routes } from '../utils/Routes'




const UpdatePost = forwardRef(function UpdatePost(props: any, ref: any) {

    let data = props?.post
    let limit = 150

    const [wordCount, setWordCount] = useState<number>()

    const [post, setPost] = useState<any>()


    const form = useForm<any>({
        defaultValues: {
            body: props?.post?.body
        }
    })
    const {  handleSubmit, } = form
    // const { errors } = formState


    useEffect(() => {
        setWordCount(props?.post?.body?.length)
        setPost(props?.post?.body)
    }, [props])

    const onSubmit = () => {

        // console.log(post)
        const finalData = {
            body: post,
        }

        const update_post = new Call(Routes.posts.update(data?.post_id), 'PATCH', finalData)

        update_post
            .PATCH()
            .then(() => {
                console.log('Post updated successfully')
                props?.close()
            })
            .catch((err) => console.warn(err))

        // console.log(finalData)
    }

    // console.log('post', post)

    return (


        <form onSubmit={handleSubmit(onSubmit)} noValidate className={CSS.new_post_form}>

            <h3>Θέμα: {data?.title?.title}</h3>


            {data?.body}
            <div style={{ margin: '20px 0', width: '100%' }}>


                <textarea
                    // defaultValue={data?.body}
                    // {...register('body')}
                    onChange={(e) => {
                        setPost(e.target.value);
                        setWordCount(e.target.value.length)
                    }}
                >

                </textarea>



                <div className={CSS.bottom_section}>
                    <p>{wordCount}/{limit}</p>
                    <button className='btn'>Δημοσίευση</button>
                </div>
            </div>



        </form>

    )
})

export default UpdatePost

