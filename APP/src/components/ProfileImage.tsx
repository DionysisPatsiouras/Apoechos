
import { forwardRef } from 'react'
import SvgIcon from './SvgIcon'

// <ProfileImage
//      photo={currentProfile?.photo}
//      category={currentProfile?.category}
//      onClick={() => setModal(!modal)}
//      size={180}
// />


const ProfileImage = forwardRef(function ProfileImage({ photo, category, onClick, size, style }: any, ref: any) {



    return (

        <div style={style || { width: size, margin: '0 auto' }}>

            <img
                src={`http://127.0.0.1:8000/${photo}`}
                alt='profile'
                style={{
                    borderRadius: '200px',
                    border: '2px solid #D7D7D7',
                    objectFit: 'cover',
                    width: `${size} !important`,
                    height: `${size} !important`
                }}
                width={size}
                height={size}
                onClick={onClick}
            />

            <SvgIcon id={category?.icon}
                style={{
                    transform: `scale(${size / 180})`,
                    padding: '10px',
                    borderRadius: '200px',
                    backgroundColor: category?.color,
                    position: 'relative',
                    top: '-30px',
                    right: '-45px'
                }}
                color='#fff' width={20} height={20} />


        </div>

    )
})

export default ProfileImage

