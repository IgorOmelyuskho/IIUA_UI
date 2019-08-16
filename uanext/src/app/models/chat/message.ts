export interface Message {
    id?: string; // not use in CreateMessage
    userId: string;
    text: string;
    conversationId: string;
    participantId?: string;
    attachmentId: string;
    attachmentUrl: string;
    attachmentOriginalName: string;
    createdDate?: any; // use in response
    isYou?: boolean; // you / their
}
