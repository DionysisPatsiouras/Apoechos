import { forwardRef, useContext, useEffect, useState, useCallback } from 'react'

import CSS from '../../css/Discover/Card.module.css'
import img from '../../utils/img/default_img.png'
import { useForm } from 'react-hook-form'
import Button from '../Button'

import UtilsContext from '../../context/UtilsContext'


// utils
import Call from '../../utils/Call'
import { Routes } from '../../utils/Routes'
import FormError from '../../utils/FormError'


// props => receiver, close

const NewMessageWindow = forwardRef(function NewMessageWindow(props: any, ref: any) {


    const [senderId, setSenderId] = useState<string>('')

    let { my_profiles, get_my_profiles }: any = useContext(UtilsContext)

    const form = useForm()
    const { register, handleSubmit, formState, resetField, watch } = form
    const { errors } = formState



    useEffect(() => {
        get_my_profiles()

    }, [])

    let receiver = props?.receiver

    const send_Message = (formData: any) => {

        const data = {
            ...formData,
            sender: senderId,
            receiver: receiver?.profileId
        }

        // console.log(data)
        const add_new_message = new Call(Routes.messages.new, 'POST', data)

        add_new_message
            .POST()
            .then((res) => {
                console.log(res);
                resetField('message');
                props?.close()
                setSenderId('')
            })
            .catch((err) => console.warn(err))

    }

    return (

        <>
            <div className={CSS.mailHead}>
                <div className={CSS.mailProfile}>
                    <h3> Αποστολή ως:</h3>
                    <div className='items-inline' style={{ gap: '10px', flexWrap: 'wrap', flexDirection: 'row', paddingBottom: '16px' }}>
                        {my_profiles.map((i: any, index: number) => (
                            <div
                                key={index}
                                className={`cursor-pointer ${CSS.myProfilesImgs} ${i?.profileId === senderId ? CSS.selected : CSS.notSelected}`}
                                onClick={() => setSenderId(i?.profileId)}>
                                <img src={`http://127.0.0.1:8000/${i?.photo}`} />
                            </div>

                        ))}

                    </div>
                    {senderId === '' && <FormError value={'Επιλέξτε προφίλ'} />}

                </div>
                <div className={CSS.mailProfile}>
                    <h3>Προς:</h3>
                    <div className='items-inline' style={{ gap: '10px' }}>
                        <div className={CSS.myProfilesImgs}>


                            <img
                                src={`http://127.0.0.1:8000/${receiver?.photo}`}
                                width={84} height={84}
                                alt='Profile' />
                        </div>
                        <div >{receiver?.name} </div>
                    </div>
                </div>

            </div>
            <form onSubmit={handleSubmit(send_Message)} noValidate >

                <div className={`items-inline ${CSS.formInputs}`} >

                    <input
                        className={CSS.msgBody}
                        type='text'
                        placeholder='Γράψτε κάτι..'
                        {...register('message', {
                            required: "Υποχρεωτικό πεδίο",
                            maxLength: {
                                value: 50,
                                message: 'Πολύ μεγάλο κείμενο'
                            },
                            minLength: {
                                value: 3,
                                message: 'Πολύ μικρό κείμενο'
                            }
                        }
                        )} />

                    <Button label='Αποστολή' icon='send' type='configure' />

                </div>
                <FormError value={errors?.message} />
            </form>
        </>
    )
})

export default NewMessageWindow

