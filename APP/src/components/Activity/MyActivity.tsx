import { useState, useEffect, useContext } from 'react'

// CSS
import CSS from '../../css/Profile/Activity.module.css'

// components
import AllPosts from '../AllPosts'
import Location from '../Profile/Location'
import SvgIcon from '../SvgIcon'

// context
import ProfileContext from '../../context/ProfileContext'
import MyEvents from '../Events/MyEvents'


export default function MyActivity(props: any) {


    let { profile_id, currentProfile }: any = useContext(ProfileContext)
    let [activeTab, setActiveTab] = useState<string>('posts')


    useEffect(() => {
        setActiveTab('posts')
    }, [profile_id])

    let tabs = [
        { id: [1, 2, 3, 4, 5], label: "Δημοσιεύσεις", tab: "posts", onClick: () => setActiveTab("posts"), icon: 'post' },
        { id: [1, 2, 5], label: "Εκδηλώσεις", tab: "events", onClick: () => setActiveTab("events"), icon: 'calendar' },
        { id: [3, 4, 5], label: "Τοποθεσία", tab: "location", onClick: () => setActiveTab("location"), icon: 'location' },
    ]

    // console.log(profile)


    return (


        <section className={CSS.activityContainer}>


            <ul className={CSS.wall_list}>
                {tabs
                    .filter((tab: any) => tab.id.includes(currentProfile?.category?.id))
                    .map((tab: any, index: number) => (
                        <li
                            key={index}
                            className={activeTab === tab?.tab ? CSS.active : undefined}
                            onClick={tab?.onClick}>
                            <p>{tab.label}</p>
                            <SvgIcon id={tab.icon} color='#fff' />
                        </li>
                    ))}
            </ul>

            <section className={CSS.activityBody} >


                {activeTab === 'posts' &&
                    <AllPosts can_edit={props?.canEdit} />
                }

                {activeTab === 'location' &&

                    <Location
                        latitude={currentProfile?.latitude}
                        longitude={currentProfile?.longitude}
                        description={currentProfile?.address}
                    />
                }

                {activeTab === 'events' && 
                
                    <MyEvents />
                }
            </section>



        </section>




    )
}