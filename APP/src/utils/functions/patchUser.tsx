import { Routes } from '../../utils/Routes'
import Call from '../../utils/Call'

// THIS FUNCTION PATCHES ONLY 1 ROW OF THE USER THAT IS LOGGED
// OFTEN USED AFTER CREATING A PROFILE

export const patchUser = (key:string, value:string) => {

    let data = {
        [key]: value
    }

    let updateUser = new Call(Routes.user.patch, 'PATCH', data)

    updateUser
        .PATCH()
        .then((res) => console.warn('User updated succesfully!'))
        .catch((error) => { console.log(error) })

}