import { Actions } from '../entities/data';
const {
    userId,
    userId2,
    votedPoll,
    moreVotedPoll,
    voteResult,
    removeResult,
    clearResult,
    emptyPoll,
    testAction,
} = require('./vote.data');

const { validateMessage } = require('../helpers/vote.helper.ts');

const voteAction = require('../helpers/vote.class');

/**
 * Testing the following use cases
 * - A user can vote
 * - A user can undo their vote
 * - Cases for clearing all votes
 * - Cases for being the first to vote
 */

function vote(example: string, user: string, action: Actions, result: string) {
    const newBlocks = voteAction(JSON.parse(example), user, action);
    const options = newBlocks[1];
    return options.text.text === result;
}

describe('Formatting Vote', () => {
    test('Vote Validation', async () => {
        expect(() => validateMessage('>>>')).toThrow();
        expect(() => validateMessage('&gt;&gt;&gt;')).toThrow();
        expect(() => validateMessage('hello')).toThrow();
        expect(() => validateMessage('>>>hello')).toThrow();
        expect(validateMessage('>>>:zero: - a\n')).toStrictEqual([':zero: - a']);
        expect(validateMessage('>>>:zero: - a\n\n')).toStrictEqual([':zero: - a', '']);
        expect(validateMessage('>>>:zero: - a\n<@${userId2}> - (1)\n')).toStrictEqual([
            ':zero: - a',
            '<@${userId2}> - (1)',
        ]);
        expect(validateMessage('>>>:zero: - a\n<@${userId2}> <@${userId}> - (2)\n')).toStrictEqual([
            ':zero: - a',
            '<@${userId2}> <@${userId}> - (2)',
        ]);
    });
});

describe('Vote Actions', () => {
    test('User has voted', async () => {
        expect(vote(emptyPoll, userId2, testAction, removeResult)).toBe(true);
        expect(vote(votedPoll, userId, testAction, voteResult)).toBe(true);
    });

    test('User has retracted their vote', async () => {
        expect(vote(moreVotedPoll, userId, testAction, removeResult)).toBe(true);
        expect(vote(votedPoll, userId2, testAction, clearResult)).toBe(true);
    });
});

module.exports = { voteAction };
