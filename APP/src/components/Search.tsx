import SvgIcon from "./SvgIcon"
import CSS from '../css/Discover/Discover.module.css'

interface Props {
    onChange: any;
}

export default function Search({ onChange }: Props) {
    return (
        <>
            <SvgIcon id='search' color='#C8C8C8' />
            <input className={CSS.filter_search} type='search' placeholder='Αναζήτηση...' onChange={onChange} />
        </>
    )
}