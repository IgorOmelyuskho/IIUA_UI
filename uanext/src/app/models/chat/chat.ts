import { Participants } from './chatParticipants';
import { Message } from './message';

export interface Chat {
    id: string;
    title: string;
    creatorId: string;
    conversationType: string; // P2P / All2All
    lastMessage: string;
    lastMessageId: string;
    icon: string;
    lastActivityDate: any;
    leaveDate: any;
    participants: Participants[];
    projectId?: string; // for All2All
}
