import { Message } from './message';
import { Chat } from './chat';

export interface IShowUnreadMessages {
    chatId: string;
    isUnread: boolean;
}
