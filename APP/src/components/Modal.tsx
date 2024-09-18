
import { forwardRef } from 'react'
import CSS from '../css/Modal/Modal.module.sass'
import SvgIcon from './SvgIcon'


interface ModalProps {
    open: boolean;
    close?: () => void;
    closeButton?: boolean;
    withContainer?: boolean;
    title?: string;
    btn?: boolean;
    children: React.ReactNode;
}

const Modal = forwardRef(function Modal({ open, close, closeButton, withContainer, title, btn, children }: ModalProps, ref) {

    return (
        <div className={CSS.container} style={{ 'display': open ? 'block' : 'none' }} >

            {closeButton && <SvgIcon id={'close'} color={'#ffffff'} onClick={close} />}

            {withContainer ?
                <div className={CSS.content}>
                    <header>
                        <h3>{title}</h3>

                        {btn && <SvgIcon id='close' width={20} height={20} onClick={close} />}

                    </header>
                    <section className={CSS.body}>
                        {children}
                    </section>

                </div>
                :
                <section className={CSS.imageContent}>
                    {children}
                </section>

            }
        </div>
    )
})

export default Modal

