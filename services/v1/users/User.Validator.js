const {body} = require('express-validator')
const Constants = require('../../../utils/constants')

const validateCreateUser = ()=>{
    return [
        body(Constants.PostingParams.USERNAME).exists({checkNull:true, checkFalsy:true}).withMessage("Value missing").isLength({min:3}).withMessage("Minimum length should be 5"),
        body(Constants.PostingParams.EMAIL).isEmail(),
        body(Constants.PostingParams.PASSWORD).isLength({ min: 6 }),
        body(Constants.PostingParams.DEVELOPER).isBoolean()
    ]
}

const validateLoginUser = ()=>{
    return[
        body(Constants.PostingParams.EMAIL).isEmail(),
        body(Constants.PostingParams.PASSWORD).isLength({ min: 6 })
    ]
}

const validateEmail = ()=>{
    return[
        body(Constants.PostingParams.EMAIL).isEmail(),
    ]
}


const validateResetPassword = ()=>{
    return[
        body(Constants.PostingParams.PASSWORD).isLength({min:6}),
        body(Constants.PostingParams.RESET_TOKEN).isLength({min:105}),
    ]
}

const validateSearchUser = ()=>{
    return[
        body(Constants.PostingParams.KEY).exists({checkNull:true, checkFalsy:true}).withMessage('Invalid value'),
    ]
}


module.exports = {
    validateCreateUser, validateLoginUser, validateEmail, validateResetPassword, validateSearchUser
}
