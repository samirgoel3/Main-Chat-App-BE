const express = require('express');
const router = express.Router();
const ChatValidator = require('../../services/v1/chat/Chat.Validator')
const Constants = require('../../utils/constants')
const { throwValidationErrorResponse } = require('../../utils/response-handlers')
const { authenticateClientToken } = require('../../middlewares/authGaurd')
const ChatService = require('../../services/v1/chat')


router.post(Constants.EndPoints.CREATE_ONE_ONE_CHAT.endpoint,
    authenticateClientToken,
    ChatValidator.validateOneToOneChatCreation(),
    throwValidationErrorResponse,
    ChatService.createOneToOneChat);

router.post(Constants.EndPoints.CREATE_GROUP_CHAT.endpoint,
    authenticateClientToken,
    ChatValidator.validateCreateGroupChat(),
    throwValidationErrorResponse,
    ChatService.createChatGroup);

router.get(Constants.EndPoints.GET_GROUP_CHAT_BY_USER_ID.endpoint,
    authenticateClientToken,
    ChatService.getChatGroups);


router.post(Constants.EndPoints.EDIT_GROUP_CHAT.endpoint,
    authenticateClientToken,
    ChatValidator.validateEditGroupChat(),
    throwValidationErrorResponse,
    ChatService.editChatGroup);


router.get(Constants.EndPoints.GET_ALL_CHATS_WITH_UNREAD_MESSAGE.endpoint,
    ChatService.getAllChatsWithUnreadMessages);

router.get(Constants.EndPoints.GET_ALL_CHATS_WITH_READ_MESSAGE.endpoint,
    ChatService.getAllChatsWithReadMessages);

router.get(Constants.EndPoints.GET_ALL_CHATS_BY_USER_ID.endpoint,
    authenticateClientToken,
    ChatService.getAllChatsByUserId);


module.exports = router;


