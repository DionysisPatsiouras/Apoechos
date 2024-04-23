import axios from 'axios'
import { useEffect, useState } from 'react'
import Musician from '../components/Profile/Musician'
import Studio from '../components/Profile/Studio'
import { config } from '../utils/Token'


export default function Profile() {

    const [data, setData] = useState<any>([])

    let url = window.location.pathname.replace('/profile/', '')

    useEffect(() => {
        axios
            .get('http://localhost:8000/profiles/' + url, config)
            .then((res) => {
                setData(res?.data);
                // console.log(res)
            })
            .catch((err) => console.warn(err))

    }, [])


    const identify = (category: string) => {

        switch (category) {
            case 'musician':
                return <Musician />
            case 'studio':
                return <Studio />
            default:
                break;
        }
    }


    // console.log(data)


    return (
        <div>


            {identify(data?.category)}


        </div>
    )
}