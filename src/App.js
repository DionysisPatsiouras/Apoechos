import { createContext, useEffect, useState } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"
import HomePage from './pages/HomePage'
import Header from "./components/Header"
import LoginPage from "./pages/LoginPage"
import Discover from "./pages/Discover"

import PrivateRoutes from "./utils/PrivateRoutes"
import Account from "./pages/Account"
import Profiles from "./pages/Profiles"
import ViewProfile from "./pages/ViewProfile"
import RegisterPage from "./pages/RegisterPage"
import NewMusician from './pages/CreateProfile/NewMusician'



export const SignatureColors = createContext()
export const WindowSize = createContext()

export default function App() {


  // const [width, setWidth] = React.useState(window.innerWidth);
  const [width, setWidth] = useState(window.innerWidth);
  const responsive = width < 769

  useEffect(() => {
    window.addEventListener("resize", () => setWidth(window.innerWidth));
  }, [])



  return (
    <div className="App">

      <WindowSize.Provider value={responsive}>
        <BrowserRouter>
          <AuthProvider>

            {/* Declare signature colors */}
            <SignatureColors.Provider value=
              {{
                everything: '#000000',
                musician: '#10ACDD',
                band: '#E37056',
                studio: '#FF8514',
                stage: '#E558C6',
                store: '#12C59A'
              }}>
              <Header />

              <Routes>

                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/discover" element={<Discover />} />
                <Route path='/profiles/:category/:id/' element={<ViewProfile />} />

                <Route element={<PrivateRoutes />} >
                  <Route path='/account' element={<Account />} />
                  <Route path='/profiles' element={<Profiles />} />
                  <Route path='/create/musician' element={<NewMusician />} />
                </Route>


              </Routes>
            </SignatureColors.Provider>
          </AuthProvider>
        </BrowserRouter>
      </WindowSize.Provider>
    </div>
  );
}
