const url = `http://localhost:8000`

export const Routes = {


    auth: {
        register: `${url}/user/register/`,
    },

    user: {
        patch: `${url}/user/patch/`,
    },
    profiles: {
        everything: `${url}/profiles/everything/`,
        musicians: `${url}/profiles/musicians/`,
        studios: `${url}/profiles/studios/`,
    },

    musician: {
        id: (musician_id: string) => `${url}/profiles/musician/${musician_id}`,
        post: `${url}/profiles/musicians/add/`,
        patch: (musician_id: string) => `${url}/profiles/musician/patch/${musician_id}/`,
    },

    studio: {
        id: (studio_id: string) => `${url}/profiles/studio/${studio_id}`,
        post: `${url}/profiles/studios/add/`,
    },

    posts: {
        add: `${url}/posts/add/`,
        profile_id : (profile_id:string) => `${url}/posts/${profile_id}`,
    }


}