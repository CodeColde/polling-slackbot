import { Options } from '../entities/poll';
const { emojiToOptions, createButtons, parseMessage } = require('./poll.helper');

class Oberpoll {
    private options: Options;
    private title: string;
    private userId: string;

    constructor(message: string, userId: string) {
        this.userId = userId;
        this.formatMessage(message);
    }

    postMessage() {
        const elements = createButtons(this.options);
        const options = emojiToOptions(this.options);
        return [
            {
                type: 'section',
                text: {
                    type: 'mrkdwn',
                    text: `>*_${this.title}_*`,
                },
            },
            {
                type: 'section',
                text: {
                    type: 'mrkdwn',
                    text: `>>>${options.join('')}`,
                },
            },
            {
                type: 'actions',
                elements,
            },
            {
                type: 'context',
                elements: [
                    {
                        type: 'mrkdwn',
                        text: `by <@${this.userId}>`,
                    },
                ],
            },
        ];
    }

    private formatMessage(message: string): void {
        const details = parseMessage(message);
        this.title = details.title;
        this.options = details.options;
    }
}
module.exports = Oberpoll;
