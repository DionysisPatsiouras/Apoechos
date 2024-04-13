import { forwardRef } from 'react'
import { Link } from 'react-router-dom'

import CSS from '../../css/Discover/Card.module.css'
import SvgIcon from '../SvgIcon'
import img from '../../../src/img.png'

const Card = forwardRef(function Card(props: any, ref) {


    return (
        <div className={CSS.card} style={{ 'backgroundColor': props?.color }}>


            <div className={CSS.cardWhitePart}>

                <div className={CSS.signatureIcon}>
                    <SvgIcon id={props?.category} color={'#ffffff'}
                        style={{ 'margin': props?.category === 'musician' ? '-5px -6px 0 0' : null }} />
                </div>


                <div className={CSS.profileInfo}>

                    <img
                        src={props.photo != null ? `http://127.0.0.1:8000/${props.photo}` : img}
                        width={84} height={84}
                        alt='Profile image' />

                    <h6 className={CSS.profileTitle}>
                        {props?.artistic_nickname}</h6>
                </div>

                <section className={CSS.location}>
                    {props?.city}
                </section>



                <div className={CSS.btn_section}>
                    <Link to={`/profile/${props?.category}/${props.id}`} >
                        <button>Περισσότερα</button>
                    </Link>
                </div>


            </div>

        </div>
    );
});

export default Card
