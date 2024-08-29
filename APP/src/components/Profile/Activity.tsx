import { useState, useEffect, useContext } from 'react'

// CSS
import CSS from '../../css/Profile/Activity.module.css'

// components
// import Modal from '../Modal'
import AllPosts from '../AllPosts'
// import NewPost from './NewPost'
// import NewEvent from './NewEvent'
import Location from './Location'
import SvgIcon from '../SvgIcon'

// context
import ProfileContext from '../../context/ProfileContext'


export default function Activity(props: any) {


    let { profile_id, currentProfile, DOM, setDOM }: any = useContext(ProfileContext)


    let [activeTab, setActiveTab] = useState<string>('posts')
    // let [createNew, setCreateNew] = useState<boolean>(false)
    // let [modalTitle, setModalTitle] = useState<string>('')




    useEffect(() => {
        setActiveTab('posts')
    }, [profile_id])

    let tabs = [
        { id: [1, 2, 3, 4, 5], label: "Δημοσιεύσεις", tab: "posts", onClick: () => setActiveTab("posts"), icon: 'location' },
        { id: [1, 2, 5], label: "Εκδηλώσεις", tab: "events", onClick: () => setActiveTab("events"), icon: 'location' },
        { id: [3, 4, 5], label: "Τοποθεσία", tab: "location", onClick: () => setActiveTab("location"), icon: 'location' },
    ]

    // console.log(profile)


    return (


        <section className={CSS.activityContainer}>


            {/* CREATE NEW SECTION */}
            {/* <Modal
                open={createNew}
                close={() => setCreateNew(false)}
                withContainer={true}
                title={modalTitle}
                btn >
                {modalTitle === 'Νέα Δημοσίευση' &&
                    <NewPost category={currentProfile?.category}
                        close={() => {
                            // setDOM(!DOM);
                            setDOM(!DOM)
                            setCreateNew(false)
                        }}
                        profile_id={currentProfile?.profileId} />}

                {modalTitle === 'Νέα Εκδήλωση' && <NewEvent created_by={currentProfile?.profileId} />}

            </Modal> */}


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

                    <Location latitude={currentProfile?.latitude} longitude={currentProfile?.longitude} />
                }
            </section>



        </section>




    )
}