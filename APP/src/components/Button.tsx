
import { forwardRef } from 'react'
import SvgIcon from './SvgIcon'

// props => open, close, closeButton, withContainer, title

const Button = forwardRef(function Button(props: any, ref: any) {
    return (
        <button style={{backgroundColor: props?.color}}>
            <SvgIcon id={props?.icon}/>
            {props?.label}
        </button>

    )
})

export default Button

