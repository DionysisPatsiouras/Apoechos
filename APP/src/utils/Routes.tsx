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
        id: (musician_id: string) => `${url}/musician/${musician_id}`,
        post: `${url}/musician/new/`,
        patch: (musician_id: string) => `${url}/musician/patch/${musician_id}/`,
    },

    studio: {
        id: (studio_id: string) => `${url}/studio/${studio_id}`,
        post: `${url}/studio/new/`,
    },

    posts: {
        all: `${url}/posts/all_posts/`,
        add: `${url}/posts/add/`,
        profile_id: (profile_id: string) => `${url}/posts/${profile_id}`,
        post_id: (post_id: string) => `${url}/posts/post/${post_id}/`
    },

    instruments: {
        add: `${url}/musician/instrument/add/`,
    },

    services: {
        add: `${url}/studio/service/add/`,
    }


}