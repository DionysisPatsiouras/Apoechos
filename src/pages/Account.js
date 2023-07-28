import React, { useEffect, useState } from 'react'

import profileIcon from '../media/icons/profile.svg'
import settingsIcon from '../media/icons/settings.svg'
import notificationsIcon from '../media/icons/notifications.svg'
import messagesIcon from '../media/icons/messages.svg'
import style from '../style/Account.module.css'

import Profiles from '../components/Profiles'
import Settings from '../components/Settings'
import Notifications from '../components/Notifications'
import Messages from '../components/Messages'


export default function Account() {

  const [width, setWidth] = React.useState(window.innerWidth);
  const [activeTab, setActiveTab] = useState(2)

  useEffect(() => {
    window.addEventListener("resize", () => setWidth(window.innerWidth));
  }, [])






  return (
    <div>
      {/* {console.log(activeTab)} */}
      <ul className={style.list}>
        <li onClick={() => setActiveTab('Profiles')}>{width < 769 ? <img src={profileIcon} /> : 'Profiles'}</li>
        <li onClick={() => setActiveTab('Settings')}>{width < 769 ? <img src={settingsIcon} /> : 'Settings'}</li>
        <li onClick={() => setActiveTab('Notifications')}>{width < 769 ? <img src={notificationsIcon} /> : 'Notifications'}</li>
        <li onClick={() => setActiveTab('Messages')}>{width < 769 ? <img src={messagesIcon} /> : 'Messages'}</li>
      </ul>




      {(() => {
        switch (activeTab) {
          case 'Profiles':
            return <Profiles />
          case 'Settings':
            return <Settings />
          case 'Notifications':
            return <Notifications />
          case 'Messages':
            return <Messages />

          default:
            return <Profiles />
        }
      })()}


    </div>
  )
}
