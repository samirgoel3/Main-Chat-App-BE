const configuration = require('./configuration')
const express = require('express');
const http = require('http');
const fileUpload = require('express-fileupload')
// const route = require('./routes')
// const socketRoute = require('./routes/socket')
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const cors = require('cors');
const { ServerApiVersion } = require('mongodb');



let ApiServerApp = express(), mainServer;

ApiServerApp.set('hostname', configuration.app_config.hostname);
ApiServerApp.set('port', configuration.app_config.port);

// For Retreving files in request
ApiServerApp.use(fileUpload())


// CORS
ApiServerApp.options('*', cors());
ApiServerApp.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, x-access-token, Content-Type, Accept");
    next();
});

// Middleware
ApiServerApp.use(bodyParser.json({ limit: '50mb', extended: true }));
ApiServerApp.use(bodyParser.urlencoded({ extended: false }));


mongoose.connect(configuration.db_config.server_one, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
    dbName: 'App-Database',
    autoIndex: true,
})
    .then((res) => { console.log('#####---> Mongo DB Connected!'); })
    .catch(err => { console.log("####----> Mongo Db not Connected" + err); });


mainServer = http.createServer(ApiServerApp)
// let SOCKETIO = socketRoute.initSocket(mainServer)
// ApiServerApp.set('socketio',SOCKETIO);
// route.initApi(ApiServerApp)



ApiServerApp.use('/', (req, res) => {
    res.send('Hello , I am Chat App Back End hosted on VERCEL')
})



mainServer.listen(ApiServerApp.get("port"), () => {
    console.log("#####---> Express Server is listening on - https://" + ApiServerApp.get("hostname") + ":" + ApiServerApp.get("port"));
});













