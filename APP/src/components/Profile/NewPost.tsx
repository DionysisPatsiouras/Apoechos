import CSS from '../../css/Profile/NewPost.module.css'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import Call from '../../utils/Call'
import { Routes } from '../../utils/Routes'



export default function NewPost(props: any) {

    const [wordCount, setWordCount] = useState<number>(0)
    const [labels, setLabels] = useState<number>(0)

    const get_labels = new Call(Routes.posts.titles, 'GET')

    useEffect(() => {

        get_labels
            .GET()
            .then((res) => {
                console.log(res)
                setLabels(res.filter((i:any) => i.category === props?.category))
            })

    }, [])

    console.warn(labels)
    // let labels = [
    //     { title: 'Ψάχνω νέα μέλη', category: 'musician' },
    //     { title: 'Νέα κυκλοφορία', category: 'musician' },
    //     { title: 'Ψάχνω μπάντα', category: 'musician' },
    //     { title: 'Νέα ενημέρωση', category: 'studio' },
    //     { title: 'Νέες αφίξεις', category: 'store' },
    //     { title: 'Προσφορές', category: 'store' },
    //     { title: 'Νέα ενημέρωση', category: 'stage' },
    //     { title: 'Ζητείται προσωπικό', category: 'stage' },
    // ]

    // 
    // const [label, setLabel] = useState<any>(
    //     props?.category === 'musician' ?
    //         labels[0].title :
    //         props?.category === 'studio' ?
    //             labels[3].title :
    //             props?.category === 'store' ?
    //                 labels[4].title :
    //                 null
    // )

    let limit = 150
    const [post, setPost] = useState<string>('')

    const form = useForm()
    const { register, handleSubmit, resetField } = form
    // const { errors } = formState


    // console.log(props)

    const onSubmit = () => {

        const finalData = {
            // category: label,
            body: post,
            // profile_id: props?.profile_id
            [props?.category]: props?.profile_id
        }


        const new_post = new Call(Routes.posts.add, 'POST', finalData)

        new_post
            .POST()
            .then(() => {
                props?.close()
                resetField('post');
                setWordCount(0);
                setPost('')
            })
            .catch((err) => console.warn(err))


        console.log(finalData)
    }



    return (
        <>


            <form onSubmit={handleSubmit(onSubmit)} noValidate className={CSS.new_post_form}>

                <div className={CSS.labels}>
                    <h3>Νέα δημοσίευση - Επιλέξτε θέμα:</h3>
                    {/* <select onChange={(e) => setLabel(e.target.value)}> */}
                        {/* {labels
                            // .filter((label: any) => label.category === props?.category)
                            .map((item: any, index: number) =>
                                <option
                                    key={index}>
                                    {item.title}
                                </option>
                            )} */}
                    {/* </select> */}
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
        </>
    )
}