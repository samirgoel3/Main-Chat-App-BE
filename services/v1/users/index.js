const ResponseHandler = require('../../../utils/response-handlers')
const Endpoint = require('../../../utils/constants/Endpointers')
const UserModel = require('../../../models/model.user')
const { failureResponse, exceptionResponse, successResponse } = require("../../../utils/response-handlers");
const JWT = require('jsonwebtoken')
const Configuration = require('../../../configuration')
const { faker } = require('@faker-js/faker');
const axios = require('axios');
var FormData = require('form-data');
var fs = require('fs');
const fsPromises = require('fs/promises');
const modelUser = require('../../../models/model.user');


create = async (req, res) => {
    try {

        // check Email is already in use or not
        const isAlreadyExist = await UserModel.isEmailExistInDb(req.body.email)
        if (isAlreadyExist) return failureResponse(
            "" + Endpoint.CREATE_USER.url,
            "It seems this user email is already used",
            [], 200, req, res)

        // Check weather incoming request has image or     
        let userImage = '';
        if (req.files) {

            // save file in folder before uploading
            let dir = './images/' + "temp" + "-images";
            let fileName = new Date().getTime() + ".png";
            let imagePath = dir + "/" + fileName;

            // create directory if not exist
            if (!fs.existsSync(dir)) { fs.mkdirSync(dir); }

            // move file to local directory for temp purpose
            await req.files.image.mv(imagePath)

            // Create form data for the uploading request
            let formData = new FormData();
            formData.append('image', fs.createReadStream(imagePath));
            formData.append("type", 'profile');

            // Execution for api Call
            let response = await axios.post('http://13.126.21.229:3001/api/v1/upload/image', formData, fileName);

            // after post request remove local image to clear up space
            await fsPromises.unlink(imagePath);

            // check response if image is saved to content server or not
            if (response.data.result === 1) { userImage = "" + response.data.response.url; }
            else { userImage = "https://cdn-icons-png.flaticon.com/512/1277/1277612.png"; }
        }
        else { userImage = "https://ui-avatars.com/api/?name=" + req.body.username.replace(" ", ""); } // save abstract image from fake api 


        let createdUser = await UserModel.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            image: "" + userImage,
            developer: req.body.developer
        });


        let token = await JWT.sign({ user_id: createdUser._id }, Configuration.app_config.app_secret);
        // update token in DB
        await UserModel.findByIdAndUpdate({ _id: createdUser._id }, { token: token })


        createdUser['token'] = token;

        let ObjectToReturn = {
            _id: createdUser._id,
            username: createdUser.username,
            email: createdUser.email,
            image: createdUser.image,
            developer: createdUser.developer,
            token: createdUser.token
        }

        ResponseHandler.successResponse("" + Endpoint.CREATE_USER.endpoint,
            "User created Successfully...",
            ObjectToReturn,
            200, req, res)
    } catch (e) {
        exceptionResponse("" + Endpoint.CREATE_USER.name, "Exception Occurs ---->>>", e.message, 200, req, res)
    }
}

login = async (req, res) => {
    try {

        let loggedInUser = await UserModel.findOne({ email: req.body.email, password: req.body.password }).select('-__v -password -date -createdAt -updatedAt')
        // user not exist in DB
        if (!loggedInUser)
            return failureResponse("" + Endpoint.LOGIN_USER.name, "User does not exist ", [], 200, req, res)


            var socketio = req.app.get('socketio');
            socketio.emit(""+loggedInUser.socket_id, {type:"LOGOUT", data:"It Seems that you are logged in another device."})
    
    

        let token = await JWT.sign({ user_id: loggedInUser._id }, Configuration.app_config.app_secret);

        // update token in DB corresponding to that user
        await UserModel.updateOne({ email: req.body.email }, { token: token })
        loggedInUser['token'] = token;

        return successResponse("" + Endpoint.LOGIN_USER.name, "User Logged in successfully", loggedInUser, 200, req, res)

    } catch (e) {
        return exceptionResponse("" + Endpoint.LOGIN_USER.endpoint, "Exception Occurs", e.message, 200, req, res)
    }
}

verifyEmail = async (req, res) => {
    try {
        let isEmailExist = await UserModel.findOne({ email: req.body.email })
        // user not exist in DB
        if (!isEmailExist)
            return failureResponse("" + Endpoint.CHECK_EMAIL_EXIST.name, "Email does not exist in our system ", [], 200, req, res)

        let keyForPassword = await JWT.sign({ email: req.body.email }, Configuration.app_config.app_secret, { expiresIn: '3m' })

        return successResponse("" + Endpoint.CHECK_EMAIL_EXIST.name, "Email found successfully", { reset_key: keyForPassword }, 200, req, res)

    } catch (e) {
        return exceptionResponse("" + Endpoint.CHECK_EMAIL_EXIST.name, "Exception Occurs", e.message, 200, req, res)
    }
}

resetPassword = async (req, res) => {
    try {

        let decompiledToken = await JWT.verify(req.body.reset_key, Configuration.app_config.app_secret)
        let updateResult = await UserModel.findOneAndUpdate({ email: decompiledToken.email }, { password: req.body.password })

        successResponse("" + Endpoint.RESET_PASSWORD.endpoint, "Password updated successfully", [], 200, req, res);

    } catch (e) {
        return exceptionResponse("" + Endpoint.RESET_PASSWORD.endpoint, "Exception Occurs", e.message, 200, req, res)
    }
}


searchUsers = async (req, res) => {
    try {
        let data = await UserModel.find({ username: { $regex: req.body.key, $options: 'i' } }).select('-date -createdAt -updatedAt -__v -token')
        if (data.length > 0) {
            successResponse("" + Endpoint.SEARCH_USER.endpoint, "Users found successfully", data, 200, req, res);
        } else {
            failureResponse("" + Endpoint.SEARCH_USER.endpoint, "No Users Found", [], 200, req, res);
        }
    } catch (e) {
        return exceptionResponse("" + Endpoint.SEARCH_USER.endpoint, "Exception Occurs", e.message, 200, req, res)
    }
}

allUsers = async (req, res) => {
    try {
        let usersData = await modelUser.find().select('_id username image email developer createdAt')
        successResponse("" + Endpoint.ALL_USERS.endpoint, "Users fetched successfully", usersData, 200, req, res);
    } catch (e) {
        return exceptionResponse("" + Endpoint.ALL_USERS.endpoint, "Exception Occurs", e.message, 200, req, res)
    }
}





module.exports = { create, login, verifyEmail, resetPassword, searchUsers, allUsers }
