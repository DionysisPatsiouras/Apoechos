import { forwardRef, useState } from 'react'
import { Link } from 'react-router-dom'

import CSS from '../../css/Discover/Card.module.css'
import SvgIcon from '../SvgIcon'
import img from '../../utils/img/default_img.png'
import Modal from '../Modal'
import { useForm } from 'react-hook-form'
import Button from '../Button'
import Call from '../../utils/Call'
import { Routes } from '../../utils/Routes'


const Card = forwardRef(function Card(props: any, ref) {


    let profile = props?.data
    const [modal, setModal] = useState<boolean>(false)

    const form = useForm()
    const { register, handleSubmit, formState, watch } = form
    const { errors } = formState

    // console.log(modal)

    const send_Message = (formData:any) => {
        console.log(formData)

        const data = {
            ...formData,
            sender: 'PROFILE10804455090',
            receiver: profile?.profileId,
            
        }

        // console.log(data)
        const add_new_message = new Call(Routes.messages.new, 'POST', data)

        add_new_message
            .POST()
            .then((res) => {
                console.log(res);
                
   
               
            })
            .catch((err) => console.warn(err))
        
    }

    console.log(profile?.profileId)

    return (
        <div className={CSS.card} style={{ 'backgroundColor': profile?.category?.color }}>

      

            <Modal open={modal} withContainer title='Νέο μήνυμα' btn close={() => setModal(false)}>

                apostolh ws: 
                <form  onSubmit={handleSubmit(send_Message)} noValidate >
                {profile?.name}
                    <input type='text' {...register('message', {

                        required: "Υποχρεωτικό πεδίο"
                    }
                    )} />
                    {/* <button type='submit' className='blue_btn btn'>Αποστολή μηνύματος</button> */}
                    <Button label='Αποστολή' icon='send' type='configure'/>
                </form>


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
                    <div className='cursor-pointer blue_btn' onClick={() => setModal(!modal)}>
                        <SvgIcon id='messages' color='#fff' />
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
