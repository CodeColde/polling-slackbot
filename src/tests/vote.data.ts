const userId = 'U4NFBBZT6';
const userId2 = 'UN92U29K9';
const author = 'UK93ZB9K0';

// Stringified as Slack sends data as a stringified JSON
const emptyPoll = JSON.stringify([
    {
        type: 'section',
        text: {
            type: 'mrkdwn',
            text: '>*_Title_*',
        },
    },
    {
        type: 'section',
        text: {
            type: 'mrkdwn',
            text: '&gt;&gt;&gt;:zero: - a\n\n:one: - b\n\n:two: - c\n\n',
        },
    },
    {
        type: 'actions',
        elements: [
            {
                type: 'button',
                text: {
                    type: 'plain_text',
                    text: ':zero:',
                    emoji: true,
                },
                value: 'zero',
            },
            {
                type: 'button',
                text: {
                    type: 'plain_text',
                    text: ':one:',
                    emoji: true,
                },
                value: 'one',
            },
            {
                type: 'button',
                text: {
                    type: 'plain_text',
                    text: ':two:',
                    emoji: true,
                },
                value: 'two',
            },
        ],
    },
    {
        type: 'context',
        elements: [
            {
                type: 'mrkdwn',
                text: `by <@${userId}>`,
            },
        ],
    },
]);
const votedPoll = JSON.stringify([
    {
        type: 'section',
        block_id: '1234',
        text: {
            type: 'mrkdwn',
            text: '>*_Title_*',
        },
    },
    {
        type: 'section',
        block_id: 'uHr',
        text: {
            type: 'mrkdwn',
            text: `&gt;&gt;&gt;:zero: - a\n<@${userId2}> - (1)\n:one: - b\n\n:two: - c\n\n`,
            verbatim: false,
        },
    },
    {
        type: 'actions',
        elements: [
            {
                type: 'button',
                text: {
                    type: 'plain_text',
                    text: ':zero:',
                    emoji: true,
                },
                value: 'zero',
            },
            {
                type: 'button',
                text: {
                    type: 'plain_text',
                    text: ':one:',
                    emoji: true,
                },
                value: 'one',
            },
            {
                type: 'button',
                text: {
                    type: 'plain_text',
                    text: ':two:',
                    emoji: true,
                },
                value: 'two',
            },
        ],
        block_id: '1a2b',
    },
    {
        type: 'context',
        elements: [
            {
                type: 'mrkdwn',
                text: `by <@${userId}>`,
                verbatim: false,
            },
        ],
        block_id: 'lfljP',
    },
]);
const moreVotedPoll = JSON.stringify([
    {
        type: 'section',
        text: {
            type: 'mrkdwn',
            text: '>*_Title_*',
        },
        block_id: '1234',
    },
    {
        type: 'section',
        block_id: 'uHr',
        text: {
            type: 'mrkdwn',
            text: `&gt;&gt;&gt;:zero: - a\n<@${userId2}> <@${userId}> - (2)\n:one: - b\n\n:two: - c\n\n`,
            verbatim: false,
        },
    },
    {
        type: 'actions',
        elements: [
            {
                type: 'button',
                text: {
                    type: 'plain_text',
                    text: ':zero:',
                    emoji: true,
                },
                value: 'zero',
            },
            {
                type: 'button',
                text: {
                    type: 'plain_text',
                    text: ':one:',
                    emoji: true,
                },
                value: 'one',
            },
            {
                type: 'button',
                text: {
                    type: 'plain_text',
                    text: ':two:',
                    emoji: true,
                },
                value: 'two',
            },
        ],
        block_id: '1a2b',
    },
    {
        type: 'context',
        elements: [
            {
                type: 'mrkdwn',
                text: `by <@${userId}>`,
                verbatim: false,
            },
        ],
        block_id: 'lfljP',
    },
]);
const testAction = { value: 'zero' };

const voteResult = `>>>:zero: - a\n<@${userId2}> <@${userId}> - (2)\n:one: - b\n\n:two: - c\n\n`;
const removeResult = `>>>:zero: - a\n<@${userId2}> - (1)\n:one: - b\n\n:two: - c\n\n`;
const clearResult = `>>>:zero: - a\n\n:one: - b\n\n:two: - c\n\n`;

module.exports = {
    userId,
    userId2,
    emptyPoll,
    votedPoll,
    moreVotedPoll,
    voteResult,
    removeResult,
    clearResult,
    testAction,
};
