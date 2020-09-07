import {Db} from 'mongodb';
import {mongoDb} from '../lib';
import {PopularSeriesResponseInterface, SeriesDbInterface} from '../interfaces';

class PopularSeries {
    private collection: string = 'series_access';
    private db!: Db;
    private count: number = 5;

    public async getPopularSeries(): Promise<PopularSeriesResponseInterface> {
        const data: SeriesDbInterface[] = await this.getSeries();
        return this.constructResponse(data);
    }

    private async getSeries(): Promise<SeriesDbInterface[]> {
        this.db = await mongoDb.getDB();
        const sort = {accessCount: -1};
        return this.db.collection(this.collection)
        .find()
        .sort(sort)
        .limit(this.count).toArray();
    }

    private constructResponse(data: SeriesDbInterface[]): PopularSeriesResponseInterface {
        return {
            series: data.map((it) => {
                const {_id, seriesId, ...x} = it;
                return x;
            }),
        };
    }
}

export default PopularSeries;
