import SvgIcon from '../SvgIcon'
import CSS from '../../css/Homepage/Homepage.module.css'
import { Link } from 'react-router-dom'

interface Props {
    img: any;
    icon: string;
    text: string;
    title: string;
    color: any;
    id: string;

}

export default function ProfileSection({ img, icon, text, title, color, id }: Props) {

    return (
        <section id={id} className={`${CSS.profileSection} items-inline`}>


            <img src={img} width={200} />

            <div className={CSS.mainContent}>
                <div className='items-inline' style={{ alignItems: 'center', gap: '15px' }}>
                    <SvgIcon id={icon} color='#fff' width={25} height={25} style={{ backgroundColor: color, borderRadius: '200px', padding: '7px' }} />
                    <h2 style={{ color: color }}>{title}</h2>
                </div>
                <br></br>
                <p>{text}</p>
                <br></br>
                <Link to='/register'>

                    <button className='btn blue_btn'>Εγγράψου!</button>
                </Link>
            </div>




        </section>
    )
}