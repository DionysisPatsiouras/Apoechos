
import { forwardRef } from 'react'
// import CSS from '../css/Modal/Modal.module.sass'
// import SvgIcon from './SvgIcon'
// import { Img } from 'react-optimized-image'
// import { Image } from "@mts-pjsc/image-optimize";
// import { Img } from 'react-image';


// props => open, close, closeButton, withContainer, title, btn

const ProfileListItem = forwardRef(function ProfileListItem(props: any, ref: any) {

    let profile = props?.profile

    // const img: any = `http://127.0.0.1:8000/${profile?.photo}`




    return (

        <div
            className={`stageListItem items-inline cursor-pointer `}
            style={{ width: '200px' }}
            onClick={props?.onClick}
        >
            {/* <img srcSet={`http://127.0.0.1:8000/${profile.photo}`} className='circle_img' width={50} height={50} alt='tesfsafs'/> */}
            {/* @ts-ignore */}
            {/* <Img  src={require(`http://127.0.0.1:8000/${profile.photo}`)}  className='circle_img' width={50} height={50} alt='tesfsafs'/> */}
            {/* @ts-ignore */}
            {/* <Img src={`http://127.0.0.1:8000/${profile.photo}`} className='circle_img' width={50} height={50} alt='tesfsafs' /> */}
            {/* <Img
                src={img}
                webp
                sizes={[300, 600, 1200]}
                alt="User Profile"
                // @ts-ignore
                lazy
                placeholder
            /> */}
            <div>
                <p>{profile.name}</p>
                <p style={{ color: '#c1c1c1', fontSize: '12px' }}>{`${profile?.city?.name}, ${profile?.address}`} </p>
            </div>
        </div>

    )
})

export default ProfileListItem

