import { Link } from 'react-router-dom'
import CSS from '../../css/Header/Header.module.css'
export default function VisitorMenu() {

    return (
        <>
            <ul className={CSS.mainNavigation}>
                <Link to="/">Αρχική</Link>
                <Link to='/events'>Εκδηλώσεις</Link>
                <Link to="/map">Χάρτης</Link>
            </ul>
            <ul className={CSS.mainNavigation}>
                <Link to='/login'>Σύνδεση</Link>
                <Link to='/register'>Εγγραφή</Link>
            </ul>
        </>

    )
}