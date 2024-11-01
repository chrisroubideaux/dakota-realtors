// messages schema
const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  googleId: String,
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'senderModel',
    required: true,
  },
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'recipientModel',
    required: true,
  },
  senderModel: {
    type: String,
    required: true,
    enum: ['Admin', 'Agent'],
  },
  recipientModel: {
    type: String,
    required: true,
    enum: ['Admin', 'Agent'],
  },
  messageContent: String,
  timestamp: {
    type: Date,
    default: Date.now,
  },
  flagged: {
    type: Boolean,
    default: false,
  },
  parentMessage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Message',
  },
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
