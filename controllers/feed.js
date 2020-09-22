
////****** Controller for handeling functionality of chat page is handled here.
////****** --------------------------------------*************//
const { validationResult } = require('express-validator');
const io = require('../socket');
const Chat = require('../models/chat');
const User = require('../models/user')



////****** Functionality for fetching old chats is done here 
////****** --------------------------------------*************//
exports.getChats = async (req, res, next) => {
  try {
    const chats = await Chat.findAll({
      raw: true,
      include: [{
        model: User, as: 'user',
        attributes: ['name']
      }],
    })
    io.getIO().emit('usersFetched', (chats));
    res.status(200).json({
      message: 'Fetched chats successfully.',
      chats: chats
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};



////****** Functionality for saving new chat to database is done here 
////****** --------------------------------------*************//
exports.createChat = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is incorrect.');
    error.statusCode = 422;
    throw error;
  }
  const userId = req.body.userId;
  const chatContent = req.body.chatContent;
  chat = {
    userId,
    chatContent
  }
  try {
    await Chat.create(chat);
    io.getIO().emit('chats', {
      action: 'create',
      chat: { ...chat }
    });
    res.status(201).json({
      message: 'Post created successfully!',
      chat: chat
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

