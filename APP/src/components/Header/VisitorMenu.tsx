import { Link } from 'react-router-dom'

export default function VisitorMenu() {

    return (
        <>
            <ul>
                <Link to="/">Αρχική</Link>
                <Link to="/discover">Ανακάλυψε</Link>
                <Link to='/events'>Εκδηλώσεις</Link>
            </ul>
            <ul>
                <Link to='/login'>Σύνδεση</Link>
                <Link to='/register'>Εγγραφή</Link>
            </ul>
        </>

    )
}