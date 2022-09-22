const apiRoutes = require('./apis');


const initApi = (server) => {

    server.use('*', (req, res, next) => {
        console.log('Request was made to : ' + req.method + " -> " + req.originalUrl + '\n*******************');
        next();
    });

    server.get('/', (req, res) => {
        res.send('Hello , I am Chat App Back End hosted on VERCEL from the new route')
    })

    server.use('/api', apiRoutes);

};

module.exports = {
    initApi: initApi,
};
