import './App.css'
import { createContext, useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// components
import Header from './components/Header/Header'

// pages
import Login from '../src/pages/Login'
import Posts from './pages/Posts'
import Register from '../src/pages/Register'
import Account from './pages/Account'
import Create from './pages/Create'


// context
import { AuthProvider } from './context/AuthContext'
import { UserProvider } from './context/UserContext'
import { DiscoverProvider } from './context/DiscoverContext'
import { CreateNewProfileProvider } from './context/CreateNewProfileContext'


// pages
import Discover from './pages/Discover'
import Profile from './pages/Profile'
import Homepage from './pages/Homepage'
import Messages from './pages/Messages'
import CreateNewProfile from './pages/CreateNewProfile'


// utils
import PrivateRoutes from './utils/PrivateRoutes'

import Events from './pages/Events'


export const WindowSize = createContext(null)
export const Colors: any = createContext(null)

export default function App() {


  const [width, setWidth] = useState<any>(window.innerWidth)

  useEffect(() => {
    window.addEventListener("resize", () => setWidth(window.innerWidth))
  }, [])

  const responsive: any = width < 769

  const colors = {
    musician: '#10ACDD',
    band: '#E37056',
    studio: '#FF8514',
    store: '#12C59A',
    stage: '#E558C6'
  }

  return (

    <div className="App">

      <WindowSize.Provider value={responsive}>
        <BrowserRouter>
          <AuthProvider>
            <UserProvider>


              <Colors.Provider value={colors}>

                <Header />

                <Routes>

                  <Route path='/login' element={<Login />} />
                  <Route path='/register' element={<Register />} />
                  <Route path='/' element={<Homepage />} />
                  <Route path='/profile/:id/' element={<Profile />} />
                  <Route path='/discover' element={<DiscoverProvider><Discover /></DiscoverProvider>} />
                  <Route path='/posts' element={<Posts />} />
                  <Route path='/events' element={<Events />} />
                  <Route path='/mystudio' element={<Messages />} />

           



                  <Route element={<PrivateRoutes />} >
                    <Route path='/account' element={<Account />} />
                    <Route path='/create' element={<Create />} />
                    <Route path='/create/new_profile' element={<CreateNewProfileProvider><CreateNewProfile /></CreateNewProfileProvider>} />
                  </Route>


                </Routes>
              </Colors.Provider>
            </UserProvider>
          </AuthProvider>
        </BrowserRouter>
      </WindowSize.Provider>

    </div>
  );
}


