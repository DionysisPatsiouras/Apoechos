import { useEffect, useState, useContext } from "react"
import Call from "../utils/Call"
import { Routes } from "../utils/Routes"
import CSS from "../css/Messages/Messages.module.css"
import Button from "../components/Button"
import { message_date } from "../utils/Shortcuts"
import { Link } from "react-router-dom"
import SvgIcon from "../components/SvgIcon"
import AuthContext from "../context/AuthContext"
import { Navigate } from 'react-router-dom'
import CSS2 from '../css/Profile/Profile.module.sass'

export default function Messages() {

    let { user }: any = useContext(AuthContext)

    let profile_id = window.location.pathname.replace('/messages/', '')

    const [contacts, setContacts] = useState<any[]>([])
    const [conversation, setConversation] = useState<any[]>([])

    const [currentProfile, setCurrentProfile] = useState<any>([])
    const [my_profiles, setMyProfiles] = useState<any>([])


    const [receiverId, setReceiverId] = useState<string>('')
    const [msg, setMsg] = useState<string>('')


    const get_profile = new Call(Routes.profiles.id(profile_id), 'GET')
    const get_my_profiles = new Call(Routes.profiles.my_profiles, 'GET')
    const get_contacts = new Call(Routes.messages.contacts(profile_id), 'GET')



    const Add_Message = () => {

        // console.log(formData)
        // console.log(contacts)
        const data = {
            sender: profile_id,
            receiver: receiverId,
            message: msg
        }

        // console.log(data)
        const add_new_message = new Call(Routes.messages.new, 'POST', data)

        add_new_message
            .POST()
            .then((res) => {
                console.log(res);
                setMsg('');
                // setUpdateDOM(!updateDOM)
                get_current_conv(profile_id, receiverId)
            })
            .catch((err) => console.warn(err))

    }



    const get_current_conv = (my_id: string, contact_id: string) => {
        const get_conversation = new Call(Routes.messages.get(my_id, contact_id), 'GET')
        get_conversation
            .GET()
            .then((res) => setConversation(res))
            .catch((err) => console.warn(err))

        // keep contact's ID
        setReceiverId(contact_id)
    }



    useEffect(() => {

        get_my_profiles
            .GET()
            .then((res) => setMyProfiles(res[1]))
            .catch((err) => console.warn(err))
        get_profile
            .GET_NO_TOKEN()
            .then((res: any) => setCurrentProfile(res))
            .catch((err) => console.warn(err))

        get_contacts
            .GET()
            .then((res) => setContacts(res))
            .catch((err) => console.warn(err))

    }, [profile_id])

    // console.log(contacts)




    return (
        <div style={{ display: 'flex' }}>

            {user?.user_id === currentProfile?.user?.id &&
                <aside className={CSS2.my_profiles_list} >
                    <ul>
                        {my_profiles.map((profile: any) => (
                            <Link to={`/messages/${profile.profileId}`} key={profile.profileId} onClick={() => setConversation([])}>
                                <li
                                    className='items-inline'
                                    style={{
                                        backgroundColor: profile.profileId === currentProfile?.profileId ? profile?.category?.color : 'unset',
                                        color: profile.profileId === currentProfile?.profileId ? '#fff' : '#646464',
                                        justifyContent: 'space-between'
                                    }}
                                >
                                    {profile.name}
                                    <SvgIcon id={profile.category.icon}
                                        color={profile.profileId === currentProfile?.profileId ? '#fff' : '#646464'}
                                    />
                                </li>
                            </Link>
                        ))}


                    </ul>
                </aside>
            }

            <div className={`${CSS.container} container shadow`}>
                {/* {selectedContact} */}

                {currentProfile?.user?.id !== undefined
                    && user?.user_id !== currentProfile?.user?.id
                    && <Navigate to={`/profile/${currentProfile?.profileId}`} />}


                <ul>
                    <h3 className={CSS.title}>Επαφές {`(${contacts.length})`}</h3>
                    {contacts
                        .map((contact: any, index: number) => (
                            <li key={index}
                                style={{
                                    backgroundColor:
                                        conversation?.[0]?.receiver?.profileId === contact?.profileId ||
                                            conversation?.[0]?.sender?.profileId === contact?.profileId
                                            ? '#F2F2F2'
                                            : '#fff'
                                }}
                                className={`${CSS.profile_item} items-inline cursor-pointer`}
                                onClick={() => get_current_conv(profile_id, contact.profileId)}>
                                <img className={CSS.contactImg} src={`http://127.0.0.1:8000/${contact?.photo}`} />
                                <h3>{contact.name}</h3>
                            </li>
                        ))}
                </ul>

                <div className={CSS.conversation}>

                    <h3 className={CSS.title}>Συζήτηση</h3>

                    <div className={CSS.allMessages}>
                        {conversation.length !== 0 && conversation.map((msg: any, index: number) => (
                            <div key={index}
                                className={CSS.img_and_text}
                                style={{
                                    textAlign: profile_id === msg?.receiver?.profileId || msg?.senderId
                                        ? 'left'
                                        : 'right'
                                }}
                            >

                                <div
                                    className={`${CSS.msgBox}`}
                                    style={{
                                        flexDirection: profile_id !== msg?.receiver?.profileId || msg?.senderId
                                            ? 'row-reverse'
                                            : 'row',
                                    }}>
                                    <div>
                                        <img className={CSS.contactImg} src={msg?.sender?.photo} />
                                    </div>

                                    <div>
                                        <p className={CSS.sender}>{msg?.sender?.name} {msg?.sender?.profileId === profile_id && '(εγώ)'}</p>
                                        <p>{msg.message}</p>
                                        <p className={CSS.msg_date}>{message_date(msg.timestamp)}</p>
                                    </div>

                                </div>
                            </div>

                        ))}


                    </div>

                    {conversation.length !== 0 &&
                        <div className={CSS.new_msg_section}>
                            <input
                                type='text'
                                placeholder="Γράψτε κάτι.."
                                value={msg}
                                onChange={(e: any) => setMsg(e.target.value)} />
                            <Button label='Αποστολή' type='configure' icon='send' onClick={() => Add_Message()} />
                        </div>
                    }

                </div>

            </div>
        </div>
    )
}