import CSS from '../css/Discover/Discover.module.css'
import { useState, useContext, useEffect } from 'react'
import { Colors } from '../App'

// components
import Tab from '../components/Discover/Tab'
import SvgIcon from '../components/SvgIcon'
import Card from '../components/Discover/Card'

// utils
import Call from '../utils/Call'
import { Routes } from '../utils/Routes'
import SearchValidation from '../utils/SearchValidation'

export default function Discover() {

    const [data, setData] = useState<any>([])
    const [search, setSearch] = useState<string>('')


    const [selected, setSelected] = useState<any>([])

    const [activeTab, setActiveTab] = useState('Everything')
    const [onHover, setOnHover] = useState('')

    const [filtered_genres, setFiltered_genres] = useState<string[]>([])

    const musicians = new Call(Routes.profiles.everything, 'GET')

    let all_genres = ['Rock', 'Metal', 'Stoner']


    useEffect(() => {



        musicians
            .GET()
            .then((res) => {
                console.log(res)
                setData(res[0]);
                setSelected(
                    activeTab === 'Musicians' ? res[0]?.musicians :
                        activeTab === 'Music Studio' ? res[0]?.studios :
                            res[0].everything
                )
            })
            .catch((err) => console.warn(err))


    }, [activeTab])

    const color = useContext<any>(Colors)
    // console.warn(color)
    // console.warn(filtered_genres)

    let tabs: any = [
        { label: 'Everything', color: 'black' },
        { label: 'Musicians', color: color?.musician },
        { label: 'Bands', color: color?.band },
        { label: 'Music Studio', color: color?.studio },
        { label: 'Music Stores', color: color?.store },
        { label: 'Live Stages', color: color?.stage },
    ]


    const pickColor = (category: string) => {
        switch (category) {
            case 'musician':
                return color?.musician
            case 'studio':
                return color?.studio
            case 'store':
                return color?.store
            default:
                break;
        }
    }

    // console.log(selected)
    const filteredData =
        selected
            .filter((data: any) =>
                SearchValidation(data?.artistic_nickname, search) || SearchValidation(data?.title, search)
            )



    const handleCheckBox = (event: any) => {
        const { value, checked } = event.target;

        setFiltered_genres((prevCategories: any) =>
            checked
                ? [...prevCategories, value]
                : prevCategories.filter((allGroups: any) => allGroups !== value)
        );

    };

    return (
        <div className={CSS.container}>

            <section className={CSS.filters}>

                <h3>Περιοχή</h3>
                <ul style={{ 'display': 'flex', 'flexDirection': 'column', 'alignItems': 'center' }}>


                    {all_genres.map((genre: string) => (
                        <div key={genre}>
                            <label htmlFor={genre}>{genre}</label>
                            <input
                                id={genre}
                                type='checkbox'
                                value={genre}
                                onChange={handleCheckBox}
                                checked={filtered_genres.includes(genre)}

                            />
                        </div>
                    ))}
                </ul>

            </section >



            <section className={CSS.cards_container}>



                <ul className={CSS.profiles_menu}>

                    {tabs.map((tab: any, index: number) => (
                        <Tab
                            key={index}
                            label={tab.label}
                            color={tab.color}
                            onMouseEnter={() => setOnHover(tab.label)}
                            onMouseLeave={() => setOnHover('')}
                            onClick={() => { setActiveTab(tab.label); setSelected(data[0].musicians) }}

                            activeTab={activeTab}
                            onHover={onHover}
                        />
                    ))}
                </ul>

                <section className={CSS.search}>

                    <div className={CSS.left_section}>
                        <SvgIcon id='search' />
                        <input type='text' placeholder='Αναζήτηση...' onChange={(e) => setSearch(e.target.value)} />
                    </div>


                    <p>Αποτελέσματα: {filteredData.length}</p>
                </section>

                <section className={CSS.all_cards}>
                    {filteredData?.map((item: any, index: number) => (

                        <Card
                            key={index}
                            id={item?.musicianId || item?.studioId}
                            category={item?.category}
                            city={item?.city}
                            photo={item?.photo}
                            artistic_nickname={item?.artistic_nickname || item?.title}
                            color={pickColor(item?.category)}
                        />
                    ))}
                </section>
            </section>


        </div>
    )
}