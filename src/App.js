import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"
import HomePage from './pages/HomePage'
import Header from "./components/Header"
import LoginPage from "./pages/LoginPage"
import Discover from "./pages/Discover"
import RegisterPage from "./pages/RegisterPage"
import PrivateRoutes from "./utils/PrivateRoutes"
import Account from "./pages/Account"



export default function App() {
  return (
    <div className="App">

      <BrowserRouter>
        <AuthProvider>
          <Header />

          <Routes>

            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/discover" element={<Discover />} />

            <Route element={<PrivateRoutes />} >
              <Route path='/account' element={<Account />} />
            </Route>


          </Routes>

        </AuthProvider>
      </BrowserRouter>

    </div>
  );
}
