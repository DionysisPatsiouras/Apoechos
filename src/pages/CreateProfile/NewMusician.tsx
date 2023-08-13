import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'

// import { Link } from 'react-router-dom'
// import back_icon from '../../media/icons/expand.svg'
import style from '../../style/CreateProfile/NewMusician.module.css'



import AuthContext from '../../context/AuthContext'
// import upload_icon from '../../media/icons/upload.svg'
// import default_img from '../../media/musician.png'
import axios from 'axios'



export default function NewMusician() {

  let { user } = useContext(AuthContext)
  // const [image, setImage] = useState(default_img)
  const [category, setCategory] = useState('Strings')

  const form = useForm<FormValues>();
  const { register, handleSubmit, formState: { errors } } = form


  type FormValues = {

    instruments: {
      guitar: boolean,
      bass: boolean,
      drums: boolean
    }
  }


  const onSubmit = data => {

    const i = data.instruments

    const allInstrumentsAreFalse =
      !i.guitar &&
      !i.drums &&
      !i.bass



    if (allInstrumentsAreFalse) {
      console.log('This cant be empty')
    } else {
      axios.post('http://127.0.0.1:8000/profiles/musicians/', {
        first_name: 'user1',
        last_name: 'his last name',
        guitar: data.instruments.guitar,
        drums: data.instruments.drums,
        bass: data.instruments.bass,
        rock: false,
        jazz: false,
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






  return (

    <div className={style.container}>

      <h5>Instruments</h5>

      <ul className={style.categoryBoxes}>
        <li onClick={() => setCategory('Strings')} style={{ 'backgroundColor': category === 'Strings' ? '#5F69C6' : '#B4B3B2' }}>Strings</li>
        <li onClick={() => setCategory('Woodwind')} style={{ 'backgroundColor': category === 'Woodwind' ? '#5F69C6' : '#B4B3B2' }}>Woodwind</li>
        <li onClick={() => setCategory('Keys')} style={{ 'backgroundColor': category === 'Keys' ? '#5F69C6' : '#B4B3B2' }}>Keys</li>
        <li onClick={() => setCategory('Percussion')} style={{ 'backgroundColor': category === 'Percussion' ? '#5F69C6' : '#B4B3B2' }}>Percussion</li>
        <li onClick={() => setCategory('Vocals')} style={{ 'backgroundColor': category === 'Vocals' ? '#5F69C6' : '#B4B3B2' }}>Vocals</li>
        <li onClick={() => setCategory('Other')} style={{ 'backgroundColor': category === 'Other' ? '#5F69C6' : '#B4B3B2' }}>Other</li>
      </ul>

      <form className={style.instrumentsForm} onSubmit={handleSubmit(onSubmit)} noValidate>

        {/* STRINGS LIST */}
        <ul className={style.instrumentsList} style={{ 'display': category === 'Strings' ? 'block' : 'none' }}>
          <li><input type="checkbox" id="guitar" {...register("instruments.guitar", { required: false })} /><label htmlFor='guitar'>Guitar</label></li>
          <li><input type="checkbox" id="bass"{...register("instruments.bass", { required: false })} /><label htmlFor='bass'>Bass</label></li>
        </ul>


        {/* PERCUSSION LIST */}
        <ul className={style.instrumentsList} style={{ 'display': category === 'Percussion' ? 'block' : 'none' }}>
          <li><input type="checkbox" id="drums" {...register("instruments.drums", { required: false })} /><label htmlFor='drums'>Drums</label></li>
        </ul>





        <button>Check</button>
      </form>


    </div >
  )
}
