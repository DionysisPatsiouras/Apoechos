import axios from 'axios';

export default class Call {

    token = localStorage.getItem('auth-token')?.slice(0, -1)?.slice(1)

    private url: string
    private config: { method: string; url: string, data: any, headers: any }
    private no_token_config: { method: string; url: string, data: any }
    private post_photo: { method: string; url: string, data: any, headers: any, withCredentials: any, cache: any }


    constructor(url: string, type: any, data: any = {}) {
        this.url = url
        this.config = {
            method: `${type}`,
            url: this.url,
            data: data,
            headers: { Authorization: `Bearer ${this.token}` }
        }

        this.no_token_config = {
            method: `${type}`,
            url: this.url,
            data: data,
        }

        this.post_photo = {
            method: `${type}`,
            url: this.url,
            data: data,
            withCredentials: true,
            cache: 'force-cache',
            headers: {
                Authorization: `Bearer ${this.token}`,
                "Accept": "application/json",
                'Content-Type': 'multipart/form-data',
            }
        }
    }


    public GET = async () => {
        return await axios(this.config)
            .then(function (response) {
                return response.data
            })
            .catch(function (error) {
                throw error
            })
    }

    public GET_NO_TOKEN = async () => {
        return await axios(this.no_token_config)
            .then(function (response) {
                return response.data
            })
            .catch(function (error) {
                throw error
            })
    }


    public POST = async () => {
        return await axios(this.config)
            .then(function (response) {
                return response.data
            })
            .catch(function (error) {
                throw error
            })
    }

    public POST_NO_TOKEN = async () => {
        return await axios(this.no_token_config)
            .then(function (response) {
                return response.data
            })
            .catch(function (error) {
                throw error
            })
    }
    public POST_MEDIA = async () => {
        return await axios(this.post_photo)
            .then(function (response) {
                return response.data
            })
            .catch(function (error) {
                throw error
            })
    }


    public PATCH = async () => {
        return await axios(this.config)
            .then(function (response) {
                return response.data
            })
            .catch(function (error) {
                throw error
            })
    }

    public PATCH_MEDIA = async () => {
        return await axios(this.post_photo)
            .then(function (response) {
                return response.data
            })
            .catch(function (error) {
                throw error
            })
    }

}
