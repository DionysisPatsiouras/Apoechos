import './App.css'
import { createContext, useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// components
import Header from './components/Header/Header'

// pages
import Login from '../src/pages/Login'
import News from './pages/News'
import Register from '../src/pages/Register'
import Account from './pages/Account'
import Create from './pages/Create'
import CreateMusician from './pages/CreateMusician'
import CreateStudio from './pages/CreateStudio'

// context
import { AuthProvider } from "./context/AuthContext"
import { DiscoverProvider } from './context/DiscoverContext'
import Discover from './pages/Discover'
import Profile from './pages/Profile'


import Messages from './pages/Messages'


// utils
import PrivateRoutes from './utils/PrivateRoutes'
import CreateStore from './pages/CreateStore'


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

            <Colors.Provider value={colors}>

              <Header />

              <Routes>

                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/' element={<News />} />
                <Route path='/mystudio' element={<Messages />} />


                <Route path='/discover' element={<DiscoverProvider><Discover /></DiscoverProvider>} />


                {/* <Route path='/profile/:category/:id/' element={<Profile />} /> */}
                <Route path='/profile/:id/' element={<Profile />} />

                <Route element={<PrivateRoutes />} >
                  <Route path='/account' element={<Account />} />
                  <Route path='/create' element={<Create />} />
                  <Route path='/create/musician' element={<CreateMusician />} />
                  <Route path='/create/studio' element={<CreateStudio />} />
                  <Route path='/create/store' element={<CreateStore />} />
                </Route>


              </Routes>
            </Colors.Provider>

          </AuthProvider>
        </BrowserRouter>
      </WindowSize.Provider>

    </div>
  );
}


