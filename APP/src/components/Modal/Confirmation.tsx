
import { forwardRef } from 'react'
import CSS from '../../css/Modal/Modal.module.sass'



// props => open, close, closeButton

const Confirmation = forwardRef(function Confirmation(props: any, ref: any) {
    return (
        <section className={CSS.content}>
            <div className={CSS.topBar}>
                {/* <SvgIcon id={'keys'} /> */}
                {props?.text}
            </div>

            <div className={CSS.body}>
                {props?.body}
            </div>


            <div className={CSS.button_section}>
                <button onClick={props?.confirm}>Επιβεβαίωση</button>
                <button className={'cancel_btn'} onClick={props?.cancel}>Ακύρωση</button>
            </div>

        </section>
    );
});

export default Confirmation

