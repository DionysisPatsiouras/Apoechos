import CSS from '../../css/Discover/Discover.module.css'

export default function Tab(props: any) {
    return (
        <div
            className={CSS.profile_tab}
            onMouseEnter={props?.onMouseEnter}
            onMouseLeave={props?.onMouseLeave}>

            <li style={{'color' : props?.color}} onClick={props?.onClick}>{props?.label}</li>

            <span style={{
                'background': props?.onHover === props?.label || props?.activeTab === props?.label ? props?.color : '#ffffff'
            }}></span>
        </div>
    )
}