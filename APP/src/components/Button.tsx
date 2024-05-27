
import { forwardRef } from 'react'
import CSS from '../css/Modal/Modal.module.sass'
import SvgIcon from './SvgIcon'

// props => open, close, closeButton, withContainer, title

const Button = forwardRef(function Button(props: any, ref: any) {
    return (
        <button>
            <SvgIcon id={props?.icon}/>
            {props?.label}
        </button>

    )
})

export default Button

