
import { useState, useEffect } from 'react'

import Modal from '../Modal'
import CSS from '../../css/Profile/Profile.module.sass'

import NewEvent from './NewEvent'
import NewPost from './NewPost'

// utils
import { Routes } from '../../utils/Routes'
import Call from '../../utils/Call'
import AllPosts from '../AllPosts'
import Location from './Location'


export default function Activity(props: any) {

    let profile_id = window.location.pathname.replace('/profile/', '')

    const [profile, setProfile] = useState<any>()

    let [activeTab, setActiveTab] = useState<string>('posts')

    let [createNew, setCreateNew] = useState<boolean>(false)
    let [updateDOM, setUpdateDOM] = useState<boolean>(false)
    let [modalTitle, setModalTitle] = useState<string>('')


    const new_entry = (title: string) => {
        setCreateNew(true)
        setModalTitle(title)
    }

    const get_profile = new Call(Routes.profiles.id(profile_id), 'GET')

    // console.log(props)
    useEffect(() => {

        get_profile
            .GET()
            .then((res: any) => {
                setProfile(res);
                setUpdateDOM(!updateDOM)
            })
            .catch((err) => console.warn(err))
        
        setActiveTab('posts')


    }, [props])

    let tabs = [
        { id: [1, 2, 3, 4, 5], label: "Δημοσιεύσεις", tab: "posts", onClick: () => setActiveTab("posts") },
        { id: [1, 2, 5], label: "Εκδηλώσεις", tab: "events", onClick: () => setActiveTab("events") },
        { id: [3, 4, 5], label: "Τοποθεσία", tab: "location", onClick: () => setActiveTab("location") },
    ]

    // console.log(profile)


    return (


        <section >
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
                    <NewPost category={profile?.category} close={() => setCreateNew(false)} profile_id={profile?.profileId} />}

                {modalTitle === 'Νέα Εκδήλωση' && <NewEvent created_by={profile?.profileId}/>}

            </Modal>


            <ul className={CSS.wall_list}>


                {tabs
                    .filter((tab: any) => tab.id.includes(profile?.category?.id))
                    .map((tab: any, index: number) => (
                        <li
                            key={index}
                            className={activeTab === tab?.tab ? CSS.active : undefined}
                            onClick={tab?.onClick}>
                            {tab.label}
                        </li>
                    ))}
            </ul>

            <section style={{display: 'flex', width: '500px', gap: '20px', flexDirection: 'column'}}>


                {activeTab === 'posts' &&
                    <AllPosts id={profile?.profileId} can_edit={props?.canEdit} updateDOM={() => setUpdateDOM(!updateDOM)} />
                }

                {activeTab === 'location' && 
                
                    <Location latitude={profile?.latitude} longitude={profile?.longitude}/>
                }
            </section>



        </section>




    )
}