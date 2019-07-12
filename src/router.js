const express = require('express');

const messagesController = require('./controllers/messages.controller');
const router  = express.Router();

const version = 'v1';

/* Routes */
router.get(`/${version}/messages/sent`, messagesController.getMessagesSent);
router.get(`/${version}/messages/received`, messagesController.getMessagesReceived);
router.post(`/${version}/messages`, messagesController.insert);
router.patch(`/${version}/messages`, messagesController.updateMessage);

module.exports = router;
