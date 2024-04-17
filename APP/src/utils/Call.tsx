import axios from 'axios';

export default class Call {

    token = localStorage.getItem('auth-token')?.slice(0, -1)?.slice(1)

    private url: string
    private config: { method: string; url: string, data: any, headers: any }
    private post_config: { method: string; url: string, data: any }


    constructor(url: string, type: any, data: any = {}) {
        this.url = url
        this.config = {
            method: `${type}`,
            url: this.url,
            data: data,
            headers: { Authorization: `Bearer ${this.token}` }
        }

        this.post_config = {
            method: `${type}`,
            url: this.url,
            data: data,

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


    public POST = async () => {
        return await axios(this.post_config)
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

}
