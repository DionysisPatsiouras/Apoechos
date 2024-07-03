import { useState } from 'react'

export const Loading = (not_empty: boolean, data: any) => {

    const [completed, setCompleted] = useState<boolean>(false)
    setTimeout(() => {
        setCompleted(true)
    }, 1000)


    return completed && not_empty
        ? data
        : completed && !not_empty
            ? 'Δε βρέθηκαν αποτελέσματα'
            : 'Αναζήτηση...'


}