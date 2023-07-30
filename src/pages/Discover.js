import React, { useState, useEffect } from 'react'
import axios from 'axios'
import style from '../style/Discover.module.css'
import pic from '../media/musician.png'


export default function Discover() {


  const [data, setData] = useState([])
  const [color, setColor] = useState()


  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/profiles/')
      .then((response) => {
        setData(response.data)
      });
  }, []);




  return (
    <div className={style.container}>

      {console.log(...data)}

      {data.map((i) => (
        <div key={i.id + i.category} className={style.card}>
       

          <img src={pic} />
          {console.log(i.category)}


          <h6>{i.title || i.first_name}</h6>
          <svg className={style.decoration} width="127" height="120" viewBox="0 0 127 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.420479 6.61019e-06C98.7057 3.61285e-06 125.759 80 127 120L127 4C127 1.79087 125.249 2.80339e-06 123.039 2.87076e-06L0.420479 6.61019e-06Z"
              fill={color}



            />
          </svg>
        </div>

      ))}



    </div>
  )
}
