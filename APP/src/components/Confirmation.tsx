export default function Confirmation(props: any) {
    return (

        props?.confirm
            ?
            <div className='container'>
                <h2>{props?.title}</h2>
                <hr className='divider'></hr>
                {props?.children}
            </div>
            :
            null

    )

}