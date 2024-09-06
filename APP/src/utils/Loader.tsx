import { useState } from "react"
import AnimatedLogo from "../components/AnimatedLogo"
// import { LinearProgress, Box } from "@mui/material"
import LinearProgress from '@mui/material/LinearProgress'
import SvgIcon from "../components/SvgIcon"


export default class Loader {

    private data: any


    constructor(data: any) {
        this.data = data
    }



    public logo_loader = (content: any) => {

        const [completed, setCompleted] = useState<boolean>(false)

        setTimeout(() => {
            setCompleted(true)
        }, 1000)

        let is_empty = this.data === null || this.data === undefined || this.data.length !== 0

       
        return completed && is_empty
            ? content
            : completed && !is_empty
                ? 'Δε βρέθηκαν αποτελέσματα'
                : <AnimatedLogo />

    }

    public string_load = (value: any) => {

        let is_empty = undefined
        return value === is_empty ? <LinearProgress color="info" sx={{ height: '5px' }} /> : value

    }

    public posts_load = (content: any) => {
        const [completed, setCompleted] = useState<boolean>(false)

        setTimeout(() => {
            setCompleted(true)
        }, 1000)

        let is_empty = this.data === null || this.data === undefined || this.data.length !== 0


        return completed && is_empty
            ? content
            : completed && !is_empty
                ? <div className="items-inline" style={{ justifyContent: 'center' }}><SvgIcon id='post' color='#dfdfdf' width={30} />Δεν υπάρχουν δημοσιεύσεις</div>
                : <LinearProgress color="info" sx={{ height: '20px' }} />
    }

}
