import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import AuthContext from '../../context/AuthContext'
import axios from 'axios'


import back_icon from '../../media/icons/expand.svg'
import style from '../../style/CreateProfile/NewMusician.module.css'


import messageIcon from '../../media/icons/messagesDark.svg'
import websiteIcon from '../../media/icons/website.svg'
import phoneIcon from '../../media/icons/phone.svg'

import upload_icon from '../../media/icons/upload.svg'
import default_img from '../../media/musician.png'

import data from '../../media/json/instruments.json'
import data2 from '../../media/json/genres.json'


export default function NewMusician2() {

  let { user } = useContext(AuthContext)
  const [image, setImage] = useState(default_img)
  const [category, setCategory] = useState('Strings')
  const [step, setStep] = useState(1)
  const [useMyName, setUseMyName] = useState(false)
  const [instrError, setInstrError] = useState('')
  const [genreError, setGenreError] = useState('')




  //status of every optional field
  const [optionalField, setOptionalField] = useState({
    bio: false,
    contact: false
  })



  // Upload new photo
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
      console.log(event.target.files)
    }
  }


  // const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const { register, handleSubmit, formState } = useForm();

  const { errors } = formState
  const onSubmit = data => {

    const i = data.instruments
    const g = data.genres


    const allInstrumentsAreFalse =
      !i.classic_guitar && !i.electric_guitar && !i.acoustic_guitar && !i.electric_bass && !i.acoustic_bass && !i.double_bass && !i.violin && !i.viola && !i.cello && !i.harp && !i.ukelele &&
      !i.drums && !i.cajon && !i.congos && !i.tambourine &&
      !i.trumbet && !i.trombone && !i.french_horn && !i.tuba && !i.cornet && !i.piccolo_trumbet && !i.flugelhorn &&
      !i.vocalist && !i.backing_vocalist && !i.soprano && !i.mezzo_soprano && !i.contralto && !i.tenor && !i.baritone && !i.bass

    const allGenresAreFalse = !g.rock && !g.jazz && !g.country

    // ADD THAT FIRST NAME IS NOT FALSE
    if (allInstrumentsAreFalse || allGenresAreFalse) {
      setStep(1)
      allInstrumentsAreFalse ? setInstrError('Choose at least 1 instrument') : setInstrError('')
      allGenresAreFalse ? setGenreError('Choose at least 1 genre') : setGenreError('')


    } else {

      if (step === 2) {

      } else {
        if (useMyName) {
          data.first_name = user.first_name
          data.last_name = user.last_name
        }

        console.log(data)
        // const formData = new FormData()

        // formData.append('image', image)

        axios.put('http://127.0.0.1:8000/users/' + user.user_id + '/', {
          hasMusicianProfile: true,
        })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error)
          })



        axios
          // .post(formData, 'http://127.0.0.1:8000/profiles/musicians/', {
          .post( 'http://127.0.0.1:8000/profiles/musicians/', {
            // first_name: user.first_name,
            first_name: 'Dennis',
            last_name: user.last_name,
            // create an 'artistick name' row
            // artisticName: data.artisticName,

            classic_guitar: data.instruments.classic_guitar, electric_guitar: data.instruments.electric_guitar, acoustic_guitar: data.instruments.acoustic_guitar, electric_bass: data.instruments.electric_bass, acoustic_bass: data.instruments.acoustic_bass, double_bass: data.instruments.double_bass, violin: data.instruments.violin, viola: data.instruments.viola, cello: data.instruments.cello, harp: data.instruments.harp, ukelele: data.instruments.ukelele,
            drums: data.instruments.drums, cajon: data.instruments.cajon, congos: data.instruments.congos, tambourine: data.instruments.tambourine,
            trumbet: data.instruments.trumbet, trombone: data.instruments.trombone, french_horn: data.instruments.french_horn, tuba: data.instruments.tuba, cornet: data.instruments.cornet, piccolo_trumbet: data.instruments.piccolo_trumbet, flugelhorn: data.instruments.flugelhorn,
            vocalist: data.instruments.vocalist, backing_vocalist: data.instruments.backing_vocalist, soprano: data.instruments.soprano, mezzo_soprano: data.instruments.mezzo_soprano, contralto: data.instruments.contralto, tenor: data.instruments.tenor, baritone: data.instruments.baritone, bass: data.instruments.bass,

            rock: data.genres.rock,
            jazz: data.genres.jazz,
            country: data.genres.country,
            bio: data.bio,
            websiteLink: data.websiteLink,
            // photo: formData,
            user: user.user_id

          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });

      }
    }




  }




  return (

    <div className={style.container}>

      {/* GO BACK BUTTON */}
      <div className={style.topSection}>
        <div className={style.backButton}>
          <img style={{ 'transform': 'rotate(90deg)' }} width={30} height={30} src={back_icon} alt='back' />
          {step === 1 ? <Link to="/profiles">Back</Link> : step === 2 || step === 3 ? <p onClick={() => setStep(step - 1)}>Back</p> : null}
        </div> {step === 1 ? <p>Required Fields</p> : <p>Optional Fields</p>}
      </div>



      {step === 1 ?
        <div>
          {/* PHOTO SECTION */}
          <div className={style.personalInfoSection}>
            <div>
              <img src={image} style={{ 'borderRadius': '200px', 'objectFit': 'cover' }} width={150} height={150} alt='profile' />
              <div className={style.uploadPhoto}>

                <input style={{ 'display': 'none' }} type="file" id="img" name="img" accept="image/*" onChange={onImageChange} ></input>
                {/* <input style={{ 'display': 'none' }} type="file" id="img" name="img" accept="image/*" onChange={onImageChange} {...register("image", {required: false})}></input> */}

                <input type="file" id="photo" className={style.artisticNameField} {...register("photo", { required: false })} onChange={onImageChange} />

                <label className={style.upload_text} htmlFor='img'>
                  <img src={upload_icon} width={25} height={25} alt='upload' />
                  <p>Upload Photo</p></label>
              </div>
            </div>

            <div className={style.nameSection}>
              {/* NOT WORKING */}
              {useMyName ?
                <p>{user.first_name + ' ' + user.last_name}</p> :
                <>
                  <input type="text" id="firstname" className={style.artisticNameField} {...register("first_name", { required: false })} placeholder={'Your artistic name *'} autoComplete='off' />
                  {/* <input type="text" id="lastname" className={style.artisticNameField} {...register("last_name", { required: false })} placeholder={'Last name'} /> */}
                  OR
                </>
              }

              <div className={style.useMyNameBox}>
                <input type="checkbox" id="my-name" onClick={() => setUseMyName(!useMyName)} />
                <label htmlFor='my-name'>Use my account name</label>
              </div>
              {useMyName ? <p>{'(' + user.first_name + ' ' + user.last_name + ')'} </p> : null}
            </div>
          </div>


          {/* SELECT INSTRUMENT CATEGORY */}
          <div className={style.instrumentsSection}>
            <h5>Instruments</h5>
            {instrError !== '' ? <p className={style.instrError}>{instrError}</p> : null}

            <ul className={style.categoryBoxes}>
              <li onClick={() => setCategory('Strings')} style={{ 'backgroundColor': category === 'Strings' ? '#5F69C6' : '#B4B3B2' }}><img src={require('../../media/icons/instruments/strings.svg').default} alt='strings' />Strings</li>
              <li onClick={() => setCategory('Wind')} style={{ 'backgroundColor': category === 'Wind' ? '#5F69C6' : '#B4B3B2' }}><img src={require('../../media/icons/instruments/wind.svg').default} alt='wind' />Wind</li>
              <li onClick={() => setCategory('Keys')} style={{ 'backgroundColor': category === 'Keys' ? '#5F69C6' : '#B4B3B2' }}><img src={require('../../media/icons/instruments/keys.svg').default} alt='keys' />Keys</li>
              <li onClick={() => setCategory('Percussion')} style={{ 'backgroundColor': category === 'Percussion' ? '#5F69C6' : '#B4B3B2' }}><img src={require('../../media/icons/instruments/percussion.svg').default} alt='percussion' />Percussion</li>
              <li onClick={() => setCategory('Vocals')} style={{ 'backgroundColor': category === 'Vocals' ? '#5F69C6' : '#B4B3B2' }}><img src={require('../../media/icons/instruments/vocals.svg').default} alt='vocals' />Vocals</li>
              <li onClick={() => setCategory('Other')} style={{ 'backgroundColor': category === 'Other' ? '#5F69C6' : '#B4B3B2' }}><img src={require('../../media/icons/instruments/other.svg').default} alt='other' />Other</li>
            </ul>


            {/* DISPLAY INSTRUMENTS OF EACH CATEGORY */}
            <div className={style.stepOne}>
              <ul className={style.listItem} style={{ 'display': category === 'Strings' ? 'flex' : 'none' }}><div className={style.columnList}>{data.strings.map((i) => (<li key={i.pointer}><input onClick={() => setInstrError('')} type="checkbox" id={i.pointer}{...register("instruments." + i.pointer, { required: false })} /><label htmlFor={i.pointer}>{i.title}</label></li>))}</div></ul>
              <ul className={style.listItem} style={{ 'display': category === 'Wind' ? 'flex' : 'none' }}><div className={style.columnList}>{data.wind.map((i) => (<li key={i.pointer}><input onClick={() => setInstrError('')} type="checkbox" id={i.pointer}{...register("instruments." + i.pointer, { required: false })} /><label htmlFor={i.pointer}>{i.title}</label></li>))}</div></ul>
              <ul className={style.listItem} style={{ 'display': category === 'Percussion' ? 'flex' : 'none' }}><div className={style.columnList}>{data.percussion.map((i) => (<li key={i.pointer}><input onClick={() => setInstrError('')} type="checkbox" id={i.pointer}{...register("instruments." + i.pointer, { required: false })} /><label htmlFor={i.pointer}>{i.title}</label></li>))}</div></ul>
              <ul className={style.listItem} style={{ 'display': category === 'Vocals' ? 'flex' : 'none' }}><div className={style.columnList}>{data.vocals.map((i) => (<li key={i.pointer}><input onClick={() => setInstrError('')} type="checkbox" id={i.pointer}{...register("instruments." + i.pointer, { required: false })} /><label htmlFor={i.pointer}>{i.title}</label></li>))}</div></ul>
            </div>

          </div>

          {/* DISPLAY GENRES  */}
          <div className={style.genresSection}>
            <h5>Genres</h5>
            {genreError !== '' ? <p className={style.instrError}>{genreError}</p> : null}
            <ul className={style.listItem} style={{ 'display': 'flex' }}><div className={style.columnList}>{data2.genres.map((i) => (<li key={i.pointer}><input type="checkbox" onClick={() => setGenreError('')} id={i.pointer}{...register("genres." + i.pointer, { required: false })} /><label htmlFor={i.pointer}>{i.title}</label></li>))}</div></ul></div>
        </div>
        :
        <>
          <div className={style.optionalField}>
            <div style={{ 'height': '80px' }}>
              <h5 className={style.optionalSection}>Bio</h5>
              <div className={style.expand} onClick={() => setOptionalField({ ...optionalField, bio: !optionalField.bio })}>
                <p >{optionalField.bio ? 'Click to hide' : 'Click to expand'}</p>
                <img style={{ 'transform': optionalField.bio ? 'rotate(180deg)' : 'rotate(0deg)' }} width={30} height={30} src={back_icon} alt='back' />
              </div>
            </div>
            {optionalField.bio ? <textarea type="text" id="bio" className={style.bio} placeholder='A few words about you...'{...register("bio", { required: false })} autoComplete='off' /> : null}
          </div>

          <div className={style.optionalField}>
            <div style={{ 'height': '80px', 'borderTop': '1px solid #DADADA' }}>
              <h5 className={style.optionalSection}>Contact</h5>
              <div className={style.expand} onClick={() => setOptionalField({ ...optionalField, contact: !optionalField.contact })}>
                <p >{optionalField.contact ? 'Click to hide' : 'Click to expand'}</p>
                <img style={{ 'transform': optionalField.contact ? 'rotate(180deg)' : 'rotate(0deg)' }} width={30} height={30} src={back_icon} alt='back' />
              </div>
            </div>

            {/* OPTIONAL - CONTACT */}
            <div className={style.content} style={{ 'marginBottom': optionalField.contact ? '30px' : '0' }}>
              {optionalField.contact ?
                <>
                  <p style={{ 'textAlign': 'center', 'width': 'max-content', 'margin': '0 auto', 'padding': '24px' }}>These information are visible to anyone</p>
                  <div style={{ 'display': 'flex', 'justifyContent': 'center' }}><img src={messageIcon} style={{ 'margin': '0 15px' }} alt="email" /><input type="email" id="email" className={style.email} placeholder='Email'{...register("email", { required: false })} autoComplete='off' /></div>
                  <div style={{ 'display': 'flex', 'justifyContent': 'center' }}><img src={websiteIcon} style={{ 'margin': '0 15px' }} alt="website" /><input type="url" id="websiteLink" className={style.email} placeholder='Website'
                    {...register("websiteLink",
                      {
                        // format checking is not working
                        required: false,
                        pattern: {
                          // value: "http(s?)(:\/\/)((www.)?)(([^.]+)\.)?([a-zA-z0-9\-_]+)(.com|.net|.gov|.org|.in)(\/[^\s]*)?",
                          value: "http(s?)(:)((www.)?)(([^.]+))?([a-zA-z0-9_]+)(.com|.net|.gov|.org|.in)([^]*)?",
                          message: "Invalid link format.",
                        },
                      }
                    )}

                    autoComplete='off' /></div>
                  <p>{errors.websiteLink?.message}</p>
                  <div style={{ 'display': 'flex', 'justifyContent': 'center' }}><img src={phoneIcon} style={{ 'margin': '0 15px' }} alt="phone number" /><input type="text" id="phone" className={style.email} placeholder='Phone Number'{...register("phone", { required: false })} autoComplete='off' /></div>
                </>
                : null}

            </div>
          </div>


        </>

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
            <button style={{ 'backgroundColor': '#5F69C6' }} onClick={() => setStep(3)}>Summarize</button>}
        </div>
      </form>


    </div>
  )
}
