
import { forwardRef } from 'react'
import SvgIcon from './SvgIcon'

// props => icon, onClick

const FixedButton = forwardRef(function FixedButton(props: any, ref: any) {
    return (
        <div className={'circle cursor-pointer'} onClick={props?.onClick}>

            <SvgIcon id={props?.icon} color='#fff' style={{transform: 'scale(1.5)'}}/>

        </div>
    );
});

export default FixedButton

