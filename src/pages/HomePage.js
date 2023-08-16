import React from 'react'
import s from '../media/json/genres.json'
export default function HomePage() {


  // let array = [{ guitar: true }, { bass: false }]
  let array =[1, 12, 15, 16, 55 ]

  array.every(checkAge)

  function checkAge(age) {
    return age > 18;
  }

  return (
    <div>HomePage
      {/* {console.log(...array)}
      {console.log(...s.genres)} */}
      {console.log(checkAge())}

    </div>
  )
}
