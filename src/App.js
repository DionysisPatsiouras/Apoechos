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
// import RegisterPage from "./pages/RegisterPage.tsx"
// import NewMusician from "./pages/CreateProfile/NewMusician.tsx"
import NewMusician2 from './pages/CreateProfile/NewMusician'

export default function App() {
  return (
    <div className="App">

      <BrowserRouter>
        <AuthProvider>
          <Header />

          <Routes>

            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            {/* <Route path="/register" element={<RegisterPage />} /> */}
            <Route path="/discover" element={<Discover />} />
            <Route path='/profiles/:category/:id/' element={<ViewProfile />} />

            <Route element={<PrivateRoutes />} >
              <Route path='/account' element={<Account />} />
              <Route path='/profiles' element={<Profiles />} />
              <Route path='/create/musician' element={<NewMusician2 />} />
              
            </Route>


          </Routes>

        </AuthProvider>
      </BrowserRouter>

    </div>
  );
}
