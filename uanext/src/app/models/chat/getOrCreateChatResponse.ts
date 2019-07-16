import { Participants } from './chatParticipants';
import { Message } from './message';

export interface GetOrCreateChatResponse {
    id: string;
    title: string;
    conversationType: string; // P2P / All2All
    lastMessage: string;
    lastMessageId: string;
    icon: string;
    lastActivityDate: any;
    leaveDate: any;
    participants: Participants[];
    messages: Message[];
    projectId?: string; // for All2All
}
