import config from './config';
import App from './app';
import routes from './routes';
import {RouteInterface} from './interfaces';

async function server() {
    const r: RouteInterface[] = Object.values(routes).map((it) => new it());
    const app = new App(r, config.app.port);
    await app.init();
    app.listen();
}

if (require.main === module) {
    server()
        .catch((e: Error) => {
            console.log(e);
            process.exit(1);
        });
}
