
import { forwardRef } from 'react'
import CSS from '../css/Modal/Modal.module.sass'
import SvgIcon from './SvgIcon'


const Modal = forwardRef(function Modal(props: any, ref: any) {
    return (
        <div className={CSS.container} style={{ 'display': props?.open ? 'block' : 'none' }} onClick={props?.close}>
          
            <SvgIcon id={'close'} color={'#ffffff'} onClick={props?.close} />

            <section className={CSS.imageContent}>
                {props?.children}
            </section>

        </div>
    );
});

export default Modal

