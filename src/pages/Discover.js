import React, {useState, useEffect} from 'react'
import axios from 'axios'


export default function Discover() {


  const [data, setData] = useState()

  useEffect(() => {
    axios
    .get('http://127.0.0.1:8000/profiles/')
    .then((response) => {setData(response.data)})
  }, [])

  return (
    <div>
      {console.log(...data)}
      
    </div>
  )
}
