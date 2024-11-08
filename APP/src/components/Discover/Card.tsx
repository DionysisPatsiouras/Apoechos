import { forwardRef, useState, useContext } from 'react'
import { Link } from 'react-router-dom'

import CSS from '../../css/Discover/Card.module.css'
import SvgIcon from '../SvgIcon'
import Modal from '../Modal'

import NewMessageWindow from '../Messages/NewMessageWindow'
import AuthContext from '../../context/AuthContext'

const Card = forwardRef(function Card(props: any, ref) {


    let profile = props?.data
    const [modal, setModal] = useState<boolean>(false)
    const { user }: any = useContext(AuthContext)



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
                        src={`${process.env.REACT_APP_API_URL}${profile?.photo}`}
                        width={84} height={84}
                        alt='Profile'
                        loading="lazy"
                    />

                    <b className={CSS.profileTitle}>{profile?.name}</b>
                    <small className={CSS.location}>{profile?.city?.name}</small>
                    {/* {profile?.address && <small className={CSS.location}>{profile?.address}</small>} */}



                </div>



                {user &&

                    <div className={CSS.btn_section}>

                        <div className={CSS.btn} style={{ borderRight: '1px solid #E9E9E9' }} onClick={() => setModal(!modal)}>
                            <SvgIcon id='send' color='#5F69C6' width={20} />
                        </div>


                        <Link to={`/profile/${profile?.profileId}`} className={CSS.btn} >
                            <SvgIcon id='view' color='#5F69C6' width={20} />
                        </Link>

                    </div>
                }



            </div>

        </div>
    )
})

export default Card
