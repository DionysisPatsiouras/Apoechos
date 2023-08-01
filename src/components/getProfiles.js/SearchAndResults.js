import React from 'react'
import style from '../../style/Discover.module.css'
export default function SearchAndResults(props) {
    return (
        <div className={style.searchAndResults}>
            <form>
                <input placeholder='Search...' />
            </form>
            <small>Results : {props.results}</small>
        </div>
    )
}
