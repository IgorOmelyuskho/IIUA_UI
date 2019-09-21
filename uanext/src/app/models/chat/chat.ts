import { Participant } from './chatParticipant';
import { Message } from './message';
import { ChatType } from './chatType';

export interface Chat {
    id: string;
    title: string;
    creatorId: string;
    conversationType: ChatType;
    lastMessage: string;
    lastMessageId: string;
    icon: string;
    lastActivityDate: any;
    leaveDate: any;
    participants?: Participant[]; // get from /api/Participants/GetByConversationId
    isBlock: boolean;
}
