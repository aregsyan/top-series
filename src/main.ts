import config from './config';
import App from './app';
import controllers from './controllers';
import {RouteInterface} from './interfaces';

async function server() {
    const r: RouteInterface[] = Object.values(controllers).map((it) => new it());
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
