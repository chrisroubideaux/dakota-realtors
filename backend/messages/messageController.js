// messages controller
const mongoose = require('mongoose');
const Message = require('./messageModel');
const Admin = require('../admin/adminModel');
const Agent = require('../agents/agent');

// Function to create a new message
const createMessage = async (req, res) => {
  try {
    const {
      sender,
      recipient,
      senderModel,
      recipientModel,
      messageContent,
      parentMessage,
    } = req.body;

    const SenderModel = senderModel === 'Admin' ? Admin : Agent;
    const RecipientModel = recipientModel === 'Admin' ? Admin : Agent;

    const senderDoc = await SenderModel.findById(sender);
    const recipientDoc = await RecipientModel.findById(recipient);

    if (!senderDoc || !recipientDoc) {
      return res.status(404).json({ error: 'Sender or recipient not found' });
    }

    const newMessage = new Message({
      sender,
      recipient,
      senderModel,
      recipientModel,
      messageContent,
      timestamp: Date.now(),
      flagged: false,
      parentMessage,
    });

    const savedMessage = await newMessage.save();

    const response = {
      _id: savedMessage._id,
      sender: savedMessage.sender,
      recipient: savedMessage.recipient,
      senderModel: savedMessage.senderModel,
      recipientModel: savedMessage.recipientModel,
      senderName: senderDoc.name,
      recipientName: recipientDoc.name,
      messageContent: savedMessage.messageContent,
      timestamp: savedMessage.timestamp,
      flagged: savedMessage.flagged,
      parentMessage: savedMessage.parentMessage,
    };

    res.status(201).json(response);
  } catch (err) {
    console.error('Error in createMessage:', err);
    res.status(500).json({ error: err.message });
  }
};

{
  /*
const createMessage = async (req, res) => {
  try {
    const {
      sender,
      recipient,
      senderModel,
      recipientModel,
      messageContent,
      parentMessage,
    } = req.body;

    const SenderModel = senderModel === 'Admin' ? Admin : Employee;
    const RecipientModel = recipientModel === 'Admin' ? Admin : Employee;

    const senderDoc = await SenderModel.findById(sender);
    const recipientDoc = await RecipientModel.findById(recipient);

    if (!senderDoc || !recipientDoc) {
      return res.status(404).json({ error: 'Sender or recipient not found' });
    }

    const newMessage = new Message({
      sender,
      recipient,
      senderModel,
      recipientModel,
      messageContent,
      timestamp: Date.now(),
      flagged: false,
      parentMessage,
    });

    const savedMessage = await newMessage.save();
    res.status(201).json(savedMessage);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
*/
}
// Get all messages
const getAllMessages = async (req, res) => {
  try {
    const messages = await Message.find({})
      .populate('sender', 'name')
      .populate('recipient', 'name')
      .populate('parentMessage');

    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getMessagesForUser = async (req, res) => {
  try {
    const userId = req.params.userId;

    const messages = await Message.find({
      $or: [{ sender: userId }, { recipient: userId }],
    })
      .populate({
        path: 'sender',
        select: 'name',
        model: function () {
          return this.senderModel;
        },
      })
      .populate({
        path: 'recipient',
        select: 'name',
        model: function () {
          return this.recipientModel;
        },
      })
      .populate('parentMessage');

    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// Function to update message status (read/archived)
const updateMessageStatus = async (req, res) => {
  try {
    const { messageId } = req.params;
    const { read, archived } = req.body;

    const updatedMessage = await Message.findByIdAndUpdate(
      messageId,
      { read, archived },
      { new: true, runValidators: true }
    );

    if (!updatedMessage) {
      return res.status(404).json({ error: 'Message not found' });
    }

    res.status(200).json(updatedMessage);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Function to delete a message
const deleteMessageById = async (req, res) => {
  try {
    const { messageId } = req.params;

    const deletedMessage = await Message.findByIdAndRemove(messageId);

    if (!deletedMessage) {
      return res.status(404).json({ error: 'Message not found' });
    }

    res.status(200).json({ message: 'Message deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
module.exports = {
  createMessage,
  getAllMessages,
  getMessagesForUser,
  updateMessageStatus,
  deleteMessageById,
};
