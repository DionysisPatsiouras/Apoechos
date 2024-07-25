import { forwardRef, useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import CSS from '../../css/Discover/Card.module.css'
import SvgIcon from '../SvgIcon'
import img from '../../utils/img/default_img.png'
import Modal from '../Modal'

import NewMessageWindow from '../Messages/NewMessageWindow'

const Card = forwardRef(function Card(props: any, ref) {


    let profile = props?.data
    const [modal, setModal] = useState<boolean>(false)



    return (
        <div className={CSS.card} style={{ 'backgroundColor': profile?.category?.color }}>

            <Modal open={modal} withContainer title='Νέο μήνυμα' btn close={() => setModal(false)}>
                <NewMessageWindow receiver={profile} close={() => setModal(false)}/>
            </Modal>


            <div className={CSS.cardWhitePart}>

                <div className={CSS.signatureIcon}>

                    <SvgIcon id={profile?.category?.icon} color={'#ffffff'}
                        style={{ 'margin': profile?.category?.icon === 'musician' ? '-5px -6px 0 0' : null }} />
                </div>


                <div className={CSS.profileInfo}>

                    <img
                        src={profile.photo != null ? `http://127.0.0.1:8000/${profile?.photo}` : img}
                        width={84} height={84}
                        alt='Profile' />


                    <h6 className={CSS.profileTitle}>{profile?.name}</h6>


                </div>

                <section className={CSS.location}>
                    {profile?.city?.name}
                </section>


                <div className={CSS.btn_section}>
                    <div
                        className={`${CSS.messageIcon} cursor-pointer blue_btn`}

                        onClick={() => setModal(!modal)}>
                        <SvgIcon id='messages' color='#fff' width={20} />
                    </div>

                    <Link to={`/profile/${profile?.profileId}`} >
                        <button className={'cursor-pointer blue_btn'}>Περισσότερα</button>
                    </Link>
                </div>


            </div>

        </div>
    );
});

export default Card
