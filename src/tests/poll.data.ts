// Without this line, I get a 'Cannot redeclare block-scoped variable' error.
// TS import export syntax also tells the test files "poll_test_1.createPoll is not a function"
export {};

const example = '“Title” “a” “b” “c”';
const longExample =
    '"Title“ “a” “b” “c” “d” “e” “f” “g” “h” “i” “j” “k” “l” “m” “n” “o” “p” “q” “r” “s” “t” “u” “v” “w” “x” “y” “z”';
const options = ['a', 'b', 'c'];
const emojiToOption = [':zero: - a\n\n', ':one: - b\n\n', ':two: - c\n\n'];
const titleAndOptions = {
    title: 'Title',
    options,
};
const userIdPoll = 'U4NFBBZT6';

// Stringified JSON received in payload from Slack, hence it needs to be stringified
const blockExamples = JSON.stringify([
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
            text: '>>>:zero: - a\n\n:one: - b\n\n:two: - c\n\n',
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
                text: `by <@${userIdPoll}>`,
            },
        ],
    },
]);

function createPoll(message: string, userId: string) {
    const Oberpoll = require('../helpers/poll.class');
    const poll = new Oberpoll(message, userId);
    const postMessage = poll.postMessage();
    const jsonPoll = JSON.stringify(postMessage);
    return jsonPoll;
}

function countButtons(message: string, userId: string): number {
    const poll = JSON.parse(createPoll(message, userId));
    const buttons = poll[2].elements;
    return buttons.length;
}
function countOptions(message: string, userId: string): number {
    const poll = JSON.parse(createPoll(message, userId));
    const pollOptions = poll[1].text.text;
    const arrayOptions = pollOptions.split('\n\n');
    arrayOptions.pop();
    return arrayOptions.length;
}

function lessThanTenOptions(message: string, userId: string): boolean {
    const poll = JSON.parse(createPoll(message, userId));
    const pollOptions = poll[1].text.text;
    const arrayOptions = pollOptions.split('\n\n');
    arrayOptions.pop();
    return arrayOptions.length < 11;
}

module.exports = {
    userIdPoll,
    options,
    titleAndOptions,
    emojiToOption,
    example,
    longExample,
    blockExamples,
    createPoll,
    countButtons,
    countOptions,
    lessThanTenOptions,
};
