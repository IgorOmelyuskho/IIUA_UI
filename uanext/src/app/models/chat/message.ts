export interface Message {
    id?: string; // not use in CreateMessage
    text: string;
    conversationId: string;
    participantId: string;
    attachmentId: string;
    attachmentUrl: string;
    attachmentOriginalName: string;
    createdDate?: any; // use in response
    leaveDate?: any; // use in response
    isYou?: boolean; // you / their
}
