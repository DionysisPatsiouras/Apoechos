import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import AuthContext from '../../context/AuthContext'
import axios from 'axios'


import back_icon from '../../media/icons/expand.svg'
import style from '../../style/CreateProfile/NewMusician.module.css'

import strings_icon from '../../media/icons/instruments/strings.svg'
import brass_icon from '../../media/icons/instruments/brass.svg'
import keys_icon from '../../media/icons/instruments/keys.svg'
import percussion_icon from '../../media/icons/instruments/percussion.svg'
import vocals_icon from '../../media/icons/instruments/vocals.svg'
import other_icon from '../../media/icons/instruments/other.svg'


import upload_icon from '../../media/icons/upload.svg'
import default_img from '../../media/musician.png'

import data from '../../media/json/instruments.json'


export default function NewMusician2() {

  let { user } = useContext(AuthContext)
  const [image, setImage] = useState(default_img)
  const [category, setCategory] = useState('Strings')
  const [step, setStep] = useState(1)
  const [useMyName, setUseMyName] = useState(false)
  const x = data


  // const onImageChange = (event) => {
  //   if (event.target.files && event.target.files[0]) {
  //     setImage(URL.createObjectURL(event.target.files[0]));
  //   }
  // }

  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = data => {

    console.log(data);
    axios.post('http://127.0.0.1:8000/profiles/musicians/', {
      first_name: 'user1',
      last_name: 'his last name',

      classic_guitar: data.instruments.classic_guitar,
      electric_guitar: data.instruments.electric_guitar,
      // acoustic_guitar: data.instruments.acoustic_guitar,
      // electric_bass: data.instruments.electric_bass,
      // acoustic_bass: data.instruments.acoustic_bass,
      // double_bass: data.instruments.double_bass,
      // violin: data.instruments.violin,
      // viola: data.instruments.viola,
      // cello: data.instruments.cello,
      // harp: data.instruments.harp,
      // ukelele: data.instruments.ukelele,


      drums: data.instruments.drums,
      cajon: data.instruments.drums,
      // congos: data.instruments.drums,
      // tambourine: data.instruments.drums,

      // rock: data.genres.rock,
      // jazz: data.genres.jazz,
      // country: data.genres.country,
      // bio: data.bio,
      // photo: image,
      user: user.user_id

    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

  }




  return (

    <div className={style.container}>

      {/* GO BACK BUTTON */}
      <div className={style.topSection}>
        <div className={style.backButton}>
          <img style={{ 'transform': 'rotate(90deg)' }} width={30} height={30} src={back_icon} alt='back' />
          <Link to='/profiles'>Back</Link>
        </div> Required Fields
      </div>


      {step === 1 ?

        <div>
          {/* PHOTO SECTION */}
          <div className={style.personalInfoSection}>
            <div>
              <img src={image} style={{ 'borderRadius': '200px', 'objectFit': 'cover' }} width={150} height={150} alt='profile' />
              <div className={style.uploadPhoto}>
                {/* <input style={{ 'display': 'none' }} type="file" id="img" name="img" accept="image/*" onChange={onImageChange}></input> */}
                <label className={style.upload_text} htmlFor='img'>
                  <img src={upload_icon} width={25} height={25} alt='upload' />
                  <p>Upload Photo</p></label>
              </div>
            </div>
            <div className={style.nameSection}>
              {/* NOT WORKING */}
              {/* <input type="text" id="name" {...register("name", { required: false })} onChange={() => setUseMyName(false)} placeholder={useMyName ? user.first_name + ' ' + user.last_name : ''} /> */}

              OR
              <input type="checkbox" id="my-name" onClick={() => setUseMyName(!useMyName)} />
              <label htmlFor='my-name'>Use your account name</label>
              <p>{'(' + user.first_name + ' ' + user.last_name + ')'} </p>
            </div>
          </div>


          {/* SELECT INSTRUMENT CATEGORY */}
          <h5>Instruments</h5>
          <ul className={style.categoryBoxes}>
            <li onClick={() => setCategory('Strings')} style={{ 'backgroundColor': category === 'Strings' ? '#5F69C6' : '#B4B3B2' }}><img src={strings_icon} alt='strings' />Strings</li>
            <li onClick={() => setCategory('Brass')} style={{ 'backgroundColor': category === 'Brass' ? '#5F69C6' : '#B4B3B2' }}><img src={brass_icon} alt='brass' />Brass</li>
            <li onClick={() => setCategory('Keys')} style={{ 'backgroundColor': category === 'Keys' ? '#5F69C6' : '#B4B3B2' }}><img src={keys_icon} alt='keys' />Keys</li>
            <li onClick={() => setCategory('Percussion')} style={{ 'backgroundColor': category === 'Percussion' ? '#5F69C6' : '#B4B3B2' }}><img src={percussion_icon} alt='percussion' />Percussion</li>
            <li onClick={() => setCategory('Vocals')} style={{ 'backgroundColor': category === 'Vocals' ? '#5F69C6' : '#B4B3B2' }}><img src={vocals_icon} alt='vocals' />Vocals</li>
            <li onClick={() => setCategory('Other')} style={{ 'backgroundColor': category === 'Other' ? '#5F69C6' : '#B4B3B2' }}><img src={other_icon} alt='other' />Other</li>
          </ul>


          {console.log(data)}

          <div className={style.stepOne}>
            <ul className={style.instrumentsList} style={{ 'display': category === 'Strings' ? 'flex' : 'none' }}>
              {data.strings.map((i) => (
                <div key={i.pointer}>
                  <li><input type="checkbox" id={i.pointer}{...register("instruments." + i.pointer, { required: false })} /><label htmlFor={i.pointer}>{i.title}</label></li>
                </div>
              ))}
            </ul>

            <ul className={style.instrumentsList} style={{ 'display': category === 'Percussion' ? 'flex' : 'none' }}>
              {data.percussion.map((i) => (
                <div key={i.pointer}>
                  <li><input type="checkbox" id={i.pointer}{...register("instruments." + i.pointer, { required: false })} /><label htmlFor={i.pointer}>{i.title}</label></li>
                </div>
              ))}
            </ul>





          </div>

        </div>
        :
        // <><input type="text" id="bio" {...register("bio", { required: false })} /><label htmlFor='bio'>Bio</label></>
        null
      }





      {/* NEXT STEP / CONFIRM BUTTON */}
      <form className={style.instrumentsForm} onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className={style.bottomSection}>
          <p>Step {step} / 3</p>
          {step === 1 ?
            <button className={style.nextStepButton}
              onClick={() => setStep(2)}>
              Next Step
            </button> :
            <button onClick={() => setStep(3)}>Confirm</button>}
        </div>
      </form>


    </div >
  )
}
