import { Participant } from './chatParticipant';

export interface Message {
    id?: string;
    userId: string;
    text: string;
    conversationId: string;
    attachmentId: string;
    attachmentUrl: string;
    attachmentOriginalName: string;
    createdDate?: any; // use in response
    participantId?: string;
    creator?: string;
    lastUpdatedDate?: any;
    leaveDate?: any;
    isYou?: boolean; // you / their
    participant?: Participant;
}
