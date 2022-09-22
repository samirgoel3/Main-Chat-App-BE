const express = require('express');
const router = express.Router();

const userController = require('../../controller/v1/Controller.Users');
const testerController = require('../../controller/v1/Controller.Tester');
const chatController = require('../../controller/v1/Controller.Chat');
const messageController = require('../../controller/v1/Controller.messages');

router.use('/user', userController);
router.use('/test', testerController);
router.use('/chat', chatController);
router.use('/message', messageController);


module.exports = router;

