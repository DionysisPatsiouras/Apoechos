import { useEffect, useState } from "react"
// import Call from "../utils/Call"
// import { Routes } from "../utils/Routes"
export default function Messages() {

    let user = 'MUSICIAN205778540374'
    // const messages = new Call(Routes.messages.profile_id('MUSICIAN205778540374'), 'GET')
    const [msgs, setMsgs] = useState<any[]>([])

    useEffect(() => {

        // messages.GET()
        //     .then((res) => setMsgs(res))
        //     .catch((err) => console.warn(err))

    }, [])

    // console.warn(msgs)

    return (
        <div style={{ width: '600px', padding: '20px' }}>

            {msgs.map((msg: any, index: number) => (
                <div key={index} style={{ padding: '15px', marginLeft: msg.sender.musicianId === user ? '250px' : '0' }}>

                    <img src={`http://127.0.0.1:8000/${msg?.sender?.photo}`} alt='profile_photo' width={50} />
                    <b>{msg.sender.artistic_nickname}</b>
                    <p> {msg.body}</p>

                </div>
            ))}

        </div>
    )
}