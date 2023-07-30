import React from 'react'
import style from '../style/Settings.module.css'
import lock from '../media/icons/lock.svg'

export default function Settings() {
  return (
    <div className={style.container}>


      <div className={style.titleSection}>
        <h2>Account Settings</h2>
        <div className={style.subtitle}>
          <img src={lock} width={18} height={18} alt='lock' /><small>Only visible to you</small>
        </div>
      </div>

      <div className={style.section}>

        <h5>Personal Information</h5>
        <div className={style.subtitle}>
          <img src={lock} width={18} height={18} alt='lock' /><small>Only visible to you</small>
        </div>


        <form >
          <input type="text" placeholder='First Name' /> <img className={style.smallLock} src={lock} width={18} height={18} alt='lock' />
          <input type="text" placeholder='Last Name' /> <img className={style.smallLock} src={lock} width={18} height={18} alt='lock' />
          <input type="text" placeholder='Email' /> <img className={style.smallLock} src={lock} width={18} height={18} alt='lock' />
          <input type="text" placeholder='Gender' /> <img className={style.smallLock} src={lock} width={18} height={18} alt='lock' />
          <input type="text" placeholder='Country' /> <img className={style.smallLock} src={lock} width={18} height={18} alt='lock' />
          {/* <input type="date" placeholder='Birthdate' /> <img className={style.smallLock} src={lock} width={18} height={18} alt='lock'/> */}
        </form>

        <button>No changes made</button>

      </div>


      <div className={style.section}>
        <h5>Change Password</h5>
        <div className={style.subtitle}>
          <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.694261 11.4394C0.553454 11.4394 0.432023 11.4057 0.329969 11.3384C0.227895 11.2711 0.15002 11.1881 0.096344 11.0894C0.036387 10.9961 0.00438635 10.8873 0.000341901 10.763C-0.00371227 10.6387 0.0282884 10.5142 0.096344 10.3894L5.63801 0.822721C5.70607 0.706055 5.79407 0.620985 5.90201 0.567513C6.00995 0.514041 6.12175 0.487305 6.23743 0.487305C6.35309 0.487305 6.4644 0.514041 6.57134 0.567513C6.67829 0.620985 6.76579 0.706055 6.83384 0.822721L12.3755 10.3894C12.4436 10.5142 12.4756 10.6387 12.4715 10.763C12.4675 10.8873 12.4355 10.9961 12.3755 11.0894C12.3201 11.1842 12.2418 11.2662 12.1406 11.3355C12.0394 11.4048 11.9184 11.4394 11.7776 11.4394H0.694261ZM6.29681 9.51439C6.42709 9.51439 6.54188 9.46389 6.64117 9.3629C6.74045 9.2619 6.79009 9.14627 6.79009 9.016C6.79009 8.88572 6.7396 8.77337 6.6386 8.67894C6.53761 8.58452 6.42198 8.5373 6.29171 8.5373C6.16143 8.5373 6.04665 8.58537 5.94735 8.6815C5.84807 8.77764 5.79843 8.89084 5.79843 9.02111C5.79843 9.15138 5.84892 9.26617 5.94992 9.36546C6.05091 9.46475 6.16654 9.51439 6.29681 9.51439ZM6.29681 7.9248C6.4215 7.9248 6.52516 7.88288 6.6078 7.79902C6.69044 7.71517 6.73176 7.61126 6.73176 7.4873V5.2123C6.73176 5.08835 6.68959 4.98444 6.60525 4.90059C6.5209 4.81673 6.41639 4.7748 6.29171 4.7748C6.16702 4.7748 6.06336 4.81673 5.98072 4.90059C5.89808 4.98444 5.85676 5.08835 5.85676 5.2123V7.4873C5.85676 7.61126 5.89893 7.71517 5.98327 7.79902C6.06762 7.88288 6.17214 7.9248 6.29681 7.9248Z" fill="#FF0000" />
          </svg>
          <small style={{ 'color': 'red' }}>Don’t share your password with anyone</small>
        </div>
        <form >
          <input type="password" placeholder='Old Password' /> <img className={style.smallLock} src={lock} width={18} height={18} alt='lock' />
          <input type="password" placeholder='New Password' /> <img className={style.smallLock} src={lock} width={18} height={18} alt='lock' />
          <input type="password" placeholder='Repeat New Password' /> <img className={style.smallLock} src={lock} width={18} height={18} alt='lock' />

        </form>

        <button style={{ 'backgroundColor': '#5F69C6' }}>Change Password</button>
      </div>


      <div className={style.section}>
        <h5>Account deletion</h5>
        <div className={style.subtitle}>
          <small style={{ 'color': 'red' }}>Beware! This action is permanent.  All data (posts, events, photos, texts) will lost. You will not be able to retrieve your account after deletion.</small>
        </div>
        <button style={{ 'backgroundColor': '#C65F5F' }}>Delete my account</button>
      </div>

    </div>
  )
}
