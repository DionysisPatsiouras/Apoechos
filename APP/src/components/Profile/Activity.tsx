import NewPost from "./NewPost"

export default function Activity(props: any) {

    // console.warn(props)
    return (
        <section>

            {props?.canEdit && <NewPost />}

           

        </section>
    )
}