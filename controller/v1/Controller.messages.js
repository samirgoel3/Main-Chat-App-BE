const express = require('express');
const router = express.Router();
const MessageService = require('../../services/v1/messages')
const MessageValidator = require('../../services/v1/messages/Message.Validator')
const Constants = require('../../utils/constants')
const { throwValidationErrorResponse } = require('../../utils/response-handlers')
const { authenticateClientToken } = require('../../middlewares/authGaurd')


router.post(Constants.EndPoints.SEND_MESSAGE.endpoint,
    authenticateClientToken,
    MessageValidator.validateOnToOneChat(),
    throwValidationErrorResponse ,
    MessageService.create);

router.post(Constants.EndPoints.MARK_MESSAGE_AS_READ.endpoint,
    authenticateClientToken,
    MessageValidator.validateMarkMessage(),
    throwValidationErrorResponse ,
    MessageService.markMessageAsRead);

router.get(Constants.EndPoints.GET_ALL_MESSAGE_OF_CHAT.endpoint,
    authenticateClientToken,
    MessageService.getAllMessageByChatId);

router.get(Constants.EndPoints.GET_ALL_UNREAD_MESSAGE_OF_CHAT.endpoint,
    authenticateClientToken,
    MessageService.getAllUnreadMessageByChatIdAndUserId);


module.exports = router;


