
import { forwardRef } from 'react'
import SvgIcon from './SvgIcon'

// props => icon, onClick

const IconButton = forwardRef(function IconButton(props: any, ref: any) {
    return (
        <div className={'cursor-pointer'} onClick={props?.onClick}
            style={{
                backgroundColor: '#5F69C6',
                width: '40px',
                height: '40px',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>

            <SvgIcon id={props?.icon} color='#fff' style={{ transform: 'scale(1.5)' }} width={15} height={15} />

        </div>
    );
});

export default IconButton

