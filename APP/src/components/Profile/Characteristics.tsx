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
                <button
                    className={CSS.edit_btn}
                    onClick={props?.onClick}>
                    Επεξεργασία
                </button>}

            <strong> {data?.artistic_nickname || data?.title}</strong>

            <ul className={CSS.characteristics}>
                <li>
                    <div> <SvgIcon id='location' /> </div>
                    <div> {data?.city} <br></br> {data?.address}</div>
                </li>


                {array !== null &&

                    <li>
                        <SvgIcon id={icon} />
                        <div>

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