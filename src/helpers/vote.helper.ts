import { OptionsMap } from '../entities/poll';
import { Actions } from '../entities/data';

function validateMessage(text: string): string[] {
    const splitText = text
        .replace('&gt;&gt;&gt;', '')
        .replace('>>>', '')
        .split('\n');

    // There will be a trailing '' to remove, will screw with the handling.
    if (splitText.length >= 1) {
        splitText.pop();
    }

    if (typeof splitText === 'undefined' || splitText.length === 0) {
        throw new Error("Looks like the message wasn't a poll!");
    }
    return splitText;
}

function mergeOptionsAndVotes(options: OptionsMap): string[] {
    return Array.from(options, ([i, element]) => {
        const { option, voters, count } = element;
        return `${option}\n${voters.join(' ')}${count > 0 ? ` - (${count})` : ''}\n`;
    });
}

function createDictionary(voterList: string[]): OptionsMap {
    const options = voterList.filter((item: string) => item.indexOf(':') === 0);
    const dictionary = new Map();
    for (const [i, option] of options.entries()) {
        const voterKey = voterList.indexOf(option) + 1;
        const voters = voterList[voterKey].split(' ');
        // has an empty value in the beginning
        if (voters.length === 1) {
            voters.shift();
        }
        dictionary.set(i, {
            option,
            voters,
            count: 0,
        });
    }
    return dictionary;
}

function cleanupText(voters: string[]): string[] {
    return voters.filter(item => item !== '' && item !== '-' && item !== `(${voters.length - 2})`);
}

function removeVote(option: string, cleanedArr: string[], userTag: string) {
    const newVoters = cleanedArr.filter(item => item !== userTag);
    return {
        option,
        voters: newVoters,
        count: newVoters.length,
    };
}

function addVoter(option: string, cleanedArr: string[], userTag: string) {
    const newVoters = [...cleanedArr, userTag];
    return {
        option,
        voters: newVoters,
        count: newVoters.length,
    };
}

function voteResults(option: string, voters: string[], userTag: string) {
    const cleanedArr = cleanupText(voters);
    if (voters.length > 0 && voters.includes(userTag)) {
        return removeVote(option, cleanedArr, userTag);
    } else {
        return addVoter(option, cleanedArr, userTag);
    }
}

function voteResultHelper(options: OptionsMap, action: Actions, userId: string) {
    options.forEach((entry, i) => {
        const { option, voters } = entry;
        if (option.indexOf(`:${action.value}:`) >= 0) {
            options.set(i, voteResults(option, voters, `<@${userId}>`));
        }
    });
    return options;
}

module.exports = {
    mergeOptionsAndVotes,
    createDictionary,
    validateMessage,
    cleanupText,
    voteResultHelper,
};
