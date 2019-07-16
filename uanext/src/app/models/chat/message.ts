export interface Message {
    id?: string; // not use in CreateMessage
    text: string;
    conversationId: string;
    participantId: string;
    attachmentId: string;
    attachmentUrl: string;
    attachmentOriginalName: string;
    lastUpdatedDate?: any; // use in response
    isYou?: boolean; // you / their
}
