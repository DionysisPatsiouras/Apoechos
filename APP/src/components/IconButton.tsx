
import { forwardRef } from 'react'
import SvgIcon from './SvgIcon'

interface IconButtonProps {
    icon: string;
    onClick: () => void;
}

const IconButton = forwardRef(function IconButton({ icon, onClick }: IconButtonProps, ref) {

    return (
        <div className='iconButton cursor-pointer' onClick={onClick}>
            <SvgIcon id={icon} color='#fff' style={{ transform: 'scale(1.5)' }} width={15} height={15} />
        </div>
    )
})

export default IconButton

