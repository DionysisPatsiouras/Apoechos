import { Outlet, Navigate, Route } from 'react-router-dom'
import { useContext } from 'react'
import AuthContext from '../context/AuthContext'


const PrivateRoutes = ({ children, ...rest }) => {
    // console.log('Private route works!')

    let { user } = useContext(AuthContext)

    return (
        <div>

            {!user ? <Navigate to="/login" /> : <Outlet />}
        </div>
    )
}

export default PrivateRoutes;