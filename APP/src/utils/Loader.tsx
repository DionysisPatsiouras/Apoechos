import { useState } from "react"
import AnimatedLogo from "../components/AnimatedLogo"

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

        return value === is_empty ? '.......' : value
    }







}