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
import axios from 'axios'



export const SignatureColors = createContext()
export const WindowSize = createContext()

export default function App() {


  // const [width, setWidth] = React.useState(window.innerWidth);
  const [width, setWidth] = useState(window.innerWidth);
  const responsive = width < 769

  const [signatureColors, setSignatureColors] = useState([])

  useEffect(() => {
    window.addEventListener("resize", () => setWidth(window.innerWidth));

    axios
      .get('http://127.0.0.1:8000/site_modules/signature_colors/')
      .then((res) => setSignatureColors(res.data.sort((a, b) => a.id > b.id ? 1 : -1)))
      .catch((error) => console.warn(error))

  }, [])



  return (
    <div className="App">

      <WindowSize.Provider value={responsive}>
        <BrowserRouter>
          <AuthProvider>

            {/* Declare signature colors */}
            <SignatureColors.Provider
              value=
              {{
                everything: '#000000',
                musician: signatureColors[0]?.color,
                band: signatureColors[1]?.color,
                studio: signatureColors[2]?.color,
                stage: signatureColors[3]?.color,
                store: signatureColors[4]?.color
              }}
            >
              <Header />

              <div style={{ 'paddingTop': '82px' }}>
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
              </div>
            </SignatureColors.Provider>
          </AuthProvider>
        </BrowserRouter>
      </WindowSize.Provider>
    </div>
  );
}
