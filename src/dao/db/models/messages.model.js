import mongoose from 'mongoose';

const messageSchema = new Schema({
text: {
    type: String,
    required: true,
},
sender: {
    type: String,
    required: true,
},
timestamp: {
    type: Date,
    default: Date.now,
},
});

const Message = mongoose.model('Message', messageSchema);

export default Message;

