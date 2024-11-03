
import { forwardRef } from 'react'
import SvgIcon from './SvgIcon'


interface FixedButtonProps {
    icon: string;
    onClick: () => void
}

const FixedButton = forwardRef(function FixedButton({ icon, onClick }: FixedButtonProps, ref) {
    return (

        <div className='circle cursor-pointer drop-shadow' onClick={onClick}>
            <SvgIcon id={icon} color='#fff' width={140} height={140} />
        </div>
    )
})

export default FixedButton

