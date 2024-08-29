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

import NewEvent from './pages/NewEvent'

// context
import { AuthProvider } from './context/AuthContext'
import { UserProvider } from './context/UserContext'
import { DiscoverProvider } from './context/DiscoverContext'
import { CreateNewProfileProvider } from './context/CreateNewProfileContext'
import { UtilsProvider } from './context/UtilsContext'
import { ProfileProvider } from './context/ProfileContext'
import { EditProfileProvider } from './context/EditProfileContext'
import { SnackbarContextProvider } from './context/SnackbarContext'


// pages
import Discover from './pages/Discover'
import Profile from './pages/Profile'
import Homepage from './pages/Homepage'
import Map from './pages/Map'
import Messages from './pages/Messages'
import CreateNewProfile from './pages/CreateNewProfile'


// utils
import PrivateRoutes from './utils/PrivateRoutes'

import Events from './pages/Events'


export const WindowSize = createContext(null)
// export const Colors: any = createContext(null)

export default function App() {


  const [width, setWidth] = useState<any>(window.innerWidth)

  useEffect(() => {
    window.addEventListener("resize", () => setWidth(window.innerWidth))
  }, [])

  const responsive: any = width < 769



  return (

    <div className="App">

      <WindowSize.Provider value={responsive}>
        <BrowserRouter>
          <AuthProvider>
            <UserProvider>
              <SnackbarContextProvider>



                <Header />
                <UtilsProvider>
                  <Routes>



                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/' element={<Homepage />} />
                    <Route path='/profile/:id' element={
                      <ProfileProvider>
                        <EditProfileProvider>
                          <Profile />
                        </EditProfileProvider>
                      </ProfileProvider>} />
                    <Route path='/discover' element={<DiscoverProvider><Discover /></DiscoverProvider>} />
                    <Route path='/posts' element={<Posts />} />
                    <Route path='/events' element={<Events />} />
                    <Route path='/events/new' element={<NewEvent />} />
                    <Route path='/map' element={<Map />} />
                    <Route path='/messages/:id/' element={<Messages />} />
                    {/* need to create this */}
                    {/* <Route path='/terms-and-conditions' element={<Messages />} /> */}





                    <Route element={<PrivateRoutes />} >
                      <Route path='/account' element={<Account />} />
                      <Route path='/create' element={<Create />} />
                      <Route path='/create/new_profile' element={<CreateNewProfileProvider><CreateNewProfile /></CreateNewProfileProvider>} />
                    </Route>


                  </Routes>
                </UtilsProvider>
              </SnackbarContextProvider>
            </UserProvider>
          </AuthProvider>
        </BrowserRouter>
      </WindowSize.Provider>

    </div >
  );
}


