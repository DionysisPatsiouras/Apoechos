import CSS from '../../css/Profile/NewPost.module.css'
import { useState, useContext } from 'react'
import { useForm } from 'react-hook-form'
import AuthContext from '../../context/AuthContext'
import SvgIcon from '../SvgIcon'
import Call from '../../utils/Call'
import { Routes } from '../../utils/Routes'





export default function NewPost(props: any) {

    const [wordCount, setWordCount] = useState<number>(0)
    let { user }: any = useContext(AuthContext)

    let labels = [
        { title: 'Ψάχνω νέα μέλη', icon: 'add_person' },
        { title: 'Νέα κυκλοφορία', icon: 'new_release' },
        { title: 'Ψάχνω μπάντα', icon: 'band' }
    ]

    const [label, setLabel] = useState<any>(labels[0].title)
    let limit = 150
    const [post, setPost] = useState<string>('')

    const form = useForm()
    const { register, handleSubmit, formState, resetField } = form
    // const { errors } = formState


    const onSubmit = (data: any) => {


        const finalData = {
            category: label,
            body: post,
            profile_id: props?.profile_id
        }
        // console.warn(finalData)


        const new_post = new Call(Routes.posts.add, 'POST', finalData)

        new_post
            .POST()
            .then(() => {
                props?.updateDOM();
                resetField('post');
                setWordCount(0);
                setPost('')
            })
            .catch((err) => console.warn(err))



    }



    return (
        <>

            <h3>Νέα δημοσίευση - Επιλέξτε θέμα:</h3>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>

                <div className={CSS.labels}>

                    {labels.map((item: any, index: number) =>
                        <button

                            key={index}
                            type='button'
                            onClick={() => setLabel(item.title)}
                            style={{
                                backgroundColor: label === item.title ? '#5F69C6' : '#ffffff',
                                color: label === item.title ? '#ffffff' : '#000000',
                            }}>
                            <SvgIcon id={item?.icon} color={label === item.title ? '#ffffff' : '#000000'} />
                            {item.title}

                        </button>
                    )}



                </div>



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


            </form>
        </>
    )
}