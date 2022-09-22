const onConnection = async (socket)=>{
    console.log("User Connected : "+ socket.user.username);
    socket.emit(""+socket.user._id+"_connection", {unique_key:""+socket.id, socket_id:""+socket.id})
}


const onDisconnection = async (socket, reason)=>{
    console.log("A user with socket id:"+ socket.id +" is disconnected due to "+reason)
}


module.exports = {onConnection, onDisconnection}