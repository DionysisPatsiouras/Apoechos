import { useForm } from 'react-hook-form'
import CSS from '../../css/Profile/EditMusician.module.sass'
import FormError from '../../utils/FormError'
import Call from '../../utils/Call'
import { Routes } from '../../utils/Routes'
import { useState } from 'react'
import SvgIcon from '../SvgIcon'
import { cities } from '../../utils/MusicianUtils'

export default function EditMusician(props: any) {


    const form = useForm()
    const { register, handleSubmit, formState, watch } = form
    const { errors } = formState


    const [tab, setTab] = useState<number>(1)


    const updateProfile = (data: any) => {


        const patchMusician = new Call(Routes.musician.patch(props?.data?.musicianId), 'PATCH', data)

        patchMusician
            .PATCH()
            .then(() => {
                props?.close()
            })
            .catch((err) => console.warn(err))


    }



    return (
        <section className={CSS.container}>

            <ul className={CSS.tabs}>
                <li className={tab === 1 ? CSS.active_tab : CSS.tab} onClick={() => setTab(1)}>
                    <SvgIcon id='account' color={tab === 1 ? '#fff' : '#000'} width={20} height={20} />
                    Στοιχεία
                </li>
                <li className={tab === 2 ? CSS.active_tab : CSS.tab} onClick={() => setTab(2)}>
                    <SvgIcon id='account' color={tab === 2 ? '#fff' : '#000'} width={20} height={20} />
                    Είδη
                </li>
                <li className={tab === 3 ? CSS.active_tab : CSS.tab} onClick={() => setTab(3)}>
                    <SvgIcon id='account' color={tab === 3 ? '#fff' : '#000'} width={20} height={20} />
                    Όργανα
                </li>
            </ul>

            <form onSubmit={handleSubmit(updateProfile)} className={CSS.edit_form}>

                {tab === 1 &&

                    <div>

                        <input
                            defaultValue={props?.data?.artistic_nickname}
                            {...register('artistic_nickname', {
                                required: 'Υποχρεωτικό πεδίο'
                            })}
                        />
                        <FormError value={errors?.artistic_nickname} />

                        <select className={CSS.city_dropdown} {...register('city')}>
                            {cities.map((city: any, index: number) => (
                                <option key={index} value={city}>{city}</option>
                            ))}
                        </select>
                        <textarea

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