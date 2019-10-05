const {
    userIdPoll,
    emojiToOption,
    titleAndOptions,
    options,
    example,
    longExample,
    blockExamples,
    createPoll,
    countButtons,
    countOptions,
    lessThanTenOptions,
} = require('./poll.data');

const { emojiToOptions, parseMessage } = require('../helpers/poll.helper');

describe('Create a poll', () => {
    test('Create Options and Title', () => {
        expect(parseMessage(example)).toStrictEqual(titleAndOptions);
        expect(() => parseMessage('')).toThrow();
        expect(() => parseMessage('Title')).toThrow();
        expect(() => parseMessage('‘Title’')).toThrow();
        expect(() => parseMessage('‘Title’, options')).toThrow();
        expect(() => parseMessage('“Title”')).toThrow();
        expect(() => parseMessage('“Title”, options')).toThrow();
        expect(() => parseMessage(longExample)).toThrow();
    });
    test('Option Format', () => {
        expect(emojiToOptions(options)).toStrictEqual(emojiToOption);
        expect(countButtons(example, userIdPoll)).toBe(countOptions(example));
        expect(() => lessThanTenOptions(longExample, userIdPoll)).toThrow();
    });
    test('Create a Poll', async () => {
        expect(createPoll(example, userIdPoll)).toBe(blockExamples);
    });
});
