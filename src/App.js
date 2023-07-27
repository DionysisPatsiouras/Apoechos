import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"
import HomePage from './pages/HomePage'
import Header from "./components/Header"
import LoginPage from "./pages/LoginPage"
import Discover from "./pages/Discover"
import RegisterPage from "./pages/RegisterPage"



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
        
          </Routes>

        </AuthProvider>
      </BrowserRouter>

    </div>
  );
}
