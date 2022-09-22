const {body} = require('express-validator')
const Constants = require('../../../utils/constants')

const validateOneToOneChatCreation = ()=>{
    return [
        body(Constants.PostingParams.CHAT_NAME).exists({checkNull:true, checkFalsy:true}).withMessage("Value missing"),
        body(Constants.PostingParams.USERS).exists({checkNull:true, checkFalsy:true}).withMessage("Value missing"),
        body(Constants.PostingParams.GROUPADMIN).exists({checkNull:true, checkFalsy:true}).withMessage("Value missing"),
    ]
}

const validateCreateGroupChat = ()=>{
    return [
        body(Constants.PostingParams.CHAT_NAME).exists({checkNull:true, checkFalsy:true}).withMessage("Value missing"),
        body(Constants.PostingParams.USERS).exists({checkNull:true, checkFalsy:true}).withMessage("Value missing"),
        body(Constants.PostingParams.GROUPADMIN).exists({checkNull:true, checkFalsy:true}).withMessage("Value missing"),
    ]
}



const validateEditGroupChat = ()=>{
    return [
        body(Constants.PostingParams.CHAT_NAME).exists({checkNull:true, checkFalsy:true}).withMessage("Value missing"),
        body(Constants.PostingParams.USERS).exists({checkNull:true, checkFalsy:true}).withMessage("Value missing"),
        body(Constants.PostingParams.GROUPADMIN).exists({checkNull:true, checkFalsy:true}).withMessage("Value missing"),
    ]
}

module.exports = {
    validateOneToOneChatCreation, validateCreateGroupChat, validateEditGroupChat
}
