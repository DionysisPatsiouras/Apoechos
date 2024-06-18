const url = `http://localhost:8000`

export const Routes = {


    auth: {
        register: `${url}/user/register/`,
    },

    user: {
        patch: `${url}/user/patch/`,
    },
    profiles: {
        all: `${url}/profile/all/`,
        cities: `${url}/profile/get/cities/`,
        genres: `${url}/profile/get/genres/`,
        studio_services: `${url}/profile/get/studio_services/`,
        new: `${url}/profile/new/`,
        id: (profile_id: string) => `${url}/profile/${profile_id}/`,
        my_profiles: `${url}/profile/get/my_profiles/`,
        // everything: `${url}/profiles/everything/`,
        // musicians: `${url}/profiles/musicians/`,
        // studios: `${url}/profiles/studios/`,
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

    store: {
        id: (store_id: string) => `${url}/store/${store_id}`,
        post: `${url}/store/new/`,
    },
    stage: {
        id: (stage_id: string) => `${url}/stage/${stage_id}`,
        post: `${url}/stage/new/`,
    },
    band: {
        id: (band_id: string) => `${url}/band/${band_id}`,
    },

    posts: {
        all: `${url}/posts/all_posts/`,
        new: `${url}/posts/new/`,
        profile_id: (profile_id: string) => `${url}/posts/${profile_id}`,
        post_id: (post_id: string) => `${url}/posts/post/${post_id}/`,
        update: (post_id: string) => `${url}/posts/update/${post_id}/`,
        titles: `${url}/posts/titles/all`,
    },

    events: {
        new: `${url}/event/new/`,
    },

    instruments: {
        add: `${url}/musician/instrument/add/`,
    },
    genres: {
        add: `${url}/musician/genre/add/`,
    },

    services: {
        add: `${url}/studio/service/add/`,
    },


    messages: {
        profile_id: (profile_id: string) => `${url}/message/profile/${profile_id}`,
    }


}