import {NextFunction, Request, Response, Router,} from 'express';
import {PopularSeriesResponseInterface, RouteInterface} from '../interfaces';
import {PopularSeriesModel} from '../models';
import {HttpException} from '../lib';

class PopularSeriesRouter implements RouteInterface {
    public path: string = '/analytics/popularSeries';
    public router = Router();

    constructor(path?: string) {
        this.path = path || this.path;
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(this.path, this.getPopularSeries);
    }

    private async getPopularSeries(req: Request, res: Response, next: NextFunction) {
        try {
            const instance: PopularSeriesModel = new PopularSeriesModel();
            const result: PopularSeriesResponseInterface = await instance.getPopularSeries();
            res.json(result);
        } catch (e) {
            console.log(e);
            next(new HttpException(500, 'Error in retrieving data.'));
        }
    }
}

export default PopularSeriesRouter;
