import {Db} from 'mongodb';
import {mongoDb} from '../lib';
import {PopularSeriesResponseInterface, SeriesDbInterface} from '../interfaces';
import constants from './constants';

class PopularSeries {
    private static collection: string = constants.popularSeries.dbCollection;
    private db!: Db;
    private static resLimit: number = constants.popularSeries.resLimit;

    public async getPopularSeries(): Promise<PopularSeriesResponseInterface> {
        const data: SeriesDbInterface[] = await this.getSeries();
        return PopularSeries.constructResponse(data);
    }

    public static async updateSeriesMetrics(seriesId: string, seriesName: string) {
        const db = await mongoDb.getDB();
        const series = await db.collection(PopularSeries.collection).findOne({seriesId: seriesId});
        if(!series) {
            const insert = {seriesId: seriesId, seriesName: seriesName, accessCount: 1};
            return db.collection(PopularSeries.collection).insertOne(insert);
        } else {
            const f = {_id: series._id};
            const u = {$inc: {accessCount: 1}};
            return db.collection(PopularSeries.collection).updateOne(f, u);
        }
    }

    private async getSeries(): Promise<SeriesDbInterface[]> {
        this.db = await mongoDb.getDB();
        const sort = {accessCount: -1};
        return this.db.collection(PopularSeries.collection)
        .find()
        .sort(sort)
        .limit(PopularSeries.resLimit).toArray();
    }

    private static constructResponse(data: SeriesDbInterface[]): PopularSeriesResponseInterface {
        return {
            series: data.map((it) => {
                const {_id, seriesId, ...x} = it;
                return x;
            }),
        };
    }
}

export default PopularSeries;
