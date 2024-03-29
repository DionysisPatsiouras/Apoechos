// SYNTAX
// 
// <FormError value={my_value}/>

export default function FormError(props:any){
    return(
        props?.value &&
            <p className={'error_msg'}>{props?.value?.message}</p>
        
    )
}