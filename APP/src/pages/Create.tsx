import CSS from '../css/Create/Create.module.sass'
import { useEffect, useState, useContext } from 'react'

// import { useContext } from 'react'
import { Link } from 'react-router-dom'

// import AuthContext from '../context/AuthContext'
import UserContext from '../context/UserContext'

import Call from '../utils/Call'
import { Routes } from '../utils/Routes'
import SvgIcon from '../components/SvgIcon'

export default function Create() {

    let { myProfiles }: any = useContext(UserContext)

    const [active, setActive] = useState<string>('')
    const [categories, setCategories] = useState<any[]>([])


    const get_categories = new Call(Routes.profiles.categories, 'GET')
    const [hasMusician, setHasMusician] = useState<any[]>([])
    let my_profiles = myProfiles[1]


    useEffect(() => {

        get_categories
            .GET()
            .then((res) => setCategories(res))
            .catch((err) => console.warn(err))

        setHasMusician(my_profiles && my_profiles.map((i: any) => i.category.name === "Musician" ? true : false))

    }, [myProfiles])




    return (
        <div className='space'>
            <div className={`${CSS.mainContainer} container`}>

                <div className={CSS.head}>
                    <h5 className={CSS.title}>Δημιουργία προφίλ</h5>
                    <p className={CSS.desc}>Δεν υπάρχει όριο στο πόσα προφιλ μπορείς να φτιάξεις!</p>

                </div>

                <hr className='divider'></hr>

                <div style={{ 'padding': '35px' }}>

                    {categories !== undefined && myProfiles &&
                        categories
                            .filter((category: any) => hasMusician?.includes(true) ? category.name !== "Musician" : category.name !== "")
                            .map((category: any) => (
                                <div key={category.id} className={CSS.selectionContainer}>

                                    <div className={CSS.selection}
                                        onClick={() => setActive(category.name)}
                                        style={{ backgroundColor: active === category.name ? category.color : '#EFEEEE' }}
                                    >
                                        <SvgIcon
                                            id={category.icon}
                                            style={{ position: 'absolute', marginLeft: '-200px' }}
                                            color={active === category.name ? '#ffffff' : '#000000'} />
                                        <p style={{ color: active === category.name ? '#ffffff' : '#6B6767' }}>{category.name}</p>
                                    </div>
                                    <p className={CSS.desktopDescription}
                                        style={{ color: active === category.name ? '#565656' : '#9A9A9A' }}>
                                        {category?.description}</p>

                                </div>


                            ))}



                </div>

                <div className={CSS.buttonSection}>Text here...
                    <Link to={`/create/new_profile?category=${active}`}><button>Επόμενο</button></Link>
                </div>




            </div>
        </div>
    )
}