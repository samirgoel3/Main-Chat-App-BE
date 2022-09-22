const express = require('express');
const router = express.Router();
const UserService  = require('../../services/v1/users')
const UserValidator = require('../../services/v1/users/User.Validator')
const Constants = require('../../utils/constants')
const {throwValidationErrorResponse} = require('../../utils/response-handlers')
const { authenticateClientToken } = require('../../middlewares/authGaurd')

    router.post(Constants.EndPoints.CREATE_USER.endpoint,
        UserValidator.validateCreateUser(),
        throwValidationErrorResponse ,
        UserService.create);

    router.post(Constants.EndPoints.LOGIN_USER.endpoint, UserValidator.validateLoginUser(), throwValidationErrorResponse , UserService.login);

    router.post(Constants.EndPoints.CHECK_EMAIL_EXIST.endpoint, UserValidator.validateEmail(), throwValidationErrorResponse , UserService.verifyEmail);

    router.post(Constants.EndPoints.RESET_PASSWORD.endpoint, UserValidator.validateResetPassword(), throwValidationErrorResponse , UserService.resetPassword);

    router.post(Constants.EndPoints.SEARCH_USER.endpoint, authenticateClientToken, UserValidator.validateSearchUser(), throwValidationErrorResponse , UserService.searchUsers);
    
    router.post(Constants.EndPoints.ALL_USERS.endpoint, authenticateClientToken , UserService.allUsers);



module.exports = router;


