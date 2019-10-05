import { PollMessage, StringBlock, Buttons, OptionsMap, ContextBlock } from '../entities/poll';
import { Actions } from '../entities/data';
const { mergeOptionsAndVotes, createDictionary, validateMessage, voteResultHelper } = require('./vote.helper');

class Vote {
    private options: OptionsMap;
    private userId: string;
    private blockId: string;

    constructor(blocks: PollMessage, userId: string, action: Actions) {
        this.userId = userId;
        this.blockId = blocks[1].block_id;
        this.formatMessage(blocks[1]);
        this.vote(action);
    }

    newBlocks(titleBlock: StringBlock, actionBlock: Buttons, authorBlock: ContextBlock): PollMessage {
        const optionsList = mergeOptionsAndVotes(this.options);
        return [
            titleBlock,
            {
                type: 'section',
                block_id: this.blockId,
                text: {
                    type: 'mrkdwn',
                    text: `>>>${optionsList.join('')}`,
                },
            },
            actionBlock,
            authorBlock,
        ];
    }

    private formatMessage(message: StringBlock): void {
        const splitText = validateMessage(message.text.text);
        this.options = createDictionary(splitText);
    }

    private vote(action: Actions) {
        this.options = voteResultHelper(this.options, action, this.userId);
    }
}

function voteAction(body: PollMessage, user: string, action: Actions) {
    const votePoll = new Vote(body, user, action);
    return votePoll.newBlocks(body[0], body[2], body[3]);
}

module.exports = voteAction;
