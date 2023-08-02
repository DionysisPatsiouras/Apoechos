import React, { useState, useEffect } from 'react'
import axios from 'axios'
// import style from '../../style/Discover.module.css'


export default function SelectProfile(props) {


    const [data, setData] = useState([])

    useEffect(() => {
        axios
            .get('http://127.0.0.1:8000/profiles/' + props.data)
            .then((response) => {
                setData(response.data)
            });
    });


    function getData(filter) {
        axios
            .get('http://127.0.0.1:8000/profiles/' + filter)
            .then((response) => {
                setData(response.data)
            });
            // console.log(data)

       
    }

    return (
        <div>
            <h1>{props.data}</h1>

            {/* <SearchAndResults results={data.length} /> */}
            {/* {data.map((i) => (

                <div key={i.id + i.category} style={{ 'backgroundColor': i.category === 'Musician' ? '#10ACDD' : i.category === 'Band' ? '#E37056' : i.category === 'Studio' ? '#FF8514' : i.category === 'Store' ? '#12C59A' : i.category === 'Stage' ? '#E558C6' : null }}>
                    <div>
                        <h6>{i.title || i.first_name}</h6>
                    </div>
                </div>

            ))} */}

            {getData(props.data)}
            {/* {console.log(data)} */}

        </div>
    )
}
