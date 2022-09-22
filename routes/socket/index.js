const { Server } = require("socket.io");
const Listener = require('../../services/v1/socket/Listeners')
const jwt = require('jsonwebtoken')
const Configuration = require('../../configuration')
const UserModel = require('../../models/model.user')
const ModelMessages = require('../../models/model.message')
const KEYS = require('../socket/SocketKeys')


const initSocket = (server) => {
    let SOCKETIO = new Server(server, {
        pingTimeout: 5000,
        cors: {
            // origin: 'http://192.168.0.109:5000',
            methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
            allowedHeaders: ["Origin', 'x-access-token', 'Content-Type', 'Accept"],
        }
    });

    SOCKETIO.use(async (socket, next) => {
        const token = socket.handshake.auth.token;
        const err = new Error("Token Validation Failed");
        if (!token) {

            err.data = {
                content: {
                    "result": 0,
                    "errors": [{ "msg": "No token provided" }]
                }
            };
            next(err);
        }

        try {
            let decodedVal = await jwt.verify(token, Configuration.app_config.app_secret);

            // check weather token is good for user
            let userData = await UserModel.findOne({ _id: decodedVal.user_id })
            if (token == userData.token) {
                socket.user = userData;
                await UserModel.updateOne({ _id: decodedVal.user_id }, { socket_id: socket.id })
                next();
            }
            else {
                err.data = {
                    content: {
                        "result": 3,
                        "errors": [{ "msg": "It seems like you have logged in in another device" }, { "msg": "Session Expired" }]
                    }
                };
                next(err)
            }
        } catch (e) {
            err.data = {
                content: {
                    "result": 3,
                    "errors": [{ "msg": "Invalid Token" }]
                }
            };
            next(err)
        }
    });

    SOCKETIO.on('connection', (socket) => {

        Listener.onConnection(socket)

        socket.on(KEYS.DISCONNECT, (reason) => Listener.onDisconnection(socket, reason));

        socket.on(KEYS.CHAT, async (data, callback) => {

            let result = await (await ModelMessages.create({
                sender: data.sender,
                content: { message: "" + data.message },
                chat: data.chat_id,
                readby: [data.sender]
            })).populate('sender readby', '_id username image')
            data.users.forEach(element => {
                SOCKETIO.emit(element._id, { type: KEYS.CHAT, response: result })
            });

            callback({ status: 'OK' })
        })


        socket.on(KEYS.MARK_MESSAGE_AS_READ, async (data, callback) => {
            let message = await ModelMessages.find({ _id: data.message_id })
            let isUserAlreadyExist = message[0].readby.some((el) => { return el == data.user_id })
            if (!isUserAlreadyExist) {

                let result = await ModelMessages.findOneAndUpdate({ _id: data.message_id }, { $push: { readby: data.user_id } }, { new: true }).populate([
                    { path: "readby", select: "username image" },
                    { path: 'chat', populate: { path: 'users', select: 'username image' } }
                ])


                result.chat.users.forEach((e) => {
                    SOCKETIO.emit(e._id, { type: KEYS.MARK_MESSAGE_AS_READ, response: result })
                })
            }
        })







    });


    return SOCKETIO;
}


module.exports = {
    initSocket: initSocket,
};