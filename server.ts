import * as config from 'config';
import { app, init } from './api/app';
import { logger } from './api/infrastructure/logger';

var port = process.env.PORT || config.get<string>('node.port');

init().then(() => {
    app.listen(port, () => {
        logger.info(`emailService is up and running on port: ${port}`);
    });
})