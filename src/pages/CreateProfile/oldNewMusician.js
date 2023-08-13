import React, { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import back_icon from '../../media/icons/expand.svg'
import style from '../../style/CreateProfile/NewMusician.module.css'
import AuthContext from '../../context/AuthContext'
import upload_icon from '../../media/icons/upload.svg'
import default_img from '../../media/musician.png'
import axios from 'axios'
import { useForm } from 'react-hook-form'

export default function NewMusician() {

  let { user } = useContext(AuthContext)
  const [image, setImage] = useState(default_img)

  const form = useForm();
  const { register } = form





  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  }

  function submitForm() {
    axios.post('http://127.0.0.1:8000/profiles/musicians/', {
      first_name: 'tester',
      last_name: 'testerer',
      guitar: false,
      bass: true,
      drums: false,
      rock: true,
      jazz: true,
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
      <div className={style.top}>
        <div className={style.back}>
          <img style={{ 'transform': 'rotate(90deg)' }} width={30} height={30} src={back_icon} />
          <Link to='/profiles'>Back</Link>
        </div> Required Fields
      </div>




      <div className={style.body}>
        {/* UPLOADED IMAGE */}
        <img src={image} style={{ 'borderRadius': '200px' }} width={150} height={150} />
        <div className={style.uploadPhoto}>

          <input style={{ 'display': 'none' }} type="file" id="img" name="img" accept="image/*" onChange={onImageChange}></input>

          <label className={style.upload_text} htmlFor='img'>
            <img src={upload_icon} width={25} height={25} />
            <p>Upload Photo</p></label>
        </div>

        {/* <button onClick={submitForm}>upload</button> */}


        <div className={style.instruments}>
          <h6>Instruments</h6>

          <form className={style.allInstruments}>
            <input type="checkbox" id="guitar" value="guitar" />
            <label htmlFor="guitar">Guitar</label><br></br>

           
            <input type="guitar" id="guitar"
              {...register("guitar", {
              
                required: true
              })} />

          </form>

        </div>



      </div>




    </div>
  )
}
