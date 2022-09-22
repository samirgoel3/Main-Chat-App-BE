const jwt = require('jsonwebtoken')
const Config = require('../config/env_config/config')
const UserModel = require('../models/model.user')

const authenticateClientToken = async (req, res, next) => {
    let token = req.headers['x-access-token'];
    if (!token) {
        return res.status(200).json({
            result: 0,
            "errors": [{
                "msg": "No token provided"
            }]
        });
    }

    try {
        let decodedVal = await jwt.verify(token, Config.app.app_secret);

        // check weather token is good for user
        let userData = await UserModel.findOne({ _id: decodedVal.user_id })
        if (token == userData.token) {
            req.user_id = decodedVal.user_id;
            return next();
        }
        else {
            return res.status(200).json({
                result: 3,
                "errors": [{ "msg": "It seems like you have logged in in another device" }, { "msg": "Session Expired" }]
            });
        }
    } catch (e) {
        return res.status(200).json({
            result: 3,
            "errors": [{ "msg": "Invalid Token" }]
        });
    }
}

module.exports = { authenticateClientToken }
