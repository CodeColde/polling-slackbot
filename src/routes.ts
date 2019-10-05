require('dotenv').config();
import { ActionPayload, MessageRequest, Response, ActionRequest } from './entities/data';
import { WebClient } from '@slack/web-api/dist/WebClient';

module.exports = (client: WebClient) => {
    const Oberpoll = require('./helpers/poll.class');
    const voteAction = require('./helpers/vote.class');
    const express = require('express');
    const router = express.Router();

    // Polling Route
    router.post('/poll', async (req: MessageRequest, res: Response) => {
        const channel = req.body.channel_id;
        try {
            const poll = new Oberpoll(req.body.text, req.body.user_id);
            const blocks = poll.postMessage();
            await client.chat.postMessage({
                icon_emoji: ':bar_chart:',
                text: '',
                blocks,
                channel,
            });
            return res.status(200).send();
        } catch (e) {
            await client.chat.postEphemeral({
                icon_emoji: ':bar_chart',
                channel,
                user: req.body.user_id,
                attachments: [],
                text: e.message,
            });
            console.error(e);
            return res.status(200).send();
        }
    });

    // Action Route
    router.post('/action', async (req: ActionRequest, res: Response) => {
        const payload: ActionPayload = JSON.parse(req.body.payload);
        const {
            channel: { id },
            message: { ts, blocks },
            user: { id: userId },
            actions,
        } = payload;
        try {
            const newBlocks = voteAction(blocks, userId, actions[0]);
            await client.chat.update({
                ts,
                channel: id,
                text: '',
                blocks: newBlocks,
            });
            return res.status(200).send();
        } catch (e) {
            await client.chat.postEphemeral({
                icon_emoji: ':bar_chart:',
                channel: id,
                user: userId,
                attachments: [],
                text: e.message,
            });
            console.error(e);
        }
    });

    return router;
};
