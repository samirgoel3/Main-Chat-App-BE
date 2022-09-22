const jwt = require('jsonwebtoken')
const UserModel = require('../../../models/model.user')

const createToken = async (req, res) => {
    let token = await jwt.sign({ user_id: 1 }, "Algo-Network");
    res.send(token)
}
const emit = async (req, res) => {
    var socketio = req.app.get('socketio');
    socketio.emit(""+req.query.key, { type:""+req.query.type, data: ""+req.query.data });
    res.send("EMMISION SUCCESSFULL")
}

const emitMessage = async (req, res) =>{
    var socketio = req.app.get('socketio');
    socketio.emit(""+req.query.user_id,req.query.message)
    res.send("Message Sended successfully")

}

const disconnect_socketid = async (req, res) => {
    if(req.query.user_id){
        // let user = await UserModel.find({_id:""+req.query.user_id})
        // if(user){
        //     res.send("Logout this user from socket")
        // }
        // else{
        //     res.send("User not found.")
        // }
        
    }
    else{
        res.send("Please provide user ID")
    }
    
    
    // var socketio = req.app.get('socketio');
    // socketio.emit('TEST', {key:"some data"});
    // res.send("EMMISION SUCCESSFULL")
}




module.exports = { createToken, emit, disconnect_socketid, emitMessage }
