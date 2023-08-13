import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import AuthContext from '../../context/AuthContext'
import axios from 'axios'


import back_icon from '../../media/icons/expand.svg'
import style from '../../style/CreateProfile/NewMusician.module.css'

import strings_icon from '../../media/icons/instruments/strings.svg'
import woodwind_icon from '../../media/icons/instruments/woodwind.svg'
import keys_icon from '../../media/icons/instruments/keys.svg'
import percussion_icon from '../../media/icons/instruments/percussion.svg'
import vocals_icon from '../../media/icons/instruments/vocals.svg'
import other_icon from '../../media/icons/instruments/other.svg'


import upload_icon from '../../media/icons/upload.svg'
import default_img from '../../media/musician.png'



export default function NewMusician() {

  let { user } = useContext(AuthContext)
  const [image, setImage] = useState(default_img)
  const [category, setCategory] = useState('Strings')
  const [step, setStep] = useState(1)

  const form = useForm<FormValues>();
  const { register, handleSubmit, formState: { errors } } = form

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  }
  type FormValues = {

    bio: string
    name: string

    instruments: {
      guitar: boolean,
      bass: boolean,
      drums: boolean

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

    const allInstrumentsAreFalse =
      !i.guitar &&
      !i.drums &&
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
          guitar: data.instruments.guitar,
          drums: data.instruments.drums,
          bass: data.instruments.bass,
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
          <img style={{ 'transform': 'rotate(90deg)' }} width={30} height={30} src={back_icon} />
    
          <Link to='/profiles'>Back</Link>
  
        </div> Required Fields
      </div>



      {step === 1 ?

        <div>
          {/* PHOTO SECTION */}
          <div className={style.personalInfoSection}>
            <img src={image} style={{ 'borderRadius': '200px' , 'objectFit' : 'cover'}} width={150} height={150}/>
            <div className={style.uploadPhoto}>
              <input style={{ 'display': 'none' }} type="file" id="img" name="img" accept="image/*" onChange={onImageChange}></input>
              <label className={style.upload_text} htmlFor='img'>
                <img src={upload_icon} width={25} height={25} />
                <p>Upload Photo</p></label>
            </div>

            <input type="text" id="name" {...register("name", { required: false })} placeholder='Your artistic name'/>

          </div>
          <h5>Instruments</h5>

          <ul className={style.categoryBoxes}>
            <li onClick={() => setCategory('Strings')} style={{ 'backgroundColor': category === 'Strings' ? '#5F69C6' : '#B4B3B2' }}><img src={strings_icon} />Strings</li>
            <li onClick={() => setCategory('Woodwind')} style={{ 'backgroundColor': category === 'Woodwind' ? '#5F69C6' : '#B4B3B2' }}><img src={woodwind_icon} />Woodwind</li>
            <li onClick={() => setCategory('Keys')} style={{ 'backgroundColor': category === 'Keys' ? '#5F69C6' : '#B4B3B2' }}><img src={keys_icon} />Keys</li>
            <li onClick={() => setCategory('Percussion')} style={{ 'backgroundColor': category === 'Percussion' ? '#5F69C6' : '#B4B3B2' }}><img src={percussion_icon} />Percussion</li>
            <li onClick={() => setCategory('Vocals')} style={{ 'backgroundColor': category === 'Vocals' ? '#5F69C6' : '#B4B3B2' }}><img src={vocals_icon} />Vocals</li>
            <li onClick={() => setCategory('Other')} style={{ 'backgroundColor': category === 'Other' ? '#5F69C6' : '#B4B3B2' }}><img src={other_icon} />Other</li>
          </ul>

          <div className={style.stepOne}>
            {/* STRINGS LIST */}
            <ul className={style.instrumentsList} style={{ 'display': category === 'Strings' ? 'flex' : 'none' }}>
              <div className={style.columnList}>
                <li><input type="checkbox" id="guitar" {...register("instruments.guitar", { required: false })} /><label htmlFor='guitar'>Guitar</label></li>
                <li><input type="checkbox" id="bass"{...register("instruments.bass", { required: false })} /><label htmlFor='bass'>Bass</label></li>
                {/* <li><input type="checkbox" id="acoustic"{...register("instruments.bass", { required: false })} /><label htmlFor='acoustic'>Acoustic Guitar</label></li>
                <li><input type="checkbox" id="harp"{...register("instruments.bass", { required: false })} /><label htmlFor='harp'>Harp</label></li>
                <li><input type="checkbox" id="ukelele"{...register("instruments.bass", { required: false })} /><label htmlFor='ukelele'>Ukelele</label></li> */}
              </div>

              <div className={style.columnList}>
                {/* <li><input type="checkbox" id="Violi"{...register("instruments.bass", { required: false })} /><label htmlFor='Violi'>Violi</label></li>
                <li><input type="checkbox" id="Viola"{...register("instruments.bass", { required: false })} /><label htmlFor='Viola'>Viola</label></li>
                <li><input type="checkbox" id="Cello"{...register("instruments.bass", { required: false })} /><label htmlFor='Cello'>Cello</label></li>
                <li><input type="checkbox" id="Bouzouki"{...register("instruments.bass", { required: false })} /><label htmlFor='Bouzouki'>Bouzouki</label></li>
                <li><input type="checkbox" id="Lyra"{...register("instruments.bass", { required: false })} /><label htmlFor='Lyra'>Lyra</label></li> */}

              </div>
            </ul>


            {/* PERCUSSION LIST */}
            <ul className={style.instrumentsList} style={{ 'display': category === 'Percussion' ? 'block' : 'none' }}>
              <li><input type="checkbox" id="drums" {...register("instruments.drums", { required: false })} /><label htmlFor='drums'>Drums</label></li>
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
        <><input type="text" id="bio" {...register("bio", { required: false })} /><label htmlFor='bio'>Country</label></>
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
