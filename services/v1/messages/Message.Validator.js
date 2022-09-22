const {body} = require('express-validator')
const Constants = require('../../../utils/constants')

const validateOnToOneChat = ()=>{
    return [
        body(Constants.PostingParams.CONTENT).exists({checkNull:true, checkFalsy:true}).withMessage("Value missing"),
        body(Constants.PostingParams.CHAT).isMongoId(),
    ]
}
const validateMarkMessage = ()=>{
    return [
        body(Constants.PostingParams.MESSAGE_ID).exists({checkNull:true, checkFalsy:true}).withMessage("Value missing"),
    ]
}

module.exports = {
    validateOnToOneChat, validateMarkMessage
}




