import { Message } from './message';
import { VendorProject } from '../vendorProject';

export interface IShowUnreadMessages {
    // if you need to show that there are unread messages in the chat
    // setUnreadMsg?: {
    //     message: Message;
    //     isCurrentUserMsg: boolean
    // };
    message?: Message;

    // if you need to show that there are no unread messages in the chat (when scroll or click to button 'show new message')
    projectWithChat?: VendorProject;
}
