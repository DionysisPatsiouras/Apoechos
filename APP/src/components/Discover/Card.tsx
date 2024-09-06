import { forwardRef, useState } from 'react'
import { Link } from 'react-router-dom'

import CSS from '../../css/Discover/Card.module.css'
import SvgIcon from '../SvgIcon'
import Modal from '../Modal'

import NewMessageWindow from '../Messages/NewMessageWindow'

const Card = forwardRef(function Card(props: any, ref) {


    let profile = props?.data
    const [modal, setModal] = useState<boolean>(false)



    return (
        <div className={CSS.card} style={{ 'backgroundColor': profile?.category?.color }}>

            <Modal open={modal} withContainer title='Νέο μήνυμα' btn close={() => setModal(false)}>
                <NewMessageWindow receiver={profile} close={() => setModal(false)} />
            </Modal>


            <div className={CSS.cardWhitePart}>

                <div className={CSS.signatureIcon}>

                    <SvgIcon id={profile?.category?.icon} color={'#ffffff'}
                        style={{ 'margin': profile?.category?.icon === 'musician' ? '-5px -6px 0 0' : null }} />
                </div>


                <div className={CSS.profileInfo}>

                    <img
                        src={`http://127.0.0.1:8000/${profile?.photo}`}
                        width={84} height={84}
                        alt='Profile' />

                    <b className={CSS.profileTitle}>{profile?.name}</b>
                    <small className={CSS.location}>{profile?.city?.name}</small>


                </div>




                <div className={CSS.btn_section}>
                    <div className={CSS.btn} style={{ borderRight: '1px solid #E9E9E9' }} onClick={() => setModal(!modal)}>
                        <SvgIcon id='send' color='#5F69C6' width={20} />
                    </div >
                    <Link to={`/profile/${profile?.profileId}`} className={CSS.btn} >
                        <div>
                            <SvgIcon id='view' color='#5F69C6' width={20} />
                        </div>
                    </Link>
                    {/* <div style={{width: '100%'}}>
                        <p>Προβολή</p>
                    </div> */}



                    {/* <div
                        className={`${CSS.messageIcon} cursor-pointer blue_btn`}
                        onClick={() => setModal(!modal)}>
                        <SvgIcon id='send' color='#fff' width={20} />
                    </div>

                    <Link to={`/profile/${profile?.profileId}`} >
                        <button className={'cursor-pointer blue_btn'}>Προβολή</button>
                    </Link> */}
                </div>


            </div>

        </div>
    );
});

export default Card
