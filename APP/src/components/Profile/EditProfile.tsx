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

    const [tab, setTab] = useState<number>(0)


    const updateProfile = (data: any) => {

        const update_profile = new Call(Routes.profiles.update(profile?.profileId), 'PATCH', data)

        update_profile
            .PATCH()
            .then(() => { props?.close() })
            .catch((err) => console.warn(err))
    }


    let edit_menu = [
        { icon: 'account', label: 'Στοιχεία', category: 'All'},
        { icon: 'genres', label: 'Είδη', category: 'Musician' },
        { icon: 'keys', label: 'Όργανα', category: 'Store' },


    ]

    // console.log(props.profile)



    return (
        <section style={{ margin: '-30px' }}>

            <ul className={CSS.tabs}>

                {edit_menu
                    .filter((i:any) => i.category === profile?.category?.name || i.category === 'All')
                    .map((item: any, index: number) => (
                        <li key={index}
                        style={{width :  '100%' }}
                            className={tab === index ? CSS.active_tab : CSS.tab}
                            onClick={() => setTab(index)}>

                            <SvgIcon id={item.icon} color={tab === index ? '#fff' : '#000'} width={20} height={20} />
                            {item.label}
                        </li>
                    ))}

            </ul>

            <form onSubmit={handleSubmit(updateProfile)} className={CSS.edit_form}>

                {tab === 0 &&

                    <div className={CSS.info_stats}>

                        <div className='items-inline' style={{ gap: '25px', alignItems: 'flex-start' }}>

                            <img src={`http://127.0.0.1:8000/${profile?.photo}`} width={200} alt='profile'
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
                        <FormError value={errors?.name} />

                        {/* <select className={CSS.city_dropdown} {...register('city')}>
                            {cities.map((city: any, index: number) => (
                                <option key={index} value={city}>{city}</option>
                            ))}
                        </select> */}
                        <textarea
                            placeholder='Λίγα λόγια για εσάς..'
                            defaultValue={profile?.bio}
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