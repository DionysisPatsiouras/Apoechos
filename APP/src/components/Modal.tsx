
import { forwardRef } from 'react'
import CSS from '../css/Modal/Modal.module.sass'
import SvgIcon from './SvgIcon'

// props => open, close, closeButton, withContainer, title, btn

const Modal = forwardRef(function Modal(props: any, ref: any) {
    return (
        <div className={CSS.container} style={{ 'display': props?.open ? 'block' : 'none' }} >

            {props?.closeButton && <SvgIcon id={'close'} color={'#ffffff'} onClick={props?.close} />}


            {props?.withContainer ?
                <div className={CSS.content}>
                    <header>
                        <h3>{props?.title}</h3>

                        {props.btn && <SvgIcon id='close' width={20} height={20} onClick={props?.close} />}

                    </header>
                    <section className={CSS.body}>
                        {props?.children}
                    </section>

                </div>
                :

                <section className={CSS.imageContent}>
                    {props?.children}
                </section>

            }


        </div>
    );
});

export default Modal

