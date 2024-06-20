import { useState } from 'react'
import { useForm } from 'react-hook-form'

// CSS
import CSS from '../../css/Profile/EditMusician.module.sass'

// local components
import FormError from '../../utils/FormError'
import SvgIcon from '../SvgIcon'

// utils
import Call from '../../utils/Call'
import { Routes } from '../../utils/Routes'


export default function EditProfile(props: any) {

    let profile = props?.profile
    const form = useForm()
    const { register, handleSubmit, formState } = form
    const { errors } = formState

    const [tab, setTab] = useState<number>(1)
   

    const updateProfile = (data: any) => {
 

        const update_profile = new Call (Routes.profiles.update(profile?.profileId), 'PATCH', data)

        update_profile
            .PATCH()
            .then(() => { props?.close() })
            .catch((err) => console.warn(err))
    }



    // console.log(props.profile)
   


    return (
        <section style={{ margin: '-30px' }}>

            <ul className={CSS.tabs}>
                <li className={tab === 1 ? CSS.active_tab : CSS.tab} onClick={() => setTab(1)}>
                    <SvgIcon id='account' color={tab === 1 ? '#fff' : '#000'} width={20} height={20} />
                    Στοιχεία
                </li>
                <li className={tab === 2 ? CSS.active_tab : CSS.tab} onClick={() => setTab(2)}>
                    <SvgIcon id='genres' color={tab === 2 ? '#fff' : '#000'} width={20} height={20} />
                    Είδη
                </li>
                <li className={tab === 3 ? CSS.active_tab : CSS.tab} onClick={() => setTab(3)}>
                    <SvgIcon id='keys' color={tab === 3 ? '#fff' : '#000'} width={20} height={20} />
                    Όργανα
                </li>
            </ul>

            <form onSubmit={handleSubmit(updateProfile)} className={CSS.edit_form}>

                {tab === 1 &&

                    <div className={CSS.info_stats}>

                        <div className='items-inline' style={{ gap: '25px', alignItems: 'flex-start' }}>

                            <img src={`http://127.0.0.1:8000/${props?.data?.photo}`} width={200} alt='profile'
                                style={{ height: '218px', objectFit: 'cover', margin: '0 0 20px 0' }} />

                            <div className={CSS.updateImage}>
                                <button ><SvgIcon id={'upload-image'} color='#fff' />Ανέβασμα</button>
                                <button style={{ background: '#C65F5F' }}><SvgIcon id={'close'} color='#fff' width={20} />Κατάργηση</button>
                            </div>

                        </div>


                        <input
                            placeholder='Όνομα'
                            defaultValue={profile?.name}
                            {...register('name', {
                                required: 'Υποχρεωτικό πεδίο'
                            })}
                        />
                        <FormError value={errors?.artistic_nickname} />

                        {/* <select className={CSS.city_dropdown} {...register('city')}>
                            {cities.map((city: any, index: number) => (
                                <option key={index} value={city}>{city}</option>
                            ))}
                        </select> */}
                        <textarea
                            placeholder='Λίγα λόγια για εσάς..'
                            defaultValue={props?.data?.bio}
                            {...register('bio')}
                        />
                    </div>

                }


             
                <div className={CSS.bottom_section}>


                    <button type='submit'>Αποθηκεύση</button>
                    <button type='reset' style={{ 'backgroundColor': '#9A9A9A' }} onClick={props?.close}>Ακύρωση</button>
                </div>
            </form>

        </section>
    )
}