
import { forwardRef } from 'react'
import SvgIcon from './SvgIcon'

// props => icon, onClick

const IconButton = forwardRef(function IconButton(props: any, ref: any) {
    return (
        <div className={'iconButton cursor-pointer'} onClick={props?.onClick}>

            <SvgIcon id={props?.icon} color='#fff' style={{ transform: 'scale(1.5)' }} width={15} height={15} />

        </div>
    );
});

export default IconButton

