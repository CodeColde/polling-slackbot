export interface Dialog {
    title: string;
    callback_id: string;
    elements: Array<{
        type: 'text' | 'textarea' | 'select';
        name: string;
        label: string;
        optional?: boolean;
        placeholder?: string;
        value?: string;
        max_length?: number;
        min_length?: number;
        hint?: string;
        subtype?: 'email' | 'number' | 'tel' | 'url';
        data_source?: 'users' | 'channels' | 'conversations' | 'external';
        selected_options?: SelectOption[];
        options?: SelectOption[];
        option_groups?: Array<{
            label: string;
            options: SelectOption[];
        }>;
        min_query_length?: number;
    }>;
    submit_label?: string;
    notify_on_cancel?: boolean;
    state?: string;
}
export interface ImageElement {
    type: 'image';
    image_url: string;
    alt_text: string;
}
export interface UserElement {
    type: 'user';
    user_id: string;
}
export interface PlainTextElement {
    type: 'plain_text';
    text: string;
    emoji?: boolean;
}
export interface MrkdwnElement {
    type: 'mrkdwn';
    text: string;
    verbatim?: boolean;
}
export interface Option {
    text: PlainTextElement;
    value?: string;
    url?: string;
    description?: PlainTextElement;
}
export interface Confirm {
    title?: PlainTextElement;
    text: PlainTextElement | MrkdwnElement;
    confirm?: PlainTextElement;
    deny?: PlainTextElement;
}
export type KnownAction =
    | UsersSelect
    | StaticSelect
    | ConversationsSelect
    | ChannelsSelect
    | ExternalSelect
    | Button
    | Overflow
    | Datepicker;
export interface Action {
    type: string;
    action_id?: string;
    confirm?: Confirm;
}
export interface UsersSelect extends Action {
    type: 'users_select';
    initial_user?: string;
    placeholder?: PlainTextElement;
}
export interface StaticSelect extends Action {
    type: 'static_select';
    placeholder?: PlainTextElement;
    initial_option?: Option;
    options?: Option[];
    option_groups?: Array<{
        label: PlainTextElement;
        options: Option[];
    }>;
}
export interface ConversationsSelect extends Action {
    type: 'conversations_select';
    initial_conversation?: string;
    placeholder?: PlainTextElement;
}
export interface ChannelsSelect extends Action {
    type: 'channels_select';
    initial_channel?: string;
    placeholder?: PlainTextElement;
}
export interface ExternalSelect extends Action {
    type: 'external_select';
    initial_option?: Option;
    placeholder?: PlainTextElement;
    min_query_length?: number;
}
export interface Button extends Action {
    type: 'button';
    text: PlainTextElement;
    value?: string;
    url?: string;
    style?: 'danger' | 'primary';
}
export interface Overflow extends Action {
    type: 'overflow';
    options: Option[];
}
export interface Datepicker extends Action {
    type: 'datepicker';
    initial_date?: string;
    placeholder?: PlainTextElement;
}
export type KnownBlock = ImageBlock | ContextBlock | ActionsBlock | DividerBlock | SectionBlock | FileBlock;
export interface Block {
    type: string;
    block_id?: string;
}
export interface ImageBlock extends Block {
    type: 'image';
    image_url: string;
    alt_text: string;
    title?: PlainTextElement;
}
export interface ContextBlock extends Block {
    type: 'context';
    elements: Array<ImageElement | UserElement | PlainTextElement | MrkdwnElement>;
}
export interface ActionsBlock extends Block {
    type: 'actions';
    elements: Array<KnownAction | Action>;
}
export interface DividerBlock extends Block {
    type: 'divider';
}
export interface SectionBlock extends Block {
    type: 'section';
    text?: PlainTextElement | MrkdwnElement;
    fields?: Array<PlainTextElement | MrkdwnElement>;
    accessory?: KnownAction | Action | ImageElement;
}
export interface FileBlock extends Block {
    type: 'file';
    source: string;
    external_id: string;
}
export interface MessageAttachment {
    blocks?: Array<KnownBlock | Block>;
    fallback?: string;
    color?: 'good' | 'warning' | 'danger' | string;
    pretext?: string;
    author_name?: string;
    author_link?: string;
    author_icon?: string;
    title?: string;
    title_link?: string;
    text?: string;
    fields?: Array<{
        title: string;
        value: string;
        short?: boolean;
    }>;
    image_url?: string;
    thumb_url?: string;
    footer?: string;
    footer_icon?: string;
    ts?: string;
    actions?: AttachmentAction[];
    callback_id?: string;
    mrkdwn_in?: Array<'pretext' | 'text' | 'fields'>;
}
export interface AttachmentAction {
    id?: string;
    confirm?: Confirmation;
    data_source?: 'static' | 'channels' | 'conversations' | 'users' | 'external';
    min_query_length?: number;
    name?: string;
    options?: OptionField[];
    option_groups?: Array<{
        text: string;
        options: OptionField[];
    }>;
    selected_options?: OptionField[];
    style?: 'default' | 'primary' | 'danger';
    text: string;
    type: 'button' | 'select';
    value?: string;
    url?: string;
}
export interface OptionField {
    description?: string;
    text: string;
    value: string;
}
export interface Confirmation {
    dismiss_text?: string;
    ok_text?: string;
    text: string;
    title?: string;
}
export interface LinkUnfurls {
    [linkUrl: string]: MessageAttachment;
}
export interface SelectOption {
    label: string;
    value: string;
}
