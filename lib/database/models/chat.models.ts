import { Document, model, models, Schema } from "mongoose";

export interface IChat extends Document {
    sessionsID: string;
    message_type: string; 
    text: string; 
    response: string; 
}

const ChatSchema = new Schema({
    
    sessionsID: {type: String, required: true},
    message_type: {type: String, required: true},
    text: {type: String},
    response: {type: String}
});
const Chat = models?.Chat || model('Chat', ChatSchema);


export default Chat;

