

////****** Routes for handeling chat functionality *****//
////****** ----------------------------*************//

const express = require('express');
const { body } = require('express-validator');

const feedController = require('../controllers/feed');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

// Getting chats from database.  /feed/posts POST
router.get('/chats', isAuth, feedController.getChats);



// Posting chat into database. /feed/post GET
router.post('/chat', isAuth,
  [
    body('userId')
      .trim(),
    body('chatContent')
      .trim()
      .isLength({ min: 5 })
  ],
  feedController.createChat
);

module.exports = router;
