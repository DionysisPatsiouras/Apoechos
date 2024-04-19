const url = `http://localhost:8000`

export const Routes = {

    profiles: {
        everything: `${url}/profiles/everything/`,
        musicians: `${url}/profiles/musicians/`,
        studios: `${url}/profiles/studios/`,
    },

    auth: {
        register: `${url}/user/register/`,
    },

    musician: {
        id: (musician_id: string) =>`${url}/profiles/musician/${musician_id}`,
        post: `${url}/profiles/musicians/add/`,
        patch: (musician_id: string) =>`${url}/profiles/musician/patch/${musician_id}/`,
    },

    studio: {
        post: `${url}/profiles/studios/add/`,
    }


}