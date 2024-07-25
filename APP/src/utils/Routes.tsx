const url = `http://localhost:8000`

export const Routes = {

    api: {
        token: `${url}/api/token/`
    },

    auth: {
        register: `${url}/user/register/`,
    },

    user: {
        patch: `${url}/user/patch/`,
        me: `${url}/user/me/`,
    },

    profiles: {
        all: `${url}/profile/all/`,
        cities: `${url}/profile/get/cities/`,
        genres: `${url}/profile/get/genres/`,
        instruments: `${url}/profile/get/instruments/`,
        studio_services: `${url}/profile/get/studio_services/`,
        new: `${url}/profile/new/`,
        id: (profile_id: string) => `${url}/profile/${profile_id}/`,
        update: (profile_id: string) => `${url}/profile/update/${profile_id}/`,
        my_profiles: `${url}/profile/get/my_profiles/`,
        categories: `${url}/profile/get/categories/`,
        stages: `${url}/profile/all/stages/`,
    },

    messages: {
        get: (sender_id: string, receiver_id: string) => `${url}/chat/${sender_id}/${receiver_id}/`,
        contacts: (profile_id: string) => `${url}/chat/contacts/all/${profile_id}`,
        new: `${url}/chat/message/new`,
        unread: (sender_id: string, receiver_id: string) => `${url}/chat/message/unread/${sender_id}/${receiver_id}`,
    },


    posts: {
        all: `${url}/posts/all_posts/`,
        new: `${url}/posts/new/`,
        profile_id: (profile_id: string) => `${url}/posts/${profile_id}`,
        post_id: (post_id: string) => `${url}/posts/post/${post_id}/`,
        update: (post_id: string) => `${url}/posts/update/${post_id}/`,
        titles: `${url}/posts/titles/all/`,
    },

    events: {
        all: `${url}/event/all/`,
        new: `${url}/event/new/`,
    },






}