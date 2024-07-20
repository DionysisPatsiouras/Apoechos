import { forwardRef } from 'react'
import CSS from '../../css/Modal/Modal.module.sass'



// props => open, close, closeButton

const Confirmation = forwardRef(function Confirmation(props: any, ref: any) {
    return (
        <section className={CSS.content}>
            <div className={CSS.topBar}>
                {props?.text}
            </div>

            <div className={CSS.body} style={{ display: 'flex', justifyContent: 'center' }}>
                {props?.body}
            </div>


            <div className={CSS.button_section}>
                <button className='btn red_btn' onClick={props?.confirm}>Διαγραφή</button>
                <button className='cancel_btn' onClick={props?.cancel}>Ακύρωση</button>
            </div>

        </section>
    );
});

export default Confirmation

