
import UtilsContext from '../context/UtilsContext'

import { useContext, useEffect } from 'react'
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


  useEffect(() => {

    get_categories()
  }, [])

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
        <img src={full_logo} width={300} />
        <button className='blue_btn btn'>Γνωρίστε τον <b>apoechos.gr</b> </button>
      </section>


      <section className={`${CSS.all_slides} items-inline`}>

        {categories.map((category: any, index: number) => (
          <div
            key={index}
            className={`${CSS.slide} cursor-pointer`}
            style={{ backgroundImage: `url(${background?.[index]?.bg})` }}
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


      </section >

    </div>
  )
}