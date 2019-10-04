import { ChatType } from './chatType';

export interface GetChatsParams {
    numberOfConversation?: number;
    count?: number;
    conversationType?: ChatType;
    projectName?: string;
}
