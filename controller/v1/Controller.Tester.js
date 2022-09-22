const express = require('express')
const route = express.Router();
const controllerTester = require('../../services/v1/tester')

route.get('/create-test-token',controllerTester.createToken)
route.get('/emit',controllerTester.emit)
route.get('/disconnect-socketid',controllerTester.disconnect_socketid)
route.get('/eimt-message',controllerTester.emitMessage)

module.exports = route
