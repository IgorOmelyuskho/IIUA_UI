import { Message } from 'src/app/models/chat/message';

export const testMessagePhoto: Message = {
    text: 'text of message text of message text of message text of message text of message text of message text of message text of message text of message text of message text of message text of message',
    conversationId: 'conversationId',
    participantId: 'participantId',
    userId: 'userID',
    attachmentUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRm1DKrUQDVaNcJ6xSXK5XwLDSliIJ_LLaWgMdgf-pMNsulcpJe7A',
    attachmentId: 'attachmentId',
    attachmentOriginalName: 'photo_name.jpg',
    createdDate: new Date()
};

export const testMessageFile: Message = {
    text: 'text of message text of message text of message text of message text of message text of message text of message text of message text of message',
    conversationId: 'conversationId',
    participantId: 'participantId',
    userId: 'userID',
    attachmentUrl: 'https://www.axmag.com/download/pdfurl-guide.pdf',
    attachmentId: 'attachmentId',
    attachmentOriginalName: 'file_name.pdf',
    createdDate: new Date()
};

export const testMessageVideo: Message = {
    text: 'text of message',
    conversationId: 'conversationId',
    participantId: 'participantId',
    userId: 'userID',
    attachmentUrl: 'https://www.youtube.com/watch?v=N8sF9JYZkPM',
    attachmentId: 'attachmentId',
    attachmentOriginalName: 'video_name.mp4',
    createdDate: new Date()
};

