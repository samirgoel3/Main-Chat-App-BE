const ResponseHandler = require('../../../utils/response-handlers')
const Endpoint = require('../../../utils/constants/Endpointers')
const ModelMessages = require('../../../models/model.message')


create = async (req, res) => {
    try {
        let { content, chat } = req.body
        let result = await (await ModelMessages.create({ sender:req.user_id, content, chat, readby: [req.user_id] })).populate('sender readby', '_id username image')

        if (result) {
            ResponseHandler.successResponse("" + Endpoint.SEND_MESSAGE.endpoint,
                "Message send Successfully...",
                result,
                200, req, res)
        }
        else {
            ResponseHandler.failureResponse("" + Endpoint.SEND_MESSAGE.endpoint,
                "Failed to senbd message",
                [],
                200, req, res)
        }


    } catch (e) {
        ResponseHandler.exceptionResponse("" + Endpoint.SEND_MESSAGE.name, "Exception Occurs ---->>>", e.message, 200, req, res)
    }
}

markMessageAsRead = async (req, res) => {
    try {
        let { message_id } = req.body

        let message = await ModelMessages.find({ _id: message_id })

        // check message exist
        if (message.length > 0) {
            // check user id is already exist in ready or not
            let isUserAlreadyExist = message[0].readby.some((el) => { return el == req.user_id })
            if (!isUserAlreadyExist) {
                let result = await ModelMessages.findByIdAndUpdate({ _id: message_id }, { $push: { readby: req.user_id } })
                if (result) {
                    ResponseHandler.successResponse("" + Endpoint.MARK_MESSAGE_AS_READ.name, "Message marked as read successfully", [], 200, req, res)
                }
                else {
                    ResponseHandler.failureResponse("" + Endpoint.MARK_MESSAGE_AS_READ.name, "Unable to mark message as read", [], 200, req, res)
                }
            }
            else {
                ResponseHandler.failureResponse("" + Endpoint.MARK_MESSAGE_AS_READ.name, "Message is already marked as read", [], 200, req, res)
            }
        }
        else {
            ResponseHandler.failureResponse("" + Endpoint.MARK_MESSAGE_AS_READ.name, "Message is already marked as read", [], 200, req, res)
        }

    } catch (e) {
        ResponseHandler.exceptionResponse("" + Endpoint.MARK_MESSAGE_AS_READ.name, "Exception Occurs ---->>>", e.message, 200, req, res)
    }
}

getAllMessageByChatId = async (req, res) => {
    try {
        let {chatid} = req.query
        let result = await ModelMessages.find({ chat: chatid }).select('-updatedAt -__v -chat').populate('sender', 'username image').populate('readby','username image')
        if (result.length > 0) {
            ResponseHandler.successResponse("" + Endpoint.GET_ALL_MESSAGE_OF_CHAT.name, "chat fetched successfully", result, 200, req, res)
        }
        else {
            ResponseHandler.failureResponse("" + Endpoint.GET_ALL_MESSAGE_OF_CHAT.name, "No Msssages Found for chatid: "+chatid, [], 200, req, res)
        }
    } catch (e) {
        ResponseHandler.exceptionResponse("" + Endpoint.GET_ALL_MESSAGE_OF_CHAT.name, "Exception Occurs ---->>>", e.message, 200, req, res)
    }
}

getAllUnreadMessageByChatIdAndUserId = async (req, res) => {
    try {
        let {chatid, user_id} = req.query
        let result = await ModelMessages.find({ chat: chatid, readby:{ $nin:user_id} }).select('-updatedAt -createdAt -__v -chat')
        if (result.length > 0) {
            ResponseHandler.successResponse("" + Endpoint.GET_ALL_UNREAD_MESSAGE_OF_CHAT.name, "Unread message found", result, 200, req, res)
        }
        else {
            ResponseHandler.failureResponse("" + Endpoint.GET_ALL_UNREAD_MESSAGE_OF_CHAT.name, "No unread message found in chat: "+chatid, [], 200, req, res)
        }
    } catch (e) {
        ResponseHandler.exceptionResponse("" + Endpoint.GET_ALL_UNREAD_MESSAGE_OF_CHAT.name, "Exception Occurs ---->>>", e.message, 200, req, res)
    }
}






module.exports = { create, markMessageAsRead, getAllMessageByChatId, getAllUnreadMessageByChatIdAndUserId }
