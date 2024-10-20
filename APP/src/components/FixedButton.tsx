
import { forwardRef } from 'react'
import SvgIcon from './SvgIcon'


interface FixedButtonProps {
    icon: string;
    onClick: () => void
}

const FixedButton = forwardRef(function FixedButton({ icon, onClick }: FixedButtonProps, ref) {
    return (

        <div className='circle cursor-pointer' onClick={onClick}>
            <SvgIcon id={icon} color='#fff' style={{ transform: 'scale(1.3)' }} />
        </div>
    )
})

export default FixedButton

