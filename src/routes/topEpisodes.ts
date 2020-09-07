import {NextFunction, Request, Response, Router,} from 'express';
import {RouteInterface, TopEpisodeResponseInterface} from '../interfaces';
import {TopEpisodesModel} from '../models';
// import {cacheMiddleware} from '../middlewares';
import {HttpException, NotFoundException} from '../lib';

class TopEpisodesRouter implements RouteInterface {
    public path: string = '/topEpisodes/:seriesId';
    public router = Router();

    constructor(path?: string) {
        this.path = path || this.path;
        this.initializeRoute();
    }

    private initializeRoute() {
        this.router.get(this.path, this.getTopEpisodes);
    }

    private async getTopEpisodes(req: Request, res: Response, next: NextFunction) {
        const {seriesId} = req.params;
        try {
            const instance: TopEpisodesModel = new TopEpisodesModel(seriesId);
            const result: TopEpisodeResponseInterface = await instance.getTopEpisodes();
            res.json(result);
        } catch (e) {
            console.error(e);
            next(e.status === 404 ? new NotFoundException(seriesId) : new HttpException(500, 'Error in retrieving data.'));
        }
    }
}

export default TopEpisodesRouter;
