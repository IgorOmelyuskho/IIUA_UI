import { Message } from 'src/app/models/chat/message';

export const testMessagePhoto: Message = {
    text: 'text of message',
    conversationId: 'conversationId',
    participantId: 'participantId',
    attachmentUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRm1DKrUQDVaNcJ6xSXK5XwLDSliIJ_LLaWgMdgf-pMNsulcpJe7A',
    attachmentId: 'attachmentId',
    attachmentOriginalName: 'photo_name.jpg',
    lastUpdatedDate: 'Oleksandr Viazovskyi, Сегодня в 17:48'
};

export const testMessageFile: Message = {
    text: 'text of message',
    conversationId: 'conversationId',
    participantId: 'participantId',
    attachmentUrl: 'https://www.axmag.com/download/pdfurl-guide.pdf',
    attachmentId: 'attachmentId',
    attachmentOriginalName: 'file_name.pdf',
    lastUpdatedDate: 'Oleksandr Viazovskyi, Сегодня в 17:48'
};

