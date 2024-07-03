import { useState } from 'react'
import Loader from '../../components/Loader'
export const Loading = (not_empty: boolean, data: any) => {

    const [completed, setCompleted] = useState<boolean>(false)
    setTimeout(() => {
        setCompleted(true)
    }, 1000)


    return completed && not_empty
        ? data
        : completed && !not_empty
            ? 'Δε βρέθηκαν αποτελέσματα'
            : <Loader />


}