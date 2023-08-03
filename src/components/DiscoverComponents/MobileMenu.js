import React from 'react'

export default function MobileMenu() {
    return (
        <div>Looking for:


            <input list="cars" placeholder="Test"></input> 
            <datalist id="cars" >
                <option value="Everything" />
                <option value="Musicians" />
                <option value="Bands" />
                <option value="Studios" />
                <option value="Live Stages" />
                <option value="Music Stores" />
            </datalist>


        </div>
    )
}
