
import { forwardRef } from 'react'
import logo from '../img/logo.png'

const AnimatedLogo = forwardRef(function AnimatedLogo(props: any, ref: any) {
    return (
        <div className=' items-inline' style={{ gap: '5px' }}>

            <img src={logo} width={70} className='animated' alt='apoechos logo' />
            Αναζήτηση...
        </div>
    )
})

export default AnimatedLogo

