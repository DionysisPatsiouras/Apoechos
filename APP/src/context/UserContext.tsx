import { createContext, useState, useEffect } from "react"



const UserContext = createContext({})

export default UserContext


export const UserProvider = ({ children }: any) => {

    const [data, setData] = useState<any[]>([])

    // console.log(data)

    useEffect(() => {
        // @ts-ignore
        let token = localStorage.getItem('auth-token')?.slice(0, -1)?.slice(1);

        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`)
        myHeaders.append("Accept", "*/*");
        myHeaders.append("Host", "localhost:8000");
        myHeaders.append("Connection", "keep-alive");

        var requestOptions: {} = {
            method: 'GET',
            headers: myHeaders,
            // body: formdata,
            redirect: 'follow'
        };

        fetch("http://localhost:8000/user/me", requestOptions)
            .then(response => response.json())
            // .then(result => console.log(result))
            .then(result => setData(result))
            .catch(error => console.log('error', error));
    }, [])







    let contextData = {

        data: data
    }








    return (
        <UserContext.Provider value={contextData}>
            {children}
        </UserContext.Provider>
    )
}
