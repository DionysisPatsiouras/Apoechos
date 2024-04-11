import CSS from '../../css/Discover/Discover.module.css'

export default function Tab(props: any) {
    return (
        <div
            className={CSS.profile_tab}
            onMouseEnter={props?.onMouseEnter}
            onMouseLeave={props?.onMouseLeave}
            onClick={props?.onClick}
            >
            
            <li style={{'color' : props?.color}}>{props?.label}</li>

            <span style={{
                'background': props?.onHover === props?.label || props?.activeTab === props?.label ? props?.color : '#ffffff'
            }}></span>
        </div>
    )
}