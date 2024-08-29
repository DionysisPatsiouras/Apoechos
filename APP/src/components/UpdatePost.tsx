import { useState, useEffect, forwardRef } from 'react'
import CSS from '../css/Profile/NewPost.module.css'
import { useForm } from 'react-hook-form'

import Button from './Button'

// utils
import Call from '../utils/Call'
import { Routes } from '../utils/Routes'

import { useSnackbarContext } from '../context/SnackbarContext'

const UpdatePost = forwardRef(function UpdatePost(props: any, ref: any) {

    let { snackbar }: any = useSnackbarContext()


    let data = props?.post
    let limit = 150


    const [title, setTitle] = useState<any>()
    const [body, setBody] = useState<string>()
    const [wordCount, setWordCount] = useState<number>()
    const [labels, setLabels] = useState<any[]>([])

    const form = useForm<any>()
    const { handleSubmit } = form
    // const { errors } = formState

    let not_allowed = wordCount === 0 || title === "0"


    const get_labels = new Call(Routes.posts.titles, 'GET')



    useEffect(() => {
        // initialize post
        setWordCount(data?.body?.length)
        setBody(data?.body)
        setTitle(data?.title?.id)

        // get right labels
        get_labels
            .GET()
            .then((res) => {
                // console.log(res)
                setLabels(res
                    .filter((i: any) => i.categoryId?.id === data?.profile?.category?.id)
                    .map((i: any) => ({ value: i.id, label: i.title, category: i.categoryId?.id }))
                )
            })

    }, [props])

    // console.log(labels)

    const onSubmit = () => {

        const finalData = {
            body: body,
            title: title
        }

        const update_post = new Call(Routes.posts.update(data?.post_id), 'PATCH', finalData)

        update_post
            .PATCH()
            .then(() => {
                console.log('Post updated successfully')
                props?.close()
                snackbar('Η δημοσίευσή σας ενημερώθηκε')
            })
            .catch((err) => console.warn(err))

    }

    // console.log(title)


    return (


        <form onSubmit={handleSubmit(onSubmit)} noValidate className={CSS.new_post_form}>

            <h3>Θέμα: </h3>

            <select
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            >
                <option value={0}>-- Επιλογή --</option>
                {labels?.map((i: any) => (
                    <option key={i.value}
                        value={i.value}>
                        {i.label}

                    </option>
                ))}
            </select>

            <div style={{ margin: '20px 0', width: '100%' }}>


                <textarea
                    value={body}
                    onChange={(e) => {
                        setBody(e.target.value);
                        setWordCount(e.target.value.length)
                    }}
                >

                </textarea>




                <div className={CSS.bottom_section}>
                    <p>{wordCount}/{limit}</p>
                    {/* <button
                        className={not_allowed ? 'btn_disabled' : 'btn'}
                        disabled={not_allowed ? true : false} >Δημοσίευση</button> */}

                    <Button label='Δημοσίευση' not_allowed={not_allowed} type='configure' />
                </div>
            </div>



        </form>

    )
})

export default UpdatePost

