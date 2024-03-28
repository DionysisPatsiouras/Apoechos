import CSS from '../css/Create/Create.module.sass'
import { useState } from 'react'
import Profile from '../components/Create/Profile'
import { useContext } from 'react'
import { Link } from 'react-router-dom'

import AuthContext from '../context/AuthContext'
import { Colors } from '../App'


export default function Create() {


    let { userData }: any = useContext(AuthContext)


    const [active, setActive] = useState<string>('')
    const color = useContext<any>(Colors)

    const css: {} = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center'
    }




    return (
        <div className='space'>
            <div className='container' style={css}>

                <div className={CSS.head}>
                    <h5 className={CSS.title}>Create personal or business profile</h5>
                    <p className={CSS.desc}>There is no limit to how many profile types you can create!</p>

                </div>

                <hr className='divider'></hr>

                <div style={{ 'padding': '35px' }}>


                    {/* <div className={CSS.desktopTitles}>
                        <p>Profile Type</p>
                        <p>Benefits</p>
                    </div> */}

                    {userData?.musicianId === null &&
                        <Profile
                            id={'musician'} color={color.musician}
                            active={active} setActive={() => setActive('Musician')}
                            label={'Musician'} description={'Discover new musicians'}
                        />
                    }

                    <Profile
                        id={'band'} color={color.band}
                        active={active} setActive={() => setActive('Band')}
                        label={'Band'} description={'Promote your band'}
                    />

                    <Profile
                        id={'studio'} color={color.studio}
                        active={active} setActive={() => setActive('Studio')}
                        label={'Studio'} description={'Promote your business'}
                    />

                    <Profile
                        id={'stage'} color={color.stage}
                        active={active} setActive={() => setActive('Stage')}
                        label={'Stage'} description={'Organize events'}
                    />
                    <Profile
                        id={'store'} color={color.store}
                        active={active} setActive={() => setActive('Store')}
                        label={'Store'} description={'Increase your sales'}
                    />
                </div>

                <div className={CSS.buttonSection}>Text here...
                    <Link to={`/create/${active.toLocaleLowerCase()}`}><button>Επόμενο</button></Link>
                </div>




            </div>
        </div>
    )
}