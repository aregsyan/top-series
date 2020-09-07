import express from 'express';
import {mongoDb} from '../lib';
import {ErrorMiddleware} from '../middlewares';
import routes from '../routes';
import {RouteInterface} from '../interfaces';

class App {
    public app: express.Application;
    public port: number;

    constructor(routes: any[], port: string | number) {
        this.app = express();
        this.port = typeof port === 'string' ? parseInt(port) : port;
        this.initializeRoutes(routes);
        this.initializeErrorHandlers();
    }

    private static async connectDb(): Promise<void> {
        try {
            await mongoDb.connect();
        } catch (e) {
            return Promise.reject(e);
        }
    }

    public async init(): Promise<void> {
        await App.connectDb();
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`App listening on the port ${this.port}`);
        });
    }

    private initializeRoutes(routes: any[]) {
        routes.forEach((route) => {
            this.app.use('/', route.router);
        });
    }

    private initializeErrorHandlers() {
        this.app.use(ErrorMiddleware);
    }
}

export default App;
