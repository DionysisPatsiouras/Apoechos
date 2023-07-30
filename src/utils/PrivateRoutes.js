import { Outlet, Navigate } from 'react-router-dom'
import { useContext } from 'react'
import AuthContext from '../context/AuthContext'


const PrivateRoutes = ({ children, ...rest }) => {
   
    let { user } = useContext(AuthContext)

    return (
        <div>

            {!user ? <Navigate to="/login" /> : <Outlet />}
        </div>
    )
}

export default PrivateRoutes;