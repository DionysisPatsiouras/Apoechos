import axios from 'axios'
import React, { useState, useEffect } from 'react'
import style from '../../style/Discover.module.css'
import SearchAndResults from './SearchAndResults';

export default function Everything() {


    const [data, setData] = useState([])

    useEffect(() => {
        axios
            .get('http://127.0.0.1:8000/profiles/everything/')
            .then((response) => {
                setData(response.data)
            });
    });




    return (

        

        <div>
            <SearchAndResults results={data.length}/>
            {data.map((i) => (

                <div key={i.id + i.category} className={style.card} style={{ 'backgroundColor': i.category === 'Musician' ? '#10ACDD' : i.category === 'Band' ? '#E37056' : i.category === 'Studio' ? '#FF8514' : i.category === 'Store' ? '#12C59A' : i.category === 'Stage' ? '#E558C6' : null }}>
                    <div className={style.cardWhitePart}>
                        <h6>{i.title || i.first_name}</h6>
                    </div>
                </div>

            ))}

        </div>
    )
}
