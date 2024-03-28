export default function FormError(props:any){
    return(
        props?.value &&
            <p className={'error_msg'}>{props?.value?.message}</p>
        
    )
}