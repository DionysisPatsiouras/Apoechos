
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'

// utils
import Call from '../../utils/Call'
import { Routes } from '../../utils/Routes'

import CSS from '../../css/Profile/NewPost.module.css'
import FormError from '../../utils/FormError'
// import ProfileContext from '../../context/ProfileContext'
export default function NewPost(props: any) {


    const form = useForm()
    const { register, handleSubmit, resetField, formState } = form
    const { errors } = formState
    const [wordCount, setWordCount] = useState<number>(0)
    const [labels, setLabels] = useState<any[]>([])
    const [checkTitle, setCheckTitle] = useState<string>('')
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



    const onSubmit = (data: any) => {
        // console.warn(data)

        const finalData = {
            title: data.title,
            body: data.body,
            profile: props?.profile_id
        }

        const new_post = new Call(Routes.posts.new, 'POST', finalData)

        if (data?.title === '0' || data?.title === undefined || data?.title === 0) {

            setCheckTitle("Παρακαλώ επιλέξτε κατηγορία")
        } else {
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



    }




    return (

        <form onSubmit={handleSubmit(onSubmit)} noValidate className={CSS.new_post_form}>


            <div className={CSS.labels}>
                <h3>Επιλέξτε κατηγορία:</h3>


                <select {...register('title')} defaultValue={0} onChange={() => setCheckTitle("")}>
                    <option value={0}>-- Επιλογή --</option>
                    {labels?.map((i: any) => (
                        <option key={i.value}
                            value={i.value}>{i.label}

                        </option>
                    ))}
                </select>
                <br></br>


            </div>
            <FormError value={checkTitle} />

            <div style={{ margin: '0 0 20px 0', width: '100%' }}>


                <textarea placeholder='Γράψτε κάτι...'

                    {...register('body', {
                        required: "Η δημοσίευσή σας δεν μπορεί να είναι κενή",
                        maxLength: {
                            value: 150,
                            message: "Το κείμενό σας είναι πολύ μεγάλο"
                        },
                        onChange: (e) => setWordCount(e.target.value.length)
                    })}>
                </textarea>



                <div className={CSS.bottom_section}>
                    <p>{wordCount}/{limit}</p>
                    <button className='btn'>Δημοσίευση</button>
                </div>
                <br></br>
                <FormError value={errors?.body} />
            </div>

        </form >

    )
}