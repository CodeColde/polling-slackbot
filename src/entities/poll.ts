interface OptionsObject {
    option: string;
    voters: string[];
    count: number;
}

export type OptionsMap = Map<number, OptionsObject>;

export type Options = string[];

export interface CleanedMessage {
    title: string;
    options: Options;
}

interface Button {
    type: string;
    text: {
        type: string;
        text: string;
        emoji?: boolean;
    };
    value: string;
}
export type Buttons = Button[];

export interface ActionList {
    type: string;
    elements: Button[];
    block_id?: string;
}

export interface StringBlock {
    type: 'section';
    block_id: string;
    text: {
        type: 'mrkdwn';
        text: string;
        verbatim?: boolean;
    };
}

export interface ContextBlock {
    type: 'context';
    elements: [
        {
            type: 'mrkdwn';
            text: string;
            verbatim?: boolean;
        }
    ];
}

export type PollMessage = [StringBlock, StringBlock, Buttons, ContextBlock];
export type PollVote = [StringBlock, StringBlock, ActionList];
