import { useEffect, useState } from "react"
import Call from "../utils/Call"
import { Routes } from "../utils/Routes"
import CSS from "../css/Messages/Messages.module.css"
import Button from "../components/Button"
import { timestamp } from "../utils/Shortcuts"
export default function Messages() {

    let user = 'PROFILE4494356524428'
    const [contacts, setContacts] = useState<any[]>([])
    const [selectedContact, setSelectedContact] = useState<string>('')
    const [conversation, setConversation] = useState<any[]>([])

    const get_contacts = new Call(Routes.messages.contacts(user), 'GET')
    const get_conversation = new Call(Routes.messages.get(user, selectedContact), 'GET')
    useEffect(() => {

        get_contacts
            .GET()
            .then((res) => setContacts(res))
            .catch((err) => console.warn(err))

        get_conversation
            .GET()
            .then((res) => setConversation(res))
            .catch((err) => console.warn(err))



    }, [selectedContact])

    console.warn(contacts)
    // console.warn(conversation)

    return (
        <div className={`${CSS.container} container shadow`}>
            {/* {selectedContact} */}

            <ul>
                <h3 className={CSS.title}>Επαφές {`(${contacts.length})`}</h3>
                {contacts.map((contact: any, index: number) => (
                    <li key={index} className={`${CSS.profile_item} items-inline cursor-pointer`} onClick={() => setSelectedContact(contact.profileId)}>
                        <img className={CSS.contactImg} src={`http://127.0.0.1:8000/${contact?.photo}`} />
                        <h3>{contact.name}</h3>
                    </li>
                ))}
            </ul>

            <div className={CSS.conversation}>
                <h3 className={CSS.title}>Συζήτηση</h3>
                <div className={CSS.allMessages}>

                    {/* <div style={{display: 'flex'}}> */}


                    {conversation.map((msg: any, index: number) => (
                        <div key={index} style={{ textAlign: user === msg?.receiver?.profileId || msg?.senderId ? 'left' : 'right' }}>
                            <div style={{ display: 'inline-flex', flexDirection:  user !== msg?.receiver?.profileId || msg?.senderId ? 'row-reverse': 'row' }}>
                                <img className={CSS.contactImg} src={msg?.sender?.photo} />
                                <div>
                                    <p>{msg.message}</p>
                                    <p>{timestamp(msg.timestamp)}</p>
                                </div>

                            </div>


                        </div>

                    ))}

                    {/* </div> */}
                </div>

                <div className={CSS.new_msg_section}>
                    <input type='text' />
                    <Button label='Αποστολή' type='configure' />
                </div>
            </div>


        </div>
    )
}