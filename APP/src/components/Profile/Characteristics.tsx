import CSS from '../../css/Profile/Profile.module.sass'
import SvgIcon from '../SvgIcon'

export default function Characteristics(props: any) {

    let data = props?.data
    let icon_color = '#414141'

    let lists = [
        { id: 'studio_services', icon: 'studio' },
        { id: 'genres', icon: 'keys' },
        // { id: 'instruments', icon: 'instruments' },
    ]
    // console.log(data)


    return (
        <div className={CSS.info}>


             {props?.canEdit &&
                <div className='items-inline'
                    style={{ margin: '10px 0', border: '2px solid #5f69c6', padding: '10px', borderRadius: '4px', cursor: 'pointer' }}
                    onClick={props?.onClick}>
                    <SvgIcon id='settings' style={{ margin: '0 5px 0 0' }} color={icon_color} />
                    <span>Επεξεργασία</span>
                </div>

            } 

            <strong> {data?.name}</strong>

            <ul className={CSS.characteristics}>
                <li>
                    <div> <SvgIcon id='location' color={icon_color} /> </div>
                    <div> {data?.city?.name} <br></br> {data?.address}</div>
                </li>

                
                {props?.data?.length !== 0 && lists.map((list: any) => (
                    <li key={list.id}>
                         {data?.[list?.id]?.length !== 0 &&
                            <SvgIcon id={list?.icon} style={{ minWidth: '24px', minHeight: '24px' }} color={icon_color} />
                        }

                        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                            {data?.[list.id]?.map((i: any, index: number) => (
                                <div key={index} style={{ margin: '0 3px 0 0' }}>
                                    {i?.name}
                                    {index !== data?.[list?.id]?.length - 1 && ','}
                                </div>
                            ))}
                        </div>

                    </li>
                ))}



            </ul>

            <p className={CSS.bio}>{data?.bio}</p>


        </div>
    )
}