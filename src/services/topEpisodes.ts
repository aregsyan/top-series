import {Db} from 'mongodb';
import { PriorityQueue } from '../lib/';
import {mongoDb, tmdbFetcher, utils} from '../lib';
import {PopularSeriesService} from './';
import constants from './constants';
import {
    EpisodeInterface,
    SeasonInterface,
    TopEpisodeResponseInterface
} from '../interfaces';

class TopEpisodes {
    private readonly seriesId: string;
    private seriesName: string = '';
    private static collection: string = constants.topEpisodes.dbCollection;
    private db!: Db;
    private pqueue: PriorityQueue<EpisodeInterface>;
    private static resLimit = constants.topEpisodes.resLimit;

    constructor(seriesId: string) {
        this.seriesId = seriesId;
        this.pqueue = new PriorityQueue({
            comparator: (a, b) => b.averageVotes - a.averageVotes
        });
    }

    public async getTopEpisodes(): Promise<TopEpisodeResponseInterface> {
        this.db = await mongoDb.getDB();
        const dataDb: TopEpisodeResponseInterface | null = await this.checkInDb();
        if(dataDb) {
            return this.sendResponse(dataDb);
        } else {
            const res = await this.getFromApi();
            return this.sendResponse(res);
        }
    }

    private async getFromApi(): Promise<TopEpisodeResponseInterface> {
        const seasons: SeasonInterface[] = await this.getSeasons();
        await Promise.all(seasons.map((it: any) => this.storeEpisodes(it.season_number)));
        const res: TopEpisodeResponseInterface = {
            episodes: this.selectTopEpisodes(),
        };
        this.saveEpisodesDb(res);
        return res;
    }

    private async sendResponse(res: TopEpisodeResponseInterface) {
        PopularSeriesService.updateSeriesMetrics(this.seriesId, this.seriesName);
        return res;
    }

    private async checkInDb(): Promise<TopEpisodeResponseInterface|null> {
        const dataDb = await this.db.collection(TopEpisodes.collection).findOne({seriesId: this.seriesId});
        if (dataDb) {
            const {data}: {data: TopEpisodeResponseInterface} = dataDb;
            return data;
        }
        return null;
    }

    private async getSeasons(): Promise<SeasonInterface[]> {
        const d = await tmdbFetcher.getTvDetails(this.seriesId);
        this.seriesName = d.name;
        return d.seasons.map((it: any) => ({season_number: it.season_number}));
    }

    private async storeEpisodes(seasonN: number): Promise<void> {
        const d = await tmdbFetcher.getSeasonDetails(this.seriesId, seasonN.toString());
        d.episodes.forEach((it: any) => this.pqueue.queue({episodeName: it.name, averageVotes: it.vote_average}));
    }

    private async saveEpisodesDb(data: TopEpisodeResponseInterface): Promise<void> {
        const insert = {seriesId: this.seriesId, data};
        await this.db.collection(TopEpisodes.collection).insertOne(insert);
    }

    private selectTopEpisodes(): EpisodeInterface[] {
        return Array.from(Array(TopEpisodes.resLimit)).map((it) => {
            try {
                return this.pqueue.dequeue();
            } catch (e) {
                return null;
            }
        }).filter(utils.predicateNotEmpty);
    }
}

export default TopEpisodes;
