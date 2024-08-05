
import UtilsContext from '../context/UtilsContext'

import { useContext, useEffect, useState } from 'react'
import CSS from '../css/Homepage/Homepage.module.css'
import SvgIcon from '../components/SvgIcon'

// images
import musicianBg from '../img/backgrounds/musician.jpg'
import bandBg from '../img/backgrounds/band.jpg'
import studioBg from '../img/backgrounds/studio.jpg'
import storeBg from '../img/backgrounds/store.jpg'
import stageBg from '../img/backgrounds/stage.jpg'
import full_logo from '../img/full_logo.png'


export default function Homepage() {

  let { categories, get_categories }: any = useContext(UtilsContext)

  let threshold = 768
  const [width, setWidth] = useState<any>(undefined)
  const [height, setHeight] = useState<any>(undefined)



  useEffect(() => {

    document.title = 'Apoechos - Αρχική'

    setWidth(window.innerWidth)
    window.addEventListener("resize", () => setWidth(window.innerWidth))

    setHeight(window.innerHeight)
    window.addEventListener("resize", () => setHeight(window.innerHeight))

    get_categories()
  // }, [height])
  }, [height])


  
  // console.log(categories)

  let background = [
    { id: 1, bg: musicianBg },
    { id: 2, bg: bandBg },
    { id: 3, bg: studioBg },
    { id: 4, bg: storeBg },
    { id: 5, bg: stageBg },
  ]


  return (
    <div>

      <section className={`${CSS.head} `} >
        <img src={full_logo} width={300} alt='apoechos logo' />
        <a href='#description'>
          <button className='blue_btn btn'>Γνωρίστε τον <b>apoechos.gr</b> </button>
        </a>
      </section>


      <section className={`${CSS.all_slides} items-inline`}>

        {categories.map((category: any, index: number) => (
          <div
            key={index}
            className={`${CSS.slide} cursor-pointer`}
            style={{
              backgroundImage: `url(${background?.[index]?.bg})`,
              height: width <= threshold ? '200px' : `${height - 126.33}px`
            }}
          >
            <div className={CSS.category}>
              <div
                className={CSS.categoryIcon}
                style={{ backgroundColor: category.color }}>
                <SvgIcon id={category.icon} color='#fff' />
              </div>
              <p className={CSS.label} style={{ backgroundColor: category.color }}>{category.name}</p>
            </div>
          </div>
        ))
        }

      </section>

      <div id='description' className={CSS.description}>
        <h1>Γνωρίστε τον apoechos</h1>
        <br></br>
        <p>
          Ο <b>apoechos.gr</b> είναι μια <b>δωρεάν</b> εφαρμογή και έχει ως σκοπό την ενδυνάμωση της μουσικής κοινότητας σε τοπικό και πανελλήνιο επίπεδο.
          <br></br>
          <br></br>

          Απευθύνεται σε:
          <br></br>
          <br></br>
          <ul>
            <li>Μουσικούς</li>
            <li>Συγκροτήματα</li>
            <li>Στούντιο</li>
            <li>Καταστήματα</li>
            <li>Σκηνές</li>
          </ul>
        </p>
      </div>

    </div>
  )
}