import CSS from '../css/Profile/NewPost.module.css'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import Call from '../utils/Call'
import { Routes } from '../utils/Routes'



export default function UpdatePost(props: any) {

    const [wordCount, setWordCount] = useState<number>(props?.body?.length)


    let labels = [
        { title: 'Ψάχνω νέα μέλη', category: 'musician' },
        { title: 'Νέα κυκλοφορία', category: 'musician' },
        { title: 'Ψάχνω μπάντα', category: 'musician' },
        { title: 'Νέα ενημέρωση', category: 'studio' },
        { title: 'Νέες αφίξεις', category: 'store' },
        { title: 'Προσφορές', category: 'store' },
        { title: 'Νέα ενημέρωση', category: 'stage' },
        { title: 'Ζητείται προσωπικό', category: 'stage' },
    ]


    const [label, setLabel] = useState<any>(labels[0].title)
    let limit = 150
    const [post, setPost] = useState<string>(props?.body)

    const form = useForm()
    const { register, handleSubmit } = form
    // const { errors } = formState


    // console.log(props)

    const onSubmit = () => {

        const finalData = {
            category: label,
            body: post,
        }


        const new_post = new Call(Routes.posts.update(props?.post_id), 'PATCH', finalData)

        new_post
            .PATCH()
            .then(() => {
                props?.close()
            })
            .catch((err) => console.warn(err))


    }

    // console.warn(props)


    return (
        <>

            <form onSubmit={handleSubmit(onSubmit)} noValidate className={CSS.new_post_form}>
                
                <div className={CSS.labels}>
                    <h3>Νέα δημοσίευση - Επιλέξτε θέμα:</h3>
                    <select onChange={(e) => setLabel(e.target.value)} defaultValue={props?.value}>
                        {labels
                            .filter((label: any) => label.category === props?.category)
                            .map((item: any, index: number) =>
                                <option
                                    key={index}>
                                    {item.title}
                                </option>
                            )}
                    </select>
                </div>


                <div style={{ margin: '0 0 20px 0', width: '100%' }}>


                    <textarea
                        defaultValue={props?.body}
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
        </>
    )
}