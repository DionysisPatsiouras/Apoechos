import { forwardRef } from 'react'
import { Link } from 'react-router-dom'

import pic from '../media/musician.png'
import CSS from '../../css/Discover/Card.module.css'

const Card = forwardRef(function Card(props: any, ref) {


    return (
        <div
            className={CSS.card}
            style={{ 'backgroundColor': props.color }}>

            <div className={CSS.cardWhitePart}>
                <img className={CSS.signatureIcon}
                    // style={{ 'marginRight': props.data.category === 'musician' ? '-18px' : '-5px', 'marginTop': props.data.category === 'musician' ? '-10px' : '-5px' }}
                    alt='Category Icon'
                // src={require(`../media/icons/profiles/light/${props.data.category}.svg`)} 
                />
                
                <div className={CSS.profileInfo}>

                    <img
                        // src={props.data.photo != null ? `http://127.0.0.1:8000/${props.data.photo}` : pic}
                        width={84} height={84}
                        alt='Profile' />

                    <h6 className={CSS.profileTitle}>
                        {props?.artistic_nickname}</h6>
                </div>

                {/* <b>{props.data.city}</b> */}

                {/* <Link to={`/profiles/${props.data.category}/${props.data.id}`} >
                    <button className={css.seeProfileButton}>See profile</button>
                </Link> */}
            </div>

        </div>
    );
});

export default Card
