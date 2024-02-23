import { createContext, useState, useEffect } from "react"
import jwt_decode from 'jwt-decode'
import { useNavigate } from "react-router-dom"
import axios from "axios"



const AuthContext = createContext()
export default AuthContext;


export const AuthProvider = ({ children }) => {

    let [authTokens, setAuthTokens] = useState(() => localStorage.getItem('auth-token') ? JSON.parse(localStorage.getItem('auth-token')) : null)
    
    let [user, setUser] = useState(() => localStorage.getItem('auth-token') ? jwt_decode(localStorage.getItem('auth-token')) : null)

    // let [authTokens, setAuthTokens] = useState(() => document.cookie('auth-tokens') ? JSON.parse(document.cookie('auth-tokens')) : null)
    // let [user, setUser] = useState(() => document.cookie('auth-tokens') ? jwt_decode(document.cookie('auth-tokens')) : null)

    let [loading, setLoading] = useState(false)
    let [error, setError] = useState([])
    const [logged, setLogged] = useState(false)

    const navigate = useNavigate()


    async function loginUser(e) {
        e.preventDefault()

        // let response = await fetch('http://127.0.0.1:8000/api/token/', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({ 'email': e.target.email.value, 'password': e.target.password.value })

        // })

        let data2 = {
            email: e.target.email.value,
            password: e.target.password.value
        }

        // console.warn('submitted data', data2)

        await axios
            .post('http://127.0.0.1:8000/api/token/', data2)
            .then((res) => {
                console.log('axios res', res)

                // validate token
                if (!jwt_decode(res?.data?.access)) {
                    console.log('token expired')
                } else {
                    // document.cookie = `auth-token=${res?.data?.access}`
                    localStorage.setItem('auth-token', JSON.stringify(res?.data.access))
                    setUser(jwt_decode(res?.data?.access))
                    navigate('/discover')
                }
            })

            .catch((err) => {
                alert(err?.response?.data?.detail || err)
                // console.log(err)
            })



        // let data = await response.json()
        // console.log(data)
        // setError(data)
        // console.log(response)


        // if (response.status === 200) {
        //     setAuthTokens(data)
        //     setUser(jwt_decode(data.access))
        //     localStorage.setItem('authTokens', JSON.stringify(data))
        //     navigate('/discover')
        // }
        // else {
        //     console.log('error!')
        // }


    }

    function logoutUser() {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('auth-token')
        navigate('/login')
    }



    // async function updateToken() {
    //     setLoading(true)
    //     console.log('updated token')
    //     //fetch refresh token from backend 
    //     let response = await fetch('http://127.0.0.1:8000/api/token/refresh/', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({ 'refresh': authTokens?.refresh })
    //     })

    //     //stores data as json in a variable
    //     let data = await response.json()

    //     //check if response is ok
    //     if (response.status === 200) {
    //         setAuthTokens(data)
    //         setUser(jwt_decode(data.access))
    //         localStorage.setItem('authTokens', JSON.stringify(data))
    //     } else {
    //         logoutUser()
    //     }

    //     if (loading) {
    //         setLoading(true)
    //     }
    // }


    let contextData = {

        user: user,
        authTokens: authTokens,
        loginUser: loginUser,
        logoutUser: logoutUser,
        error: error,

    }




    // useEffect(() => {

    //     if (loading) {
    //         updateToken()
    //     }

    //     let fourMinutes = 1000 * 60 * 4

    //     let interval = setInterval(() => {
    //         if (authTokens) {
    //             updateToken()
    //         }
    //     }, fourMinutes)
    //     return () => clearInterval(interval)

    // }, [loading, authTokens ])



    return (
        <AuthContext.Provider value={contextData}>
            {loading ? null : children}
            {/* {children} */}
        </AuthContext.Provider>
    )
}