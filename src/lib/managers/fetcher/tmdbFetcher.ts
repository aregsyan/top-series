import axios from 'axios';
import configs from '../../../config';
import {Headers} from './interfaces';
import {HttpException} from '../..';

class TmdbFetcher {
    readonly headers: Headers;
    private axios: typeof axios;
    private bearer_token: string = '';
    private urls: any;

    constructor() {
        Object.assign(this, configs.tmdb);
        this.axios = axios;
        this.headers = {
            headers: {
                Authorization: `Bearer ${this.bearer_token}`,
            },
        };
    }

    public async getTvDetails(id: string): Promise<any> {
        try {
            return this.fetchData(`${this.urls.series_details}/${id}`);
        } catch (e) {
            console.log(e);
            if (e.response.status === 404) {
                console.log(e.response.status);
                throw new HttpException(404, e.response.data);
            }
            console.log(e);
            throw new Error(e);
        }
    }

    public async getSeasonDetails(seriesId: string, seasonN: string): Promise<any> {
        return this.fetchData(`${this.urls.series_details}/${seriesId}/season/${seasonN}`);
    }

    private async fetchData(url: string, params = {}): Promise<any> {
        const d = await this.axios.get(url, this.headers);
        return d.data;
    }
}

const instance: TmdbFetcher = new TmdbFetcher();

export default instance;
