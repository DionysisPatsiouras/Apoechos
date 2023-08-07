import { React, useEffect, useState } from 'react'
import { useParams } from 'react-router';
import axios from 'axios'




export default function ViewProfile() {

    const [data, setData] = useState([])

    useEffect(() => {
        axios
            .get('http://127.0.0.1:8000/profiles/' + params.category + '/' + params.id)
            .then((response) => setData(response.data))
    }, [])

    const params = useParams();
    return (
        <div>
            <p>{data.first_name || data.name}</p>
     
            {console.log(data)}
            {/* <p>{'http://127.0.0.1:8000/profiles/' + params.category + '/' + params.id + '/'}</p> */}

        </div>
    )
}
