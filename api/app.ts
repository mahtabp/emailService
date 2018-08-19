import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as swaggerUi from 'swagger-ui-express';
import * as controller from './controllers/emailController';
import { ErrorHandler } from './models/errorHandler';

export const app = express();

var swaggerDoc = require('./docs/swagger.json');

export async function init() {
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
    app.get('/', controller.getStatus);
    app.post('/send', controller.sendEmail);

    app.use(function (err, req, res, next) {
        if (err instanceof ErrorHandler) {
            res.status(400).send(err);
        }
        else {
            next(err);
        }
    });

}