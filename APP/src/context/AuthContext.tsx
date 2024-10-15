import { createContext, useState } from "react"
import { jwtDecode } from 'jwt-decode'
import { useNavigate } from "react-router-dom"

import Call from "../utils/Call"
import { Routes } from "../utils/Routes"
import { patchUser } from "../utils/functions/patchUser"


const AuthContext = createContext({})

export default AuthContext;


export const AuthProvider = ({ children }: any) => {

    const navigate = useNavigate()

    let today = new Date()


    let [authTokens, setAuthTokens] = useState<any>(() => localStorage.getItem('auth-token') ? JSON.parse(localStorage.getItem('auth-token')!) : null)
    let [user, setUser] = useState<any>(() => localStorage.getItem('auth-token') ? jwtDecode(localStorage.getItem('auth-token')!) : null)


    async function loginUser(e: any) {

        // e.preventDefault()

        let data = {
            email: e.email,
            password: e.password
        }

        let get_token = new Call(Routes.api.token, 'POST', data)


        get_token
            .POST_NO_TOKEN()
            .then((res) => {
                if (!jwtDecode(res?.access)) {
                    localStorage.removeItem('auth-token')
                    console.log('token expired')
                } else {
                    localStorage.setItem('auth-token', JSON.stringify(res?.access))
                    setUser(jwtDecode(res?.access))
                    patchUser('last_login', today.toISOString())
               
                    navigate('/discover')
                }
            })

            .catch((err: any) => {
                // alert(err?.response?.data?.detail || err)
                if (err?.response?.data?.detail) {
                    alert("Δεν βρέθηκε λογαριασμός με αυτά τα στοιχεία")
                } else {
                    alert("Προέκυψε κάποιο σφάλμα, δοκιμάστε αργότερα",)
                }
                // console.warn(err)
            })

        // await axios
        //     .post('${process.env.REACT_APP_API_URL}/api/token/', data)
        //     .then((res: any) => {
        //         // console.log('axios res', res)

        //         // validate token

        //         if (!jwtDecode(res?.data?.access)) {
        //             localStorage.removeItem('auth-token')
        //             console.log('token expired')
        //         } else {
        //             localStorage.setItem('auth-token', JSON.stringify(res?.data.access))
        //             setUser(jwtDecode(res?.data?.access))

        //             navigate('/discover')
        //         }
        //     })

        //     .catch((err: any) => {
        //         alert(err?.response?.data?.detail || err)
        //         // console.log(err)
        //     })



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
        // navigate('/login')
    }



    // async function updateToken() {
    //     setLoading(true)
    //     console.log('updated token')
    //     //fetch refresh token from backend 
    //     let response = await fetch('${process.env.REACT_APP_API_URL}api/token/refresh/', {
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
            {children}
        </AuthContext.Provider>
    )
}