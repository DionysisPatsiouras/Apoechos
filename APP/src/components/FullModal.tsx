
import { forwardRef, HtmlHTMLAttributes } from 'react'
import CSS from '../css/FullModal/FullModal.module.css'
import SvgIcon from './SvgIcon';

// props => open, close, closeButton, withContainer, title, btn

interface FullModalProps {
    open: boolean;
    close: () => void;
    title?: string;
    children: React.ReactNode;
}

const FullModal = forwardRef(function FullModal({ open, close, title , children}: FullModalProps, ref) {
    return (
        <div className={CSS.container} style={{ 'display': open ? 'block' : 'none' }} >

            <div className={CSS.content}>

                <section className={CSS.body}>
                    <header className={CSS.head}>
                        <h3>{title}</h3>
                        <SvgIcon id='close' width={20} height={20} onClick={close} />
                    </header>

                    {children}
                </section>

            </div>




        </div>
    );
});

export default FullModal

