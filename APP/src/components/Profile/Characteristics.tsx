import CSS from '../../css/Profile/Profile.module.sass'
import SvgIcon from '../SvgIcon'

export default function Characteristics(props: any) {

    let data = props?.data
    // console.warn(data)

    let array: any =
        data?.category === 'musician' ? 'instruments' :
            data?.category === 'studio' ? 'services' :
                null

    let icon: any =
        data?.category === 'musician' ? 'keys' :
            data?.category === 'studio' ? 'studio' :
                null

    return (
        <div className={CSS.info}>


            {props?.canEdit &&
                <div className='items-inline'
                    style={{ margin: '10px 0', border: '2px solid #5f69c6', padding: '10px', borderRadius: '4px', cursor: 'pointer' }}
                    onClick={props?.onClick}>
                    <SvgIcon id='settings' style={{ margin: '0 5px 0 0' }} />
                    <span>Επεξεργασία</span>
                </div>
           
            }

            <strong> {data?.artistic_nickname || data?.title}</strong>

            <ul className={CSS.characteristics}>
                <li>
                    <div> <SvgIcon id='location' /> </div>
                    <div> {data?.city} <br></br> {data?.address}</div>
                </li>


                {array !== null &&

                    <li>

                        <SvgIcon id={icon} style={{ minWidth: '24px', minHeight: '24px' }} />
                        <div style={{ display: 'flex', flexWrap: 'wrap' }}>

                            {data?.[array]?.map((i: any, index: number) => (
                                <div key={index} style={{ margin: '0 3px 0 0' }}>
                                    {i?.name}
                                    {index !== data?.[array]?.length - 1 && ','}
                                </div>
                            ))}
                        </div>

                    </li>
                }


            </ul>

            <p className={CSS.bio}>{data?.bio}</p>


        </div>
    )
}