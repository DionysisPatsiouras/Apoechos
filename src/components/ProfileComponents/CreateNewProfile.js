import React, { useContext, useState } from 'react'
import style from '../../style/Profiles.module.css'

import AuthContext from '../../context/AuthContext'
import ProfileSelection from './ProfileSelection'


import musicianDark from '../../media/icons/profiles/dark/musician.svg'
import bandDark from '../../media/icons/profiles/dark/band.svg'
import studioDark from '../../media/icons/profiles/dark/studio.svg'
import stageDark from '../../media/icons/profiles/dark/stage.svg'
import storeDark from '../../media/icons/profiles/dark/store.svg'


import musicianLight from '../../media/icons/profiles/light/musician.svg'
import bandLight from '../../media/icons/profiles/light/band.svg'
import studioLight from '../../media/icons/profiles/light/studio.svg'
import stageLight from '../../media/icons/profiles/light/stage.svg'
import storeLight from '../../media/icons/profiles/light/store.svg'



export default function Profiles() {


  const [active, setActive] = useState('')
  const [numberOfSteps, setNumberOfSteps] = useState(4)
  let { user } = useContext(AuthContext)
  const hasAllProfiles = user.hasMusicianProfile && user.hasBandProfile && user.hasStudioProfile && user.hasStageProfile && user.hasStoreProfile


  return (
    <div className={style.wrapper}>
      <div className={style.container}>



      
        <h5>Create personal or business profile</h5>
        <p className={style.about}>There is no limit to how many profile types you can create!</p>

        <div className={style.allSelections}>


          <div className={style.desktopTitles}>
            <p>Profile Type</p>
            <p>Benefits</p>
          </div>



          {user.hasMusicianProfile ? null :

            <ProfileSelection
              id={'Musician'}
              description={'Discover new musicians'}
              signatureColor={'#10ACDD'}
              setActive={() => setActive('Musician')}
              setNumberOfSteps={() => setNumberOfSteps(3)}
              active={active}
              blackImg={musicianDark}
              whiteImg={musicianLight}
        

            />
          }

          {user.hasBandProfile ? null :

            <ProfileSelection
              id={'Band'}
              description={'Promote your band'}
              signatureColor={'#E37056'}
              setActive={() => setActive('Band')}
              setNumberOfSteps={() => setNumberOfSteps(4)}
              active={active}
              blackImg={bandDark}
              whiteImg={bandLight}
            />
          }

          {user.hasStudioProfile ? null :

            <ProfileSelection
              id={'Music Studio'}
              description={'Promote your business'}
              signatureColor={'#FF8514'}
              setActive={() => setActive('Music Studio')}
              setNumberOfSteps={() => setNumberOfSteps(2)}
              active={active}
              blackImg={studioDark}
              whiteImg={studioLight}
            />
          }


          {user.hasStageProfile ? null :

            <ProfileSelection
              id={'Live Stage'}
              description={'Organize Events'}
              signatureColor={'#E558C6'}
              setActive={() => setActive('Live Stage')}
              setNumberOfSteps={() => setNumberOfSteps(5)}
              active={active}
              blackImg={stageDark}
              whiteImg={stageLight}
            />
          }



          {user.hasStoreProfile ? null :

            <ProfileSelection
              id={'Music Store'}
              description={'Increase your sales'}
              signatureColor={'#12C59A'}
              setActive={() => setActive('Music Store')}
              setNumberOfSteps={() => setNumberOfSteps(3)}
              active={active}
              blackImg={storeDark}
              whiteImg={storeLight}
            />

          }
        </div>

        {/* CHECK IF USER HAS AVAILABLE PROFILE TO CREATE */}
        {hasAllProfiles ? null :
          <>
          {/* CHECK IF ANY OPTION IS SELECTED */}
            {active === '' ? <><br></br><br></br></> :
              <div className={style.buttonSection}>
                <p>Step 1 / {numberOfSteps}</p>
                <button>Next step</button>
              </div>
            }
          </>
        }


      </div>
    </div>
  )
}
