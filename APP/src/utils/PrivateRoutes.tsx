import { Outlet, Navigate } from 'react-router-dom'
import { useContext } from 'react'
import AuthContext from '../context/AuthContext'


const PrivateRoutes = ({ children, ...rest }: any) => {

    let { user }:any = useContext(AuthContext)

    return (
        <>{!user ? <Navigate to="/login" /> : <Outlet />}</>
    )
}

export default PrivateRoutes