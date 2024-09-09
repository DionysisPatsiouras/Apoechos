import SearchValidation from "../../utils/SearchValidation"
import { useState } from "react"
import ProfileListItem from "../ProfileListItem"
export default function PickBand(props: any) {

    const [search, setSearch] = useState<string>('')

    return (
        <div>
            <input type='search' placeholder='Αναζήτηση συγκροτήματος'
                onChange={(e: any) => setSearch(e.target.value)}
            />

            {props.bands
                .filter((profile: any) => SearchValidation(profile?.name, search))
                .map((profile: any) => (
                    <ProfileListItem
                        key={profile.profileId}
                        profile={profile}
                        onClick={() => {
                            props?.onClick(profile)
                            // props?.closeModal()

                        }}
                    />
                ))}

        </div>
    )
}