
import { forwardRef } from 'react'
import CSS from '../css/FullModal/FullModal.module.css'
import SvgIcon from './SvgIcon';

// props => open, close, closeButton, withContainer, title, btn

const FullModal = forwardRef(function FullModal(props: any, ref: any) {
    return (
        <div className={CSS.container} style={{ 'display': props?.open ? 'block' : 'none' }} >

            <div className={CSS.content}>

                <section className={CSS.body}>
                    <header className={CSS.head}>
                        <h3>{props?.title}</h3>
                        <SvgIcon id='close' width={20} height={20} onClick={props?.close} />
                    </header>

                    {props?.children}
                </section>

            </div>




        </div>
    );
});

export default FullModal

