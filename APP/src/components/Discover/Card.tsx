import { forwardRef } from 'react'
import { Link } from 'react-router-dom'

import CSS from '../../css/Discover/Card.module.css'
import SvgIcon from '../SvgIcon'
import img from '../../utils/img/default_img.png'

const Card = forwardRef(function Card(props: any, ref) {

    // console.warn(props?.data)

    let profile = props?.data
    // console.log(profile)

    return (
        <div className={CSS.card} style={{ 'backgroundColor': profile?.category?.color }}>


            <div className={CSS.cardWhitePart}>

                <div className={CSS.signatureIcon}>
                    <SvgIcon id={profile?.category?.name.toLowerCase()} color={'#ffffff'}
                        style={{ 'margin': profile?.category?.name.toLowerCase() === 'musician' ? '-5px -6px 0 0' : null }} />
                </div>


                <div className={CSS.profileInfo}>

                    <img
                        src={profile.photo != null ? `http://127.0.0.1:8000/${profile?.photo}` : img}
                        width={84} height={84}
                        alt='Profile image' />


                    <h6 className={CSS.profileTitle}>{profile?.name}</h6>


                </div>

                <section className={CSS.location}>
                    {profile?.city?.name}
                </section>


                <div className={CSS.btn_section}>
                    <Link to={`/profile/${profile?.profileId}`} >
                        <button>Περισσότερα</button>
                    </Link>
                </div>


            </div>

        </div>
    );
});

export default Card
