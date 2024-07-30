import { useState, useEffect, useContext } from 'react'

// CSS
import CSS from '../../css/Profile/Profile.module.sass'

// components
import Modal from '../Modal'
import AllPosts from '../AllPosts'
import NewPost from './NewPost'
import NewEvent from './NewEvent'
import Location from './Location'

// context
import ProfileContext from '../../context/ProfileContext'


export default function Activity(props: any) {


    let { profile_id, currentProfile, DOM, setDOM }: any = useContext(ProfileContext)


    let [activeTab, setActiveTab] = useState<string>('posts')
    let [createNew, setCreateNew] = useState<boolean>(false)
    let [modalTitle, setModalTitle] = useState<string>('')


    const new_entry = (title: string) => {
        setCreateNew(true)
        setModalTitle(title)
    }


    useEffect(() => {
        setActiveTab('posts')
    }, [profile_id])

    let tabs = [
        { id: [1, 2, 3, 4, 5], label: "Δημοσιεύσεις", tab: "posts", onClick: () => setActiveTab("posts") },
        { id: [1, 2, 5], label: "Εκδηλώσεις", tab: "events", onClick: () => setActiveTab("events") },
        { id: [3, 4, 5], label: "Τοποθεσία", tab: "location", onClick: () => setActiveTab("location") },
    ]

    // console.log(profile)


    return (


        <section style={{width: '50%', padding: '10px 40px'}}>
            {/* FIXED BUTTONS */}
            {props?.canEdit &&
                <div className={CSS.create_new}>
                    <p onClick={() => new_entry('Νέα Δημοσίευση')}>+ Νέα δημοσίευση</p>
                    <p onClick={() => new_entry('Νέα Εκδήλωση')}>+ Νέα εκδήλωση</p>
                </div>
            }


            {/* CREATE NEW SECTION */}
            <Modal
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

            </Modal>


            <ul className={CSS.wall_list}>


                {tabs
                    .filter((tab: any) => tab.id.includes(currentProfile?.category?.id))
                    .map((tab: any, index: number) => (
                        <li
                            key={index}
                            className={activeTab === tab?.tab ? CSS.active : undefined}
                            onClick={tab?.onClick}>
                            {tab.label}
                        </li>
                    ))}
            </ul>

            <section style={{ display: 'flex', width: '100%', gap: '20px', flexDirection: 'column' }}>


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