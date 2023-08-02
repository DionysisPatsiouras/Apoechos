import React, { useEffect, useState, useContext } from 'react'


import CreateNewProfile from '../components/CreateNewProfile'
import Settings from '../components/Settings'
import Notifications from '../components/Notifications'
import Messages from '../components/Messages'
import AuthContext from '../context/AuthContext'
import style from '../style/Account.module.css'

import img from '../media/musician.png'
import img2 from '../media/band.png'

export default function Account() {
  let { user } = useContext(AuthContext)
  const [width, setWidth] = React.useState(window.innerWidth);
  const [activeTab, setActiveTab] = useState('Profiles')


  const hasAllProfiles = user.hasMusicianProfile && user.hasBandProfile && user.hasStudioProfile && user.hasStageProfile && user.hasStoreProfile
  const [newProfileWindow, setNewProfileWindow] = useState(false)

  



  useEffect(() => {
    window.addEventListener("resize", () => setWidth(window.innerWidth));
  }, [])


  return (
    <div>


      {/* ACCOUNT MAIN MENU >>>>> PROFILES, SETTINGS, NOTIFICATIONS, MESSAGES */}
      <ul className={style.list}>


        <li
          style={{ 'backgroundColor': activeTab === 'Profiles' && width < 769 ? '#5F69C6' : 'transparent', 'borderBottom': activeTab === 'Profiles' ? '4px solid #5F69C6' : 'none' }}
          onClick={() => setActiveTab('Profiles')}>
          {width < 769 ?
            <svg className={style.svgIcon} width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.42096 33.2825C10.2801 31.8608 12.358 30.7398 14.6546 29.9196C16.9513 29.0994 19.3573 28.6893 21.8726 28.6893C24.388 28.6893 26.7939 29.0994 29.0906 29.9196C31.3872 30.7398 33.4651 31.8608 35.3243 33.2825C36.6002 31.7879 37.5936 30.0928 38.3044 28.1971C39.0153 26.3015 39.3707 24.2783 39.3707 22.1275C39.3707 17.2791 37.6665 13.1506 34.258 9.74213C30.8495 6.33365 26.721 4.62941 21.8726 4.62941C17.0242 4.62941 12.8957 6.33365 9.48725 9.74213C6.07876 13.1506 4.37452 17.2791 4.37452 22.1275C4.37452 24.2783 4.72995 26.3015 5.44081 28.1971C6.15167 30.0928 7.14505 31.7879 8.42096 33.2825ZM21.8726 24.3148C19.7218 24.3148 17.9082 23.5766 16.4318 22.1002C14.9554 20.6238 14.2172 18.8101 14.2172 16.6593C14.2172 14.5085 14.9554 12.6949 16.4318 11.2185C17.9082 9.74213 19.7218 9.00393 21.8726 9.00393C24.0234 9.00393 25.837 9.74213 27.3134 11.2185C28.7898 12.6949 29.528 14.5085 29.528 16.6593C29.528 18.8101 28.7898 20.6238 27.3134 22.1002C25.837 23.5766 24.0234 24.3148 21.8726 24.3148ZM21.8726 44.0001C18.8469 44.0001 16.0035 43.4259 13.3423 42.2776C10.6811 41.1293 8.36627 39.5709 6.39774 37.6024C4.4292 35.6338 2.87078 33.319 1.72247 30.6578C0.574156 27.9966 0 25.1532 0 22.1275C0 19.1018 0.574156 16.2583 1.72247 13.5972C2.87078 10.936 4.4292 8.62116 6.39774 6.65262C8.36627 4.68409 10.6811 3.12566 13.3423 1.97735C16.0035 0.829039 18.8469 0.254883 21.8726 0.254883C24.8983 0.254883 27.7418 0.829039 30.4029 1.97735C33.0641 3.12566 35.3789 4.68409 37.3475 6.65262C39.316 8.62116 40.8744 10.936 42.0228 13.5972C43.1711 16.2583 43.7452 19.1018 43.7452 22.1275C43.7452 25.1532 43.1711 27.9966 42.0228 30.6578C40.8744 33.319 39.316 35.6338 37.3475 37.6024C35.3789 39.5709 33.0641 41.1293 30.4029 42.2776C27.7418 43.4259 24.8983 44.0001 21.8726 44.0001Z" fill={activeTab === 'Profiles' ? '#ffffff' : '#3E3E3E'} />
            </svg>
            : 'Profiles ' + '(???)'

          }
        </li>


        <li
          style={{ 'backgroundColor': activeTab === 'Settings' && width < 769 ? '#5F69C6' : 'transparent', 'borderBottom': activeTab === 'Settings' ? '4px solid #5F69C6' : 'none' }}
          onClick={() => setActiveTab('Settings')}>
          {width < 769 ?
            <svg className={style.svgIcon} width="40" height="42" viewBox="0 0 40 42" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M23.3724 41.2993H16.6289C16.2065 41.2993 15.8316 41.1667 15.5045 40.9015C15.1773 40.6362 14.9804 40.2924 14.9137 39.8699L14.1257 34.9036C13.5402 34.6942 12.9154 34.3995 12.2512 34.0194C11.5871 33.6393 11.0083 33.2485 10.5148 32.8471L5.94852 34.9732C5.53402 35.1638 5.11752 35.1908 4.69902 35.0542C4.28056 34.9176 3.95937 34.642 3.73547 34.2276L0.351774 28.2221C0.119874 27.8409 0.0599072 27.4411 0.171874 27.0227C0.283807 26.6042 0.509707 26.2623 0.849573 25.9971L5.07782 22.9069C5.01912 22.6308 4.98144 22.313 4.96477 21.9536C4.94811 21.5942 4.93977 21.2765 4.93977 21.0004C4.93977 20.7243 4.94811 20.4065 4.96477 20.0471C4.98144 19.6877 5.01912 19.3699 5.07782 19.0939L0.849573 15.9917C0.50974 15.7265 0.28384 15.3846 0.171874 14.9661C0.0599072 14.5476 0.119874 14.1518 0.351774 13.7786L3.73547 7.77315C3.96734 7.37462 4.29251 7.10505 4.71097 6.96445C5.12947 6.82389 5.54199 6.84889 5.94852 7.03945L10.5387 9.1536C11.0242 8.76014 11.597 8.37536 12.2572 7.99926C12.9173 7.62319 13.5402 7.34312 14.1257 7.15905L14.9137 2.11885C14.9804 1.69639 15.1773 1.35254 15.5045 1.0873C15.8316 0.822071 16.2065 0.689453 16.6289 0.689453H23.3724C23.7949 0.689453 24.1697 0.822071 24.4969 1.0873C24.824 1.35254 25.021 1.69639 25.0876 2.11885L25.8757 7.10905C26.4612 7.32645 27.0923 7.61486 27.7692 7.97426C28.446 8.33369 29.0184 8.7268 29.4865 9.1536L34.0528 7.03945C34.4594 6.84889 34.8739 6.82191 35.2963 6.95851C35.7188 7.09511 36.042 7.36665 36.2659 7.77315L39.6616 13.7286C39.8934 14.1098 39.9597 14.5179 39.8605 14.9531C39.7612 15.3882 39.525 15.7344 39.1518 15.9917L34.9116 18.9939C34.9702 19.3033 35.0099 19.6377 35.0306 19.9971C35.0512 20.3565 35.0616 20.6909 35.0616 21.0004C35.0616 21.3098 35.0512 21.6359 35.0306 21.9786C35.0099 22.3214 34.9702 22.6475 34.9116 22.9569L39.1518 25.9971C39.4916 26.2623 39.7175 26.6042 39.8295 27.0227C39.9414 27.4411 39.8855 27.8409 39.6616 28.2221L36.2539 34.2276C36.03 34.642 35.7108 34.9176 35.2963 35.0542C34.8818 35.1908 34.4673 35.1638 34.0528 34.9732L29.4746 32.8471C28.9811 33.2485 28.4126 33.6456 27.7692 34.0384C27.1257 34.4312 26.4945 34.7196 25.8757 34.9036L25.0876 39.8699C25.021 40.2924 24.824 40.6362 24.4969 40.9014C24.1697 41.1666 23.7949 41.2993 23.3724 41.2993ZM19.9768 27.5004C21.7768 27.5004 23.3101 26.867 24.5768 25.6004C25.8434 24.3337 26.4768 22.8004 26.4768 21.0004C26.4768 19.2004 25.8434 17.667 24.5768 16.4004C23.3101 15.1337 21.7768 14.5004 19.9768 14.5004C18.1768 14.5004 16.6434 15.1337 15.3768 16.4004C14.1101 17.667 13.4768 19.2004 13.4768 21.0004C13.4768 22.8004 14.1101 24.3337 15.3768 25.6004C16.6434 26.867 18.1768 27.5004 19.9768 27.5004Z" fill={activeTab === 'Settings' ? '#ffffff' : '#3E3E3E'} />
            </svg>
            : 'Settings'
          }
        </li>


        <li
          style={{ 'backgroundColor': activeTab === 'Notifications' && width < 769 ? '#5F69C6' : 'transparent', 'borderBottom': activeTab === 'Notifications' ? '4px solid #5F69C6' : 'none' }}
          onClick={() => setActiveTab('Notifications')}>
          {width < 769 ?
            <svg className={style.svgIcon} width="33" height="41" viewBox="0 0 33 41" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1.70325 34.6098C1.21412 34.6098 0.80795 34.4482 0.48475 34.1251C0.161583 33.8019 0 33.3957 0 32.9065C0 32.4174 0.161583 32.0112 0.48475 31.688C0.80795 31.3649 1.21412 31.2033 1.70325 31.2033H3.89235V16.3022C3.89235 13.4329 4.7313 10.8534 6.4092 8.5638C8.0871 6.2742 10.3159 4.8341 13.0956 4.2435V3.21525C13.0956 2.31882 13.4063 1.55883 14.0275 0.9353C14.6486 0.311766 15.4058 0 16.2989 0C17.192 0 17.9492 0.311766 18.5704 0.9353C19.1916 1.55883 19.5022 2.31882 19.5022 3.21525V4.2435C22.2819 4.8261 24.5127 6.2636 26.1945 8.556C27.8765 10.8484 28.7174 13.4305 28.7174 16.3022V31.2033H30.8946C31.3827 31.2033 31.7906 31.3649 32.1182 31.688C32.4459 32.0112 32.6098 32.4174 32.6098 32.9065C32.6098 33.3957 32.4459 33.8019 32.1182 34.1251C31.7906 34.4482 31.3827 34.6098 30.8946 34.6098H1.70325ZM16.3049 40.7175C15.177 40.7175 14.2114 40.3162 13.4081 39.5136C12.6049 38.711 12.2033 37.7431 12.2033 36.6098H20.4065C20.4065 37.7417 20.0049 38.7093 19.2016 39.5126C18.3984 40.3158 17.4328 40.7175 16.3049 40.7175Z" fill={activeTab === 'Notifications' ? '#ffffff' : '#3E3E3E'} />
            </svg>
            : 'Notifications'}
        </li>


        <li
          style={{ 'backgroundColor': activeTab === 'Messages' && width < 769 ? '#5F69C6' : 'transparent', 'borderBottom': activeTab === 'Messages' ? '4px solid #5F69C6' : 'none' }}
          onClick={() => setActiveTab('Messages')}>
          {width < 769 ?
            <svg className={style.svgIcon} width="41" height="33" viewBox="0 0 41 33" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3.4065 32.6098C2.48653 32.6098 1.68878 32.2721 1.01325 31.5966C0.33775 30.921 0 30.1233 0 29.2033V3.4185C0 2.49527 0.33775 1.69472 1.01325 1.01685C1.68878 0.338952 2.48653 0 3.4065 0H37.1913C38.1145 0 38.9151 0.338952 39.593 1.01685C40.2709 1.69472 40.6098 2.49527 40.6098 3.4185V29.2033C40.6098 30.1233 40.2709 30.921 39.593 31.5966C38.9151 32.2721 38.1145 32.6098 37.1913 32.6098H3.4065ZM20.2989 17.2457C20.4815 17.2457 20.6411 17.2187 20.7777 17.1647C20.9143 17.1107 21.0618 17.0422 21.2201 16.9592L36.6435 6.8294C36.8101 6.73337 36.9431 6.59305 37.0424 6.40845C37.1417 6.22385 37.1913 6.01854 37.1913 5.7925C37.1913 5.32437 36.9797 4.95062 36.5565 4.67125C36.1333 4.39188 35.7018 4.40149 35.262 4.70005L20.2989 14.3185L5.38585 4.70005C4.94602 4.40945 4.50617 4.3888 4.0663 4.6381C3.62643 4.88737 3.4065 5.25594 3.4065 5.7438C3.4065 5.96664 3.46447 6.17628 3.5804 6.37275C3.69637 6.56922 3.82575 6.72168 3.96855 6.83015L19.3779 16.9593C19.5361 17.0423 19.6835 17.1107 19.8201 17.1647C19.9567 17.2187 20.1163 17.2457 20.2989 17.2457Z" fill={activeTab === 'Messages' ? '#ffffff' : '#3E3E3E'} />
            </svg>
            : 'Messages'}
        </li>
      </ul>


      {activeTab === 'Profiles' ?

        <div className={style.existingProfiles}>
          {user.hasMusicianProfile ? <div className={style.object}> <img src={img} alt='img' /></div> : null}
          {user.hasBandProfile ? <div className={style.object}><img src={img2} alt='img' /></div> : null}
          {user.hasStudioProfile ? <div className={style.object}><img src={img} alt='img' /></div> : null}
          {user.hasStageProfile ? <div className={style.object}><img src={img2} alt='img' /></div> : null}
          {user.hasStoreProfile ? <div className={style.object}><img src={img} alt='img' /></div> : null}

          {/* IF USER HAS ALL PROFILES, DONT SHOW ANYTHING, ELSE SHOW 'CREATE NEW' BUTTON */}
          {/* {hasAllProfiles ? null :
            <div className={style.special}
              onClick={() => setNewProfileWindow(!newProfileWindow)}>
              <p className={style.plus}>+</p>
              <p className={style.text}>Create new</p></div>} */}


          {hasAllProfiles ? null :

            !user.hasMusicianProfile && !user.hasBandProfile && !user.hasStudioProfile && !user.hasStageProfile && !user.hasStoreProfile ?
              <CreateNewProfile /> :
              <div className={style.special}
                onClick={() => setNewProfileWindow(!newProfileWindow)}>
                <p className={style.plus}>+</p>
                <p className={style.text}>Create new</p></div>}
        </div>
        : null
      }




      {
        (() => {
          switch (activeTab) {
            case 'Profiles':
              return newProfileWindow ? <CreateNewProfile /> : null
            case 'Settings':
              return <Settings />
            case 'Notifications':
              return <Notifications />
            case 'Messages':
              return <Messages />

            default:
              return <CreateNewProfile />
          }
        })()
      }


    </div >
  )
}
