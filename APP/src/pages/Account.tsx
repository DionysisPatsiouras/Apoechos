import { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import CSS from '../css/Account/Account.module.css'
import Modal from '../components/Modal'

import AuthContext from '../context/AuthContext'
import FormError from '../utils/FormError'
import UpdatePassword from '../components/Account/UpdatePassword'

import Call from '../utils/Call'
import { Routes } from '../utils/Routes'
export default function Account() {

    let { logoutUser }: any = useContext(AuthContext)
    const form = useForm()
    const { register, formState, watch } = form
    const { errors } = formState


    const [modal, setModal] = useState<boolean>(false)


    const delete_account = () => {
        const data = { is_active: false }
        let update_user = new Call(Routes.user.patch, 'PATCH', data)
        update_user.PATCH().then((res) => {
            console.log('User deleted sucessfully');
            alert("O λογαριασμός σας απενεργοποιήθηκε με επιτυχία")
            logoutUser()
        }).catch((err) => console.warn(err))
    }


    return (
        <div className='space'>

            <Modal open={modal} title={'Απενεργοποίηση λογαριασμού'} withContainer >
                <div className={CSS.deleteBody}>


                    <h3>
                        <strong>
                            Είστε σίγουρος/η πως θέλετε να απενεργοποιήσετε τον λογαριασμό σας;
                        </strong>
                    </h3>
                    <p>Αν θέλετε να ενεργοποιήσετε ξανά τον λογαριασμό σας, μπορείτε να συνδεθείτε εντός 30 ημερών.
                        Μετά από 30 ημέρες η ενεργοποίηση είναι αδύνατη. </p>


                    <div className='items-inline' style={{ gap: '5px' }}>


                        <button className='red_btn btn' onClick={delete_account}>Διαγραφή</button>
                        <button className={`${CSS.cancelBtn} btn`} onClick={() => setModal(false)}>Άκυρο</button>
                    </div>

                </div>
            </Modal>

            <div className='container'>
                <h2>Ο Λογαριασμός μου</h2>
                <hr className='divider'></hr>

                <UpdatePassword />

                <hr className='divider'></hr>
                <section className={CSS.box}>
                    <h3>Απενεργοποίηση λογαριασμού</h3>
                    <strong>ΠΡΟΣΟΧΗ! <br></br>Αυτή η ενέργεια είναι οριστική. <br></br>Δεν θα μπορέσετε να επαναφέρετε το λογαριασμό σας</strong>
                    <button className='red_btn btn' onClick={() => setModal(true)}>Διαγραφή</button>
                </section>
            </div>

        </div >
    )
}