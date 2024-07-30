import { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import CSS from '../css/Account/Account.module.css'
import Modal from '../components/Modal'

import AuthContext from '../context/AuthContext'
import FormError from '../utils/FormError'

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

    useEffect(() => {
        document.title = 'Apoechos - Λογαριασμός'
    }, [])

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



                <hr className='divider'></hr>
                <section className={CSS.box}>
                    <form noValidate>


                        <h3>Αλλαγή κωδικού</h3>
                        <input type='password' id='password'
                            placeholder='Νέος κωδικός'
                            {...register('password', {
                                required: 'Υποχρεωτικό πεδίο'
                            })}
                        />
                        <FormError value={errors?.password} />

                        <input className={CSS.inputs} type='password' id='confirm_password' placeholder='Επανάληψη νέου κωδικού'
                            {...register('confirm_password', {
                                required: 'Υποχρεωτικό πεδίο',
                                validate: (val) => {
                                    if (watch('password') !== val) {
                                        return 'Οι κωδικοί δεν ταιριάζουν'
                                    }
                                }
                            })} />

                        <FormError value={errors?.confirm_password} />

                        <button className='blue_btn btn'>Ενημέρωση</button>
                    </form>
                </section>


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