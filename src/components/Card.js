import { forwardRef } from 'react'
import { Link } from 'react-router-dom'
import css from '../style/Card.module.css'
import pic from '../media/musician.png'

const Card = forwardRef(function Card(props, ref) {


    return (
        <div
            className={css.card}
            style={{
                'backgroundColor': props.data.category === 'musician' ?
                    props.color.musician : props.data.category === 'band' ?
                        props.color.band : props.data.category === 'studio' ?
                            props.color.studio : props.data.category === 'store' ?
                                props.color.store : props.data.category === 'stage' ?
                                    props.color.stage : null
            }}>

            <div className={css.cardWhitePart}>
                <img className={css.signatureIcon}
                    style={{ 'marginRight': props.data.category === 'musician' ? '-18px' : '-5px', 'marginTop': props.data.category === 'musician' ? '-10px' : '-5px' }}
                    alt='Category Icon'
                    src={require(`../media/icons/profiles/light/${props.data.category}.svg`)} />

                <div className={css.profileInfo}>

                    <img
                        src={props.data.photo != null ? `http://127.0.0.1:8000/${props.data.photo}` : pic}
                        width={84} height={84}
                        alt='Profile' />

                    <h6 className={css.profileTitle}>{props.data.title || props.data.name || props.data.artistic_nickname}</h6>
                </div>

                <b>{props.data.city}</b>

                <Link to={`/profiles/${props.data.category}/${props.data.id}`} >
                    <button className={css.seeProfileButton}>See profile</button>
                </Link>
            </div>

        </div>
    );
});

export default Card
