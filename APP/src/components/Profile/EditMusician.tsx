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

    const inst = ['Κιθάρα', 'Μπάσο', 'Drums', 'Φλάουτο', 'Λαούτο', 'Βιολί', 'Τσέλο']



    const [current_inst, setCurrentInst] = useState<any>(props?.data?.instruments.map((item: any) => item.name))
    const [missing_inst, setMissingInst] = useState<any>(inst.filter((i: any) => !current_inst.includes(i)))
    const [addedInstruments, setAddedInstruments] = useState<any[]>([])

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


    const add_new_instruments = () => {

        for (let index = 0; index < addedInstruments.length; index++) {

            let finalData = {
                name: addedInstruments[index],
                musician: props?.data?.musicianId
            }

            let add_inst = new Call(Routes.instruments.add, 'POST', finalData)
            add_inst
                .POST()
                .then((res) => {
                    console.log(res);
                    setAddedInstruments([])
                    for (let index = 0; index < addedInstruments.length; index++) {
                        const element = addedInstruments[index];
                        setCurrentInst([...current_inst, element])

                    }
                })
                .catch((err) => console.warn(err))
        }

    }




    const addInstruments = (e: any) => {
        setAddedInstruments([...addedInstruments, e]);
        setMissingInst((prev: any) => prev.filter((value: any) => value !== e))
    }

    const removeInstruments = (e: any) => {
        setMissingInst([...missing_inst, e]);
        setCurrentInst((prev: any) => prev.filter((value: any) => value !== e))
        setAddedInstruments((prev: any) => prev.filter((value: any) => value !== e))
    }




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

                            <img src={`http://127.0.0.1:8000/${props?.data?.photo}`} width={200}
                                style={{ height: '218px', objectFit: 'cover', margin: '0 0 20px 0' }} />

                            <div className={CSS.updateImage}>
                                <button ><SvgIcon id={'upload-image'} color='#fff' />Ανέβασμα</button>
                                <button style={{ background: '#C65F5F' }}><SvgIcon id={'close'} color='#fff' width={20}/>Κατάργηση</button>
                            </div>

                        </div>


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


                {tab === 3 &&
                    <div style={{ display: 'flex', justifyContent: 'space-around', width: '100%' }}>

                        <div>

                            {current_inst
                                .map((item: any, index: number) => (
                                    <div key={index} className={'items-inline'} onClick={() => removeInstruments(item)}>
                                        <SvgIcon id='remove' /> {item}
                                    </div>
                                ))}


                            {addedInstruments

                                .map((item: any, index: number) => (
                                    <div key={index} className={'items-inline'} onClick={() => removeInstruments(item)}>
                                        <SvgIcon id='remove' />  {item}
                                    </div>
                                ))}
                        </div>

                        <div>

                            {missing_inst
                                .filter((i: any) => !current_inst.includes(i))
                                // .filter((i: any) => !addedInstruments.includes(i))
                                .map((item: any, index: number) => (
                                    <div key={index} className={'items-inline'} onClick={() => addInstruments(item)}>
                                        <SvgIcon id='insert' /> {item}</div>
                                ))}



                            <button onClick={add_new_instruments}>add them</button>
                        </div>


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