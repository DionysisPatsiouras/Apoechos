import CSS from '../../css/Create/Create.module.sass'
import SvgIcon from '../SvgIcon'




export default function Profile(props: any) {


    return (

        <div className={CSS.selectionContainer} >
            <div className={CSS.selection}
                onClick={() => {
                    // setNumberOfSteps(3);
                    props?.setActive()
                }}
                style={{ 'backgroundColor': props?.active === props?.label ? props?.color : '#EFEEEE' }}>

                <SvgIcon
                    id={props?.label?.toLowerCase()}
                    style={{ 'position': 'absolute', 'marginLeft': '-200px' }}
                    color={props?.active === props?.label ? '#ffffff' : '#000000'} />

                <p style={{ 'color': props?.active === props?.label ? '#ffffff' : '#6B6767' }}>{props?.label}</p>
                
            </div>
            <p className={CSS.desktopDescription}
                style={{ 'color': props?.active === props?.label ? '#565656' : '#9A9A9A' }}>
                {props?.description}</p>
        </div>
    )
}