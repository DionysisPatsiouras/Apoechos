
import UtilsContext from '../context/UtilsContext'

import { useContext, useEffect, useState } from 'react'
import CSS from '../css/Homepage/Homepage.module.css'
import SvgIcon from '../components/SvgIcon'


import musicianBg from '../img/backgrounds/musician.jpg'
import bandBg from '../img/backgrounds/band.jpg'
import studioBg from '../img/backgrounds/studio.jpg'
import storeBg from '../img/backgrounds/store.jpg'
import stageBg from '../img/backgrounds/stage.jpg'
import logo from '../img/logo2.png'
import { Link } from 'react-router-dom'
import ReactPlayer from 'react-player'
import FixedButton from '../components/FixedButton'

import ProfileSection from '../components/Homepage/ProfileSection'

export default function Homepage() {

  let { categories, get_categories }: any = useContext(UtilsContext)

  let threshold = 768

  const [width, setWidth] = useState<any>(undefined)
  const [height, setHeight] = useState(100)
  const [y, setY] = useState<number>(0)
  console.log("🚀 ~ Homepage ~ y:", y)



  useEffect(() => {

    setWidth(window.innerWidth)
    window.addEventListener("resize", () => setWidth(window.innerWidth))

    setHeight(window.innerHeight)
    window.addEventListener("resize", () => setHeight(window.innerHeight))


  }, [height])


  useEffect(() => {
    get_categories()
  }, [])

  useEffect(() => {
    setY(window.scrollY)
  }, )


  const scroll_to_top = () => {

      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
      })
  

  }



  let background = [musicianBg, bandBg, studioBg, storeBg, stageBg]



  return (
    <div>

  
      {/* <FixedButton icon='top_arrow' onClick={scroll_to_top} /> */}


      <section className={CSS.head} style={{ height: height - 200 }}>



        <div>
          <img src={logo} alt='apoechos logo' className={CSS.logo} style={{padding: '0'}} />
          <h1 className={CSS.appname}>apoechos</h1>
          <p className={CSS.motto}>Όλη η μουσική κοινότητα... ενωμένη!</p>
        </div>
        <ReactPlayer url='../video/bg3.mp4' loop muted={true} playing={true} width={100} />


        <div>
          <p className={CSS.smallText} style={{ fontSize: '16px' }}>{`Ετυμολογία: [<από + ήχος]`}</p>
          <p className={CSS.smallText} style={{ fontSize: '12px' }}>{`ήχος μακρινός που μόλις ακούγεται · ήχος που φτάνει ως εμάς σβησμένος`}</p>
        </div>

      </section>



      <section className={`${CSS.all_slides} items-inline`}>

        {categories.map((category: any, index: number) => (
          // <Link to={`#${category?.icon}`}>

          <div
            key={index}
            className={`${CSS.slide} cursor-pointer`}
            style={{
              backgroundImage: `url(${background?.[index]})`,
              height: width <= threshold ? '200px' : `${height - 126.33}px`,
              borderTop: `10px solid ${category?.color}`

            }}
          >
            <div className={CSS.category}>
              <div
                className={CSS.categoryIcon}
                style={{ backgroundColor: category.color }}>
                <SvgIcon id={category.icon} color='#fff' />
              </div>
              <p className={CSS.label}>
                {category.name}</p>
            </div>
          </div>
          // </Link>
        ))
        }

      </section>


      <ProfileSection
        id="musician"
        img={musicianBg}
        icon='musician'
        text='Αν είσαι μουσικός μπορείς μέσω το apoechos.gr να:Δικτυωθείς Βρείς νέο συγκρότημαΓνωρίσεις τη μουσική πλευρά της πόλης σουΔιαφημίσεις τα event σου κ.α'
        title='Μουσικοί'
        color={categories?.[0]?.color}
      />
      <hr></hr>

      <ProfileSection
        id="musician"
        img={bandBg}
        icon='band'
        text='Αν είσαι μουσικός μπορείς μέσω το apoechos.gr να:Δικτυωθείς Βρείς νέο συγκρότημαΓνωρίσεις τη μουσική πλευρά της πόλης σουΔιαφημίσεις τα event σου κ.α'
        title='Συγκροτήματα'
        color={categories?.[1]?.color}
      />
      <hr></hr>
      <ProfileSection
        id="musician"
        img={studioBg}
        icon='studio'
        text='Αν είσαι μουσικός μπορείς μέσω το apoechos.gr να:Δικτυωθείς Βρείς νέο συγκρότημαΓνωρίσεις τη μουσική πλευρά της πόλης σουΔιαφημίσεις τα event σου κ.α'
        title='Στούντιο'
        color={categories?.[2]?.color}
      />
      <hr></hr>
      <ProfileSection
        id="musician"
        img={stageBg}
        icon='stage'
        text='Αν είσαι μουσικός μπορείς μέσω το apoechos.gr να:Δικτυωθείς Βρείς νέο συγκρότημαΓνωρίσεις τη μουσική πλευρά της πόλης σουΔιαφημίσεις τα event σου κ.α'
        title='Σκηνές'
        color={categories?.[4]?.color}
      />
      <hr></hr>
      <ProfileSection
        id="musician"
        img={storeBg}
        icon='store'
        text='Αν είσαι μουσικός μπορείς μέσω το apoechos.gr να:Δικτυωθείς Βρείς νέο συγκρότημαΓνωρίσεις τη μουσική πλευρά της πόλης σουΔιαφημίσεις τα event σου κ.α'
        title='Καταστήματα'
        color={categories?.[3]?.color}
      />

      {/* <div id="musicians">dsd</div> */}

    </div>
  )
}