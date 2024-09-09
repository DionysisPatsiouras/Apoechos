import { forwardRef } from 'react'
import SvgIcon from '../SvgIcon'
import ProfileImage from '../ProfileImage'

// props => open, close, closeButton, withContainer, title, btn

const SelectedProfile = forwardRef(function SelectedProfile(props: any, ref: any) {


    let profile = props?.profile

    let svgStyle = {
        marginTop: '-45px',
        marginRight: '-14px',
        marginLeft: '20px',
        backgroundColor: '#C65F5F',
        borderRadius: '2000px',
        width: '15px',
        height: '15px',
        padding: '5px'
    }

    return (
        <div className={`items-inline shadow`} style={{ gap: '10px', borderRadius: '20000px', padding: '10px', minWidth: '150px' }} >
            <ProfileImage
                photo={profile?.photo}
                size={40}
                // category={profile?.category?.id}
                style={{ width: 'auto' }}
            />
            <div>
                <h3>{profile?.name}</h3>
                <small style={{ color: '#b5b5b5' }}>{profile?.city?.name}</small>
            </div>
            <SvgIcon id='close' color='#fff' width={20} style={svgStyle} onClick={props?.onClick} />
        </div>
    )
})

export default SelectedProfile

