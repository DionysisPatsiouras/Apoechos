
import { forwardRef } from 'react'
import CSS from '../../css/News/News.module.css'

const Events = forwardRef(function Events(props: any, ref: any) {
    return (
        <section style={{ width: '50vw' }}>

            <div className={CSS.header}>Εκδηλώσεις</div>
            events
        </section>
    )
})

export default Events

