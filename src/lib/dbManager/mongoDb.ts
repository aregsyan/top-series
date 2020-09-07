import {Db, MongoClient} from 'mongodb';
import configs from '../../config';

class MongoDB {
    url: string;
    db: string = '';
    host: string = '';
    port: string = '';
    user: string = '';
    password: string = '';
    _db: any;
    client: MongoClient | any;

    constructor() {
        Object.assign(this, configs.mongodb);
        this._db = null;
        this.url = this.getUrl();
    }

    public async connect(): Promise<void> {
        if (!this._db) {
            try {
                this.client = await MongoClient.connect(this.url, {useNewUrlParser: true, useUnifiedTopology: true});
            } catch (e) {
                console.log(e);
            }
            this._db = this.client.db(this.db);
        }
    }

    public async getDB(): Promise<Db> {
        if (!this._isConnected()) {
            await this.connect();
        }
        return this._db;
    }

    private _isConnected(): boolean {
        return this._db && this.client && this.client.isConnected();
    }

    private getUrl(): string {
        if (!this.user || !this.password || !this.host || !this.db) {
            return 'mongodb://db:27017/top-series';
        }
        return `mongodb://${this.user}:${this.password}@${this.host}:${this.port}/${this.db}`;
    }
}

const instance: MongoDB = new MongoDB();

export default instance;
