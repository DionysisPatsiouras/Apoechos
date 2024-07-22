
import { forwardRef } from 'react'
import SvgIcon from './SvgIcon'

// props => open, close, closeButton, withContainer, title

// const Button = forwardRef(function Button(props: any, ref: any) {
//     return (
//         <button style={{backgroundColor: props?.color}}>
//             <SvgIcon id={props?.icon}/>
//             {props?.label}
//         </button>

//     )
// })

// export default Button


const Button = forwardRef(function Button(props: any, ref: any) {

    let bg = props?.type === 'configure' && !props?.not_allowed
        ? '#5f69c6'
        : '#b1b1b1'



    return (

        <button
            style={{ backgroundColor: bg }}
            className={props?.not_allowed ? 'disabled_btn' : 'btn'}
            disabled={props?.not_allowed ? true : false} >
            <div className='items-inline' style={{justifyContent: 'space-between'}}>
                {props?.icon && <SvgIcon id={props?.icon} color='#fff' width={16} height={16}/>}



                {props?.label}
            </div>
        </button>

    )
})

export default Button

