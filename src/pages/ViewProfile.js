import { React, useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router';
import { SignatureColors } from '../App';
import axios from 'axios'

import style from '../style/ViewProfile.module.css'
import messageIcon from '../media/icons/messagesLight.svg'


import musicianLight from '../media/icons/profiles/light/musician.svg'
import bandLight from '../media/icons/profiles/light/band.svg'
import studioLight from '../media/icons/profiles/light/studio.svg'
import stageLight from '../media/icons/profiles/light/stage.svg'
import storeLight from '../media/icons/profiles/light/store.svg'

import expand_icon from '../media/icons/expand.svg'
import minimize_icon from '../media/icons/minimize.svg'



export default function ViewProfile() {

    const color = useContext(SignatureColors)

    const [data, setData] = useState([])
    const [active, setActive] = useState('bio')
    const [content, setContent] = useState('')

    useEffect(() => {
        axios
            .get('http://127.0.0.1:8000/profiles/' + params.category + '/' + params.id)
            .then((response) => setData(response.data))
    }, [])




    const params = useParams();
    return (
        <div className={style.container}>

            <div className={style.top}>
                <div className={style.overview}>
                    <img
                        className={style.signatureIcon}
                        style={{ 'marginRight': data.category === 'musician' ? '-18px' : '-5px' }}
                        alt='Category Icon'
                        src={data.category === 'musician' ? musicianLight :
                            data.category === 'band' ? bandLight :
                                data.category === 'studio' ? studioLight :
                                    data.category === 'store' ? storeLight :
                                        data.category === 'stage' ? stageLight :
                                            null} />

                    <div className={style.whiteBackground}
                        style={{
                            'backgroundColor':
                                data.category === 'musician' ? color.musician :
                                    data.category === 'band' ? color.band :
                                        data.category === 'studio' ? color.studio :
                                            data.category === 'store' ? color.store :
                                                data.category === 'stage' ? color.stage :
                                                    null
                        }}>


                        <img src={'http://127.0.0.1:8000/' + data.photo} className={style.profilePicture} alt='profile' />
      
                        {console.log('http://127.0.0.1:8000/' + data.photo)}
                    </div>  
                </div>





                <div className={style.interaction}>
                    <p className={style.title}>{data.name || data.first_name + ' ' + data.last_name}</p>
                    <div className={style.buttons}>
                        <button className={style.likeBtn}>Like</button>
                        <button className={style.sendMsg}><img src={messageIcon} alt='message' width={28} /></button>
                    </div>
                </div>



            </div>
            {console.log(data)}



            <ul className={style.infoMenu}>


                {data.bio ?
                    <div className={style.listItem}>
                        <li onClick={() => setActive('bio')}>
                            Bio
                            <div className={style.expandMinimize}>
                                {content === 'bio' ?
                                    <p onClick={() => setContent('')} className={style.expand}>Tap to hide</p> :
                                    <p onClick={() => setContent('bio')} className={style.expand}>Tap to expand</p>}
                                <img src={content === 'bio' ? minimize_icon : expand_icon} width={25} height={25} alt='expand/minimize'/>
                                <p>{data.bio}</p>
                            </div>
                        </li>

                        <div
                            style={{ 'padding': content === 'bio' ? '30px' : '0px', 'display' : content ==='bio' ? 'block' : 'none' }}>
                            {active === 'bio' ? data.bio : null}
                        </div>
                    </div>

                    : null
                }


                {data.websiteLink ?
                    <div className={style.listItem}>
                        <li onClick={() => setActive('contact')}>
                            Contact
                            <div className={style.expandMinimize}>
                                {content === 'contact' ?
                                    <p onClick={() => setContent('')} className={style.expand}>Tap to hide</p> :
                                    <p onClick={() => setContent('contact')} className={style.expand}>Tap to expand</p>}
                                <img src={content === 'contact' ? minimize_icon : expand_icon} width={25} height={25} alt='expand/minimize'/>
                            </div>
                        </li>
                        <div
                            style={{ 'padding': content === 'contact' ? '30px' : '0px', 'display' : content ==='contact' ? 'block' : 'none' }}>
                            {active === 'contact' ? data.websiteLink : null}
                        </div>
                    </div>

                    : null
                }




            </ul >


        </div >
    )
}
