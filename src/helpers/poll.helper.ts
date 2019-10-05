import { Options, Buttons, CleanedMessage } from '../entities/poll';

const listOfEmojis = [
    ':zero:',
    ':one:',
    ':two:',
    ':three:',
    ':four:',
    ':five:',
    ':six:',
    ':seven:',
    ':eight:',
    ':nine:',
    ':keycap_ten:',
    ':duy:',
    ':daveroll:',
    ':jari:',
    ':hayo:',
    ':pizza:',
    ':fiestaparrot:',
    ':tada:',
    ':le_duy_face:',
    ':clown_face:',
    ':space_invader:',
    ':ghost:',
    ':robot_face:',
    ':beer:',
];

/**
 * Received a string containing options and a title, and parses it to that format
 * @param message '“Title” “option” “option” “option”'
 */
function parseMessage(message: string): CleanedMessage {
    const removedApostrophe = message.substr(1);
    const optionAndTitleArray = removedApostrophe.split(' “');
    const cleanedMessage = optionAndTitleArray.map(x => x.slice(0, -1));
    if (cleanedMessage.length <= 1) {
        throw new Error('Message was not properly formatted. Please try again and follow the proper guidelines');
    }
    const title = cleanedMessage.shift();
    const options = cleanedMessage;
    if (title === undefined || options.length < 1) {
        throw new Error('Unrecognized message format');
    }
    if (options.length > listOfEmojis.length) {
        throw Error('Too many options!');
    }
    return {
        title,
        options,
    };
}

function emojiToOptions(options: Options): string[] {
    return options.map((item, i) => {
        const emoji = listOfEmojis[i];
        return `${emoji} - ${item}\n\n`;
    });
}

function createButtons(options: Options): Buttons {
    return options.map((item, i) => ({
        type: 'button',
        text: {
            type: 'plain_text',
            text: `${listOfEmojis[i]}`,
            emoji: true,
        },
        value: `${listOfEmojis[i].substr(1).slice(0, -1)}`,
    }));
}

module.exports = { emojiToOptions, createButtons, parseMessage };
