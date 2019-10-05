import { Response } from './entities/data';
import * as e from 'express';

require('dotenv').config();

const bodyParser = require('body-parser');
const router = require('./routes');

module.exports = async (app: e.Express) => {
    const token = process.env.SLACKBOT_OAUTH_TOKEN;

    if (!token) {
        throw Error('No token found. Please check your project setup.');
    }

    // Configure Slack Handlers
    const { WebClient } = require('@slack/web-api');
    const client = new WebClient(token);

    // Configure App
    const routes = router(client);
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(routes);

    // Reconfigurating 404s
    // tslint:disable-next-line
    app.use((req: any, res: Response) => {
        res.status(404).send({
            status: 404,
            message: 'The requested resource was not found',
        });
    });
};
