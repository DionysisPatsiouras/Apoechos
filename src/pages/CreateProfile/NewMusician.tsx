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

// import str from '../../media/json/instruments.json'


export default function NewMusician() {

  let { user } = useContext(AuthContext)
  const [image, setImage] = useState(default_img)
  const [category, setCategory] = useState('Strings')
  const [step, setStep] = useState(1)
  const [useMyName, setUseMyName] = useState(false)

  const form = useForm<FormValues>();
  // const { register, handleSubmit, formState: { errors } } = form
  const { register, handleSubmit } = form

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  }

  type FormValues = {

    str: any
    bio: string
    name: string

    instruments: {
      classic_guitar: boolean,
      electric_guitar: boolean,
      acoustic_guitar: boolean,
      electric_bass: boolean,
      acoustic_bass: boolean,
      double_bass: boolean,
      violin: boolean,
      viola: boolean,
      cello: boolean,
      harp: boolean,
      ukelele: boolean,

      drums: boolean,
      cajon: boolean,
      congos: boolean,
      tambourine: boolean,

      trumbet: boolean,
      trombone: boolean,
      french_horn: boolean,
      tuba: boolean,
      cornet: boolean,
      piccolo_trumbet: boolean,
      flugelhorn: boolean,


      vocalist: boolean,
      backing_vocalist: boolean,
      soprano: boolean,
      mezzo_soprano: boolean,
      contralto: boolean,
      tenor: boolean,
      baritone: boolean,
      bass: boolean,
    }

    genres: {
      rock: boolean,
      jazz: boolean,
      country: boolean
    }
  }


  const onSubmit = data => {
    console.log(data)
    const i = data.instruments
    const g = data.genres

    const allInstrumentsAreFalse = !i.classic_guitar &&
      !i.electric_guitar &&
      !i.acoustic_guitar &&
      !i.electric_bass &&
      !i.acoustic_bass &&
      !i.double_bass &&
      !i.violin &&
      !i.viola &&
      !i.cello &&
      !i.harp &&
      !i.ukelele &&

      !i.drums &&
      !i.cajon &&
      !i.congos &&
      !i.tambourine &&


      !i.trumbet &&
      !i.trombone &&
      !i.french_horn &&
      !i.tuba &&
      !i.cornet &&
      !i.piccolo_trumbet &&
      !i.flugelhorn &&

      !i.vocalist &&
      !i.backing_vocalist &&
      !i.soprano &&
      !i.mezzo_soprano &&
      !i.contralto &&
      !i.tenor &&
      !i.baritone &&
      !i.bass


    const allGenresAreFalse =
      !g.rock &&
      !g.jazz &&
      !g.country


    if (allInstrumentsAreFalse || allGenresAreFalse) {
      setStep(1)
      alert('Fill all required fields')


    } else {

      if (step === 2) {
        // alert('one more step')

      } else {

        // ALSO add a "PUT" request on 'hasMusicianProfile'  
        axios.post('http://127.0.0.1:8000/profiles/musicians/', {
          first_name: 'user1',
          last_name: 'his last name',

          classic_guitar: data.instruments.classic_guitar,
          electric_guitar: data.instruments.electric_guitar,
          acoustic_guitar: data.instruments.acoustic_guitar,
          electric_bass: data.instruments.electric_bass,
          acoustic_bass: data.instruments.acoustic_bass,
          double_bass: data.instruments.double_bass,
          violin: data.instruments.violin,
          viola: data.instruments.viola,
          cello: data.instruments.cello,
          harp: data.instruments.harp,
          ukelele: data.instruments.ukelele,


          drums: data.instruments.drums,
          cajon: data.instruments.drums,
          congos: data.instruments.drums,
          tambourine: data.instruments.drums,

          rock: data.genres.rock,
          jazz: data.genres.jazz,
          country: data.genres.country,
          bio: data.bio,
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

    }




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
                <input style={{ 'display': 'none' }} type="file" id="img" name="img" accept="image/*" onChange={onImageChange}></input>
                <label className={style.upload_text} htmlFor='img'>
                  <img src={upload_icon} width={25} height={25} alt='upload' />
                  <p>Upload Photo</p></label>
              </div>
            </div>
            <div className={style.nameSection}>
              {/* NOT WORKING */}
              <input type="text" id="name" {...register("name", { required: false })} onChange={() => setUseMyName(false)} placeholder={useMyName ? user.first_name + ' ' + user.last_name : ''} />

              OR
              <input type="checkbox" id="my-name" onClick={() => setUseMyName(!useMyName)} />
              <label htmlFor='my-name'>Use your account name</label>
              <p>{'(' + user.first_name + ' ' + user.last_name + ')'} </p>
            </div>
          </div>
          <h5>Instruments</h5>

          <ul className={style.categoryBoxes}>
            <li onClick={() => setCategory('Strings')} style={{ 'backgroundColor': category === 'Strings' ? '#5F69C6' : '#B4B3B2' }}><img src={strings_icon} alt='strings' />Strings</li>
            <li onClick={() => setCategory('Brass')} style={{ 'backgroundColor': category === 'Brass' ? '#5F69C6' : '#B4B3B2' }}><img src={brass_icon} alt='brass' />Brass</li>
            <li onClick={() => setCategory('Keys')} style={{ 'backgroundColor': category === 'Keys' ? '#5F69C6' : '#B4B3B2' }}><img src={keys_icon} alt='keys' />Keys</li>
            <li onClick={() => setCategory('Percussion')} style={{ 'backgroundColor': category === 'Percussion' ? '#5F69C6' : '#B4B3B2' }}><img src={percussion_icon} alt='percussion' />Percussion</li>
            <li onClick={() => setCategory('Vocals')} style={{ 'backgroundColor': category === 'Vocals' ? '#5F69C6' : '#B4B3B2' }}><img src={vocals_icon} alt='vocals' />Vocals</li>
            <li onClick={() => setCategory('Other')} style={{ 'backgroundColor': category === 'Other' ? '#5F69C6' : '#B4B3B2' }}><img src={other_icon} alt='other' />Other</li>
          </ul>

          <div className={style.stepOne}>
            {/* STRINGS LIST */}
            <ul className={style.instrumentsList} style={{ 'display': category === 'Strings' ? 'flex' : 'none' }}>
              <div className={style.columnList}>
                <li><input type="checkbox" id="classic_guitar" {...register("instruments.classic_guitar", { required: false })} /><label htmlFor='classic_guitar'>Classic Guitar</label></li>
                <li><input type="checkbox" id="electric_guitar"{...register("instruments.electric_guitar", { required: false })} /><label htmlFor='electric_guitar'>Electric Guitar</label></li>
                <li><input type="checkbox" id="acoustic_guitar"{...register("instruments.acoustic_guitar", { required: false })} /><label htmlFor='acoustic_guitar'>Acoustic Guitar</label></li>
                <li><input type="checkbox" id="electric_bass"{...register("instruments.electric_bass", { required: false })} /><label htmlFor='electric_bass'>Electric Bass</label></li>


              </div>
              <div className={style.columnList}>
                <li><input type="checkbox" id="acoustic_bass"{...register("instruments.acoustic_bass", { required: false })} /><label htmlFor='acoustic_bass'>Acoustic Bass</label></li>
                <li><input type="checkbox" id="double_bass"{...register("instruments.double_bass", { required: false })} /><label htmlFor='double_bass'>Double Bass</label></li>
                <li><input type="checkbox" id="violin"{...register("instruments.violin", { required: false })} /><label htmlFor='violin'>Violin</label></li>
                <li><input type="checkbox" id="viola"{...register("instruments.viola", { required: false })} /><label htmlFor='viola'>Viola</label></li>

              </div>
              <div className={style.columnList}>
                <li><input type="checkbox" id="cello"{...register("instruments.cello", { required: false })} /><label htmlFor='cello'>Cello</label></li>
                <li><input type="checkbox" id="harp"{...register("instruments.harp", { required: false })} /><label htmlFor='harp'>Harp</label></li>
                <li><input type="checkbox" id="ukelele"{...register("instruments.ukelele", { required: false })} /><label htmlFor='ukelele'>Ukelele</label></li>
              </div>
            </ul>


            {/* PERCUSSION LIST */}
            <ul className={style.instrumentsList} style={{ 'display': category === 'Percussion' ? 'flex' : 'none' }}>
              <div className={style.columnList}>
                <li><input type="checkbox" id="drums" {...register("instruments.drums", { required: false })} /><label htmlFor='drums'>Drums</label></li>
                <li><input type="checkbox" id="cajon" {...register("instruments.cajon", { required: false })} /><label htmlFor='cajon'>Cajon</label></li>
                <li><input type="checkbox" id="congos" {...register("instruments.congos", { required: false })} /><label htmlFor='congos'>Congos</label></li>
                <li><input type="checkbox" id="tambourine" {...register("instruments.tambourine", { required: false })} /><label htmlFor='tambourine'>Tambourine</label></li>
              </div>
            </ul>



            {/* BRASS LIST */}
            <ul className={style.instrumentsList} style={{ 'display': category === 'Brass' ? 'flex' : 'none' }}>
              <div className={style.columnList}>
                <li><input type="checkbox" id="trumbet" {...register("instruments.trumbet", { required: false })} /><label htmlFor='trumbet'>Trumbet</label></li>
                <li><input type="checkbox" id="trombone" {...register("instruments.trombone", { required: false })} /><label htmlFor='trombone'>Trombone</label></li>
                <li><input type="checkbox" id="french_horn" {...register("instruments.french_horn", { required: false })} /><label htmlFor='french_horn'>French Horn</label></li>
                <li><input type="checkbox" id="tuba" {...register("instruments.tuba", { required: false })} /><label htmlFor='tuba'>Tuba</label></li>

              </div>
              <div className={style.columnList}>
                <li><input type="checkbox" id="cornet" {...register("instruments.cornet", { required: false })} /><label htmlFor='cornet'>Cornet</label></li>
                <li><input type="checkbox" id="piccolo_trumbet" {...register("instruments.piccolo_trumbet", { required: false })} /><label htmlFor='piccolo_trumbet'>Piccolo Trumbet</label></li>
                <li><input type="checkbox" id="flugelhorn" {...register("instruments.flugelhorn", { required: false })} /><label htmlFor='flugelhorn'>Flugelhorn</label></li>
              </div>
            </ul>


            {/* VOCALS LIST */}
            <ul className={style.instrumentsList} style={{ 'display': category === 'Vocals' ? 'flex' : 'none' }}>
              <div className={style.columnList}>
                <li><input type="checkbox" id="vocalist" {...register("instruments.vocalist", { required: false })} /><label htmlFor='vocalist'>Vocalist</label></li>
                <li><input type="checkbox" id="backing_vocalist" {...register("instruments.backing_vocalist", { required: false })} /><label htmlFor='backing_vocalist'>Backing Vocalist</label></li>
                <li><input type="checkbox" id="soprano" {...register("instruments.soprano", { required: false })} /><label htmlFor='soprano'>Soprano</label></li>
                <li><input type="checkbox" id="mezzo_soprano" {...register("instruments.mezzo_soprano", { required: false })} /><label htmlFor='mezzo_soprano'>Mezzo Soprano</label></li>

              </div>

              <div className={style.columnList}>

                <li><input type="checkbox" id="contralto" {...register("instruments.contralto", { required: false })} /><label htmlFor='contralto'>Contralto</label></li>
                <li><input type="checkbox" id="tenor" {...register("instruments.tenor", { required: false })} /><label htmlFor='tenor'>Tenor</label></li>
                <li><input type="checkbox" id="baritone" {...register("instruments.baritone", { required: false })} /><label htmlFor='baritone'>Baritone</label></li>
                <li><input type="checkbox" id="bass" {...register("instruments.bass", { required: false })} /><label htmlFor='bass'>Bass</label></li>
              </div>
            </ul>



            <h5>Genres</h5>

            {/* GENRES LIST */}
            <ul className={style.instrumentsList} style={{ 'display': 'flex' }}>
              <div className={style.columnList}>
                <li><input type="checkbox" id="rock" {...register("genres.rock", { required: false })} /><label htmlFor='rock'>Rock</label></li>
                <li><input type="checkbox" id="jazz" {...register("genres.jazz", { required: false })} /><label htmlFor='jazz'>Jazz</label></li>
                <li><input type="checkbox" id="country" {...register("genres.country", { required: false })} /><label htmlFor='country'>Country</label></li>
              </div>
              <div className={style.columnList}>
                {/* <li><input type="checkbox" id="metal" {...register("genres.rock", { required: false })} /><label htmlFor='metal'>Metal</label></li>
                <li><input type="checkbox" id="punk" {...register("genres.jazz", { required: false })} /><label htmlFor='punk'>Punk</label></li>
                <li><input type="checkbox" id="classical" {...register("genres.country", { required: false })} /><label htmlFor='classical'>Classical</label></li> */}
              </div>


            </ul>
          </div>

        </div>
        :
        <><input type="text" id="bio" {...register("bio", { required: false })} /><label htmlFor='bio'>Bio</label></>
      }




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
